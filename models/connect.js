import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const connection = mysql.createPool(process.env.DATABASE_URL);

connection.getConnection();
