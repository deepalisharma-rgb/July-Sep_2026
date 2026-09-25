import dotenv from 'dotenv';

dotenv.config();

export const testConfig = {
  baseUrl: process.env.BASE_URL || 'https://br-module-test.speacsafety.net/',
  username: process.env.TEST_USERNAME,
  password: process.env.TEST_PASSWORD,
};

export function assertTestConfig() {
  if (!testConfig.username || !testConfig.password) {
    throw new Error('Set TEST_USERNAME and TEST_PASSWORD environment variables before running tests.');
  }
}