import dotenv from 'dotenv';

const envFiles = ['.env'];

for (const file of envFiles) {
	dotenv.config({ path: file });
}
