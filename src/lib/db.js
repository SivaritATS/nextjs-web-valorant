import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb+srv://valorant_db:SNOPliLCHvOKtEYN@cluster0.sjv1ac7.mongodb.net/valorant_db?appName=Cluster0";
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDb() {
  const conn = await clientPromise;
  return conn.db();
}

// Fetch all products and map _id to id
export async function getProducts() {
  const db = await getDb();
  const products = await db.collection("products").find({}).toArray();
  return products.map((product) => ({
    ...product,
    id: product._id.toString(),
    _id: product._id.toString(),
  }));
}

// Create order and update stock
export async function createOrder(customerData, items, totalAmount) {
  const db = await getDb();

  const orderDoc = {
    customer_name: customerData.name,
    customer_email: customerData.email,
    customer_phone: customerData.phone,
    shipping_address: customerData.address,
    total_amount: totalAmount,
    payment_status: "pending",
    created_at: new Date(),
    items: items.map((item) => ({
      product_id: item.id,
      product_name: item.name,
      quantity: item.quantity,
      price: item.price,
    })),
  };

  const client = await clientPromise;

  // Try using transactions if supported (Atlas supports replica sets / transactions)
  try {
    const session = client.startSession();
    let orderId;
    try {
      await session.withTransaction(async () => {
        const orderResult = await db.collection("orders").insertOne(orderDoc, { session });
        orderId = orderResult.insertedId.toString();

        for (const item of items) {
          const updateResult = await db.collection("products").updateOne(
            {
              _id: ObjectId.isValid(item.id) ? new ObjectId(item.id) : item.id,
              stock: { $gte: item.quantity },
            },
            { $inc: { stock: -item.quantity } },
            { session }
          );

          if (updateResult.modifiedCount === 0) {
            throw new Error(`Insufficient stock for product ${item.name}`);
          }
        }
      });
      return orderId;
    } finally {
      await session.endSession();
    }
  } catch (txError) {
    // If transactions are not supported (e.g., local standalone MongoDB), fallback to sequential ops
    const isTxUnsupported = 
      txError.message.includes("transaction") || 
      txError.codeName === "TransactionSystemFailed" || 
      txError.message.includes("ReplicaSet") ||
      txError.message.includes("does not support sessions");
      
    if (isTxUnsupported) {
      console.warn("Transactions/sessions not supported. Falling back to non-transactional execution.");

      // Check stock first
      for (const item of items) {
        const product = await db.collection("products").findOne({
          _id: ObjectId.isValid(item.id) ? new ObjectId(item.id) : item.id,
        });
        if (!product || product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product ${item?.name || "Unknown"}`);
        }
      }

      // Decrement stock
      for (const item of items) {
        await db.collection("products").updateOne(
          { _id: ObjectId.isValid(item.id) ? new ObjectId(item.id) : item.id },
          { $inc: { stock: -item.quantity } }
        );
      }

      // Insert order
      const orderResult = await db.collection("orders").insertOne(orderDoc);
      return orderResult.insertedId.toString();
    }
    throw txError;
  }
}
