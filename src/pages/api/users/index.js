import dbConnect from "../../../lib/mongoose";
import User from "../../../models/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  } else if (req.method === "PUT") {
    const { id, name, email, username, roles } = req.body;

    try {
      const user = await User.findByIdAndUpdate(
        id,
        { name, email, username, roles },
        { new: true }
      );
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
