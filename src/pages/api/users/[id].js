import dbConnect from "../../../lib/mongoose";
import User from "../../../models/User";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
