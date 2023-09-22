import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  walletAddress: { type: String, required: true, unique: true },
});
export default mongoose.model("loginSchema", loginSchema);
