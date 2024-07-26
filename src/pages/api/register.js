import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { rolesOrder } from "../../../lib/data";

const getPrecedingRoles = (selectedRole) => {
  const index = rolesOrder.indexOf(selectedRole);
  if (index === -1) return [];
  return rolesOrder.slice(0, index + 1);
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { firstName, lastName, email, username, password, roles } = req.body;

  try {
    await dbConnect();

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
      roles,
    });

    res.status(201).json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        roles,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      if (error.keyPattern.email) {
        return res.status(400).json({ error: "Email already exists!" });
      }
      if (error.keyPattern.username) {
        return res.status(400).json({ error: "Username already exists!" });
      }
    }
    console.error("Server error:", error);
    res.status(500).json({ error: "User creation failed!" });
  }
}
