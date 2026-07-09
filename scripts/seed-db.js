const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

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

const uri = process.env.MONGODB_URI || "mongodb+srv://valorant_db:SNOPliLCHvOKtEYN@cluster0.sjv1ac7.mongodb.net/valorant_db?appName=Cluster0";

async function seed() {
  console.log("Connecting to MongoDB Atlas...");
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");
    
    const db = client.db();
    const productsCollection = db.collection('products');
    
    // Check if products count is 0
    const count = await productsCollection.countDocuments();
    
    if (count === 0) {
      console.log("Products collection is empty. Seeding products from Guns.json...");
      const gunsPath = path.resolve(__dirname, '../src/data/Guns.json');
      if (fs.existsSync(gunsPath)) {
        const gunsData = JSON.parse(fs.readFileSync(gunsPath, 'utf8'));
        const productsToInsert = [];
        
        for (const gun of gunsData) {
          let price = 0;
          if (typeof gun.price === 'number') {
            price = gun.price;
          } else if (typeof gun.price === 'string' && gun.price.toLowerCase() !== 'free') {
            price = parseFloat(gun.price) || 0;
          }
          
          const stock = 20; // Default stock for seeding
          const imageUrl = gun.image || "";
          
          productsToInsert.push({
            name: gun.name,
            description: gun.description || "",
            price: price,
            stock: stock,
            image_url: imageUrl,
            type: gun.type || "Weapon",
            created_at: new Date()
          });
        }
        
        if (productsToInsert.length > 0) {
          const result = await productsCollection.insertMany(productsToInsert);
          console.log(`Successfully seeded ${result.insertedCount} products into MongoDB!`);
        }
      } else {
        console.warn("Could not find Guns.json to seed products.");
      }
    } else {
      console.log(`Products collection already has ${count} records. Skipping seeding.`);
    }
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed().catch(err => {
  console.error("Database seeding failed:", err);
  process.exit(1);
});
