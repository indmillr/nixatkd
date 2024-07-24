import { PrismaClient } from "@prisma/client";
import { comparePassword, generateToken } from "../../utils/auth";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { roles: { include: { role: true } } },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user);

    res
      .status(200)
      .json({ token, user: { name: user.name, username: user.username } });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Login failed" });
  }
}
