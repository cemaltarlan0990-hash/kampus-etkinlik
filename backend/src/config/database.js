import mongoose from "mongoose";

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI tanımlı değil");
  await mongoose.connect(uri);
  const { host, name } = mongoose.connection;
  // mongodb+srv:// ya da standart adres; host *.mongodb.net ise Atlas
  const yer = uri.startsWith("mongodb+srv://") || host.endsWith(".mongodb.net") ? "Atlas" : "yerel";
  console.log(`MongoDB bağlandı (${yer}): ${host}/${name}`);
}