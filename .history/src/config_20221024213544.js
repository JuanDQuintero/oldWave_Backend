import { config } from 'dotenv';

config();

export default {
  port: process.env.PORT || '3306',
  db: {
    host: process.env.HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.PASSWORD || 'root',
    database: process.env.DATABASE || 'oldwave',
  },
};
