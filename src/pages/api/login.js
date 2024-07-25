// import { PrismaClient } from "@prisma/client";
// import { comparePassword, generateToken } from "../../utils/auth";

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).end(); // Method Not Allowed
//   }

//   const { username, password } = req.body;

//   try {
//     const user = await prisma.user.findUnique({
//       where: { username },
//       include: { roles: { include: { role: true } } },
//     });

//     if (!user) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     const isPasswordValid = await comparePassword(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     const token = generateToken(user);

//     res.status(200).json({
//       token,
//       user: {
//         name: user.name,
//         username: user.username,
//         roles: user.roles.map((role) => role.role.name),
//       },
//     });
//   } catch (error) {
//     console.error("Server error:", error);
//     res.status(500).json({ error: "Login failed" });
//   }
// }

import dbConnect from "../../lib/mongoose";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { username, password } = req.body;

  try {
    await dbConnect();

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "No User Found!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid Password!" });
    }

    const token = jwt.sign(
      { userId: user._id, roles: user.roles },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        roles: user.roles,
      },
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Login failed" });
  }
}
