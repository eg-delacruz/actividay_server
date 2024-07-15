import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  host: process.env.HOST || 'http://localhost',
};

export default config;
