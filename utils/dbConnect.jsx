import mongoose from "mongoose";

async function dbConnect() {
  if (!process.env.DB_HOST) {
    console.log("DB_HOST undefined. Please add DB_HOST in the .env file.");
    return;
  }
  mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
  });
  const database = mongoose.connection;
  database.on("error", console.error.bind(console, "Connection Error"));
  database.once("open", () => {
    console.log("Database Connected");
    return database;
  });
}

export default dbConnect;