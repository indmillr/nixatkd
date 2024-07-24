import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../utils/auth";
import { rolesOrder } from "../../../lib/data";

const prisma = new PrismaClient();

const getPrecedingRoles = (selectedRole) => {
  const index = rolesOrder.indexOf(selectedRole);
  if (index === -1) return [];
  return rolesOrder.slice(0, index + 1);
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { name, email, username, password, role } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const rolesToAdd = getPrecedingRoles(role);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
        roles: {
          create: rolesToAdd.map((role) => ({
            role: { connect: { name: role } },
          })),
        },
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "User creation failed" });
  }
}
