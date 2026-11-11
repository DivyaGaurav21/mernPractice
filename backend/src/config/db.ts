import mysql from "mysql2/promise";

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
};

export const bootstrapPool = mysql.createPool(config);

export const pool = mysql.createPool({
  ...config,
  database: process.env.DB_NAME,
});
