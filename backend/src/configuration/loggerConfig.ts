import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { format, transports } from 'winston';
import process from 'process';
import { compact } from 'lodash';

const withErrorField = format((info) => {
	if (info?.stack?.[0]) {
		const error = info?.stack?.[0];
		return Object.assign({}, info, {
			error: {
				kind: error.name,
				message: error.message,
				stack: error.stack,
			},
		});
	}

	return info;
});

export default WinstonModule.createLogger({
	format: winston.format.combine(
		withErrorField(),
		format.errors({ stack: true }),
		format.json(),
	),
	level: 'info',
	exitOnError: false,

	// https://docs.datadoghq.com/logs/log_collection/nodejs/?tab=winston30
	transports: [
		...(process.env.LOG_TRANSPORT_ENABLED === 'true'
			? [
					new transports.Http({
						host: process.env.LOG_TRANSPORT_HOST,
						path: process.env.LOG_TRANSPORT_PATH,
						ssl: process.env.LOG_TRANSPORT_SSL === 'true',
					}),
				]
			: []),
		new transports.Console({
			format: format.combine(
				format.timestamp(),
				format.colorize({ all: true }),
				format.printf((info) => {
					return `${info.timestamp} ${info.level} ${process.pid} --- [${compact(
						[info.context],
					).join(', ')}]: ${info.message}`;
				}),
			),
		}),
	],
});
