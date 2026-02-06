import { ValidationError } from 'class-validator';

export class ValidationException {
	constructor(private validationErrors: ValidationError[]) {}
}
