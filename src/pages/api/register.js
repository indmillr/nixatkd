import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../utils/auth";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { name, email, username, password, roles } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
        roles: {
          create: roles.map((role) => ({ role: { connect: { name: role } } })),
        },
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "User creation failed" });
  }
}
