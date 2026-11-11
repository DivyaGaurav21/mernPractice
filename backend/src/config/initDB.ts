import { bootstrapPool, pool } from "./db";

const initDB = async (): Promise<void> => {
  try {
    const dbName = process.env.DB_NAME;

    if (!dbName || !/^[a-zA-Z0-9_]+$/.test(dbName)) {
      throw new Error("Invalid database name");
    }

    await bootstrapPool.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbName}\``,
    );

    console.log("Database created successfully");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        task VARCHAR(255) NOT NULL,
        description TEXT,
        status ENUM('pending', 'completed') DEFAULT 'pending',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id)
          REFERENCES users(id)
          ON DELETE CASCADE
      )
    `);

    console.log("Tables created successfully");
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error;
  } finally {
    await bootstrapPool.end();
  }
};

export default initDB;
