import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: String }],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
