const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

// Parse .env file manually
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split(/\r?\n/).forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.length > 0 && value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
        value = value.substring(1, value.length - 1);
      }
      process.env[key] = value;
    }
  });
}

// Helper to get connection configuration
function getDbConfig(includeDb = true) {
  let config = {
    host: process.env.DB_HOST || "127.0.0.1",
    port: parseInt(process.env.DB_PORT || "3306", 10),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
  };

  if (process.env.DATABASE_URL) {
    try {
      const url = new URL(process.env.DATABASE_URL);
      config.host = url.hostname || config.host;
      config.port = url.port ? parseInt(url.port, 10) : config.port;
      config.user = url.username ? decodeURIComponent(url.username) : config.user;
      config.password = url.password ? decodeURIComponent(url.password) : config.password;
      if (includeDb && url.pathname) {
        config.database = url.pathname.replace(/^\//, "");
      }
    } catch (err) {
      console.error("Failed to parse DATABASE_URL, using default configurations.");
    }
  }

  if (includeDb && !config.database) {
    config.database = process.env.DB_NAME || "valorant_db";
  }

  return config;
}

async function seed() {
  console.log("Connecting to MySQL to check database...");
  const initConfig = getDbConfig(false);
  const dbName = getDbConfig(true).database || "valorant_db";
  
  let conn = await mysql.createConnection(initConfig);
  
  console.log(`Creating database '${dbName}' if not exists...`);
  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
  await conn.end();

  // Reconnect to the database
  const fullConfig = getDbConfig(true);
  console.log(`Connecting to database '${dbName}'...`);
  conn = await mysql.createConnection(fullConfig);

  console.log("Creating tables if they do not exist...");
  
  // Create products table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      stock INT NOT NULL DEFAULT 0,
      image_url VARCHAR(500),
      type VARCHAR(50)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // Create orders table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      customer_name VARCHAR(255) NOT NULL,
      customer_email VARCHAR(255) NOT NULL,
      customer_phone VARCHAR(50) NOT NULL,
      shipping_address TEXT NOT NULL,
      total_amount DECIMAL(10, 2) NOT NULL,
      payment_status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // Create order_items table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      order_id INT NOT NULL,
      product_id INT NOT NULL,
      quantity INT NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      product_name VARCHAR(255) NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // Check if products table is empty
  const [rows] = await conn.query("SELECT COUNT(*) as count FROM products");
  const count = rows[0].count;

  if (count === 0) {
    console.log("Products table is empty. Seeding products from Guns.json...");
    const gunsPath = path.resolve(__dirname, '../src/data/Guns.json');
    if (fs.existsSync(gunsPath)) {
      const gunsData = JSON.parse(fs.readFileSync(gunsPath, 'utf8'));
      
      for (const gun of gunsData) {
        let price = 0;
        if (typeof gun.price === 'number') {
          price = gun.price;
        } else if (typeof gun.price === 'string' && gun.price.toLowerCase() !== 'free') {
          price = parseFloat(gun.price) || 0;
        }
        
        const stock = 20; // Default stock for seeding
        const imageUrl = gun.image || "";
        
        await conn.query(
          "INSERT INTO products (name, description, price, stock, image_url, type) VALUES (?, ?, ?, ?, ?, ?)",
          [gun.name, gun.description || "", price, stock, imageUrl, gun.type || "Weapon"]
        );
      }
      console.log(`Successfully seeded ${gunsData.length} products!`);
    } else {
      console.warn("Could not find Guns.json to seed products.");
    }
  } else {
    console.log(`Products table already has ${count} records. Skipping seeding.`);
  }

  await conn.end();
  console.log("Database initialization and seeding complete!");
}

seed().catch(err => {
  console.error("Database seeding failed:", err);
  process.exit(1);
});
