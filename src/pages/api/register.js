// import { PrismaClient } from "@prisma/client";
// import { hashPassword } from "../../utils/auth";
// import { rolesOrder } from "../../../lib/data";

// const prisma = new PrismaClient();

// const getPrecedingRoles = (selectedRole) => {
//   const index = rolesOrder.indexOf(selectedRole);
//   if (index === -1) return [];
//   return rolesOrder.slice(0, index + 1);
// };

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).end(); // Method Not Allowed
//   }

//   const { name, email, username, password, role } = req.body;

//   try {
//     const hashedPassword = await hashPassword(password);
//     const rolesToAdd = getPrecedingRoles(role);

//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         username,
//         password: hashedPassword,
//         roles: {
//           create: rolesToAdd.map((role) => ({
//             role: { connect: { name: role } },
//           })),
//         },
//       },
//     });

//     res.status(201).json({
//       user: {
//         name: user.name,
//         username: user.username,
//         roles: rolesToAdd,
//       },
//     });
//   } catch (error) {
//     console.error("Server error:", error);
//     res.status(500).json({ error: "User creation failed" });
//   }
// }

import dbConnect from "../../lib/mongoose";
import User from "../../models/User";
import bcrypt from "bcryptjs";

const rolesOrder = [
  "white",
  "loyellow",
  "hiyellow",
  "logreen",
  "higreen",
  "loblue",
  "hiblue",
  "purple",
  "lored",
  "hired",
  "lobrown",
  "hibrown",
  "black",
  "black1",
  "black2",
  "black3",
  "black4",
  "black5",
  "black6",
];

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
    await dbConnect();

    const hashedPassword = await bcrypt.hash(password, 10);
    const rolesToAdd = getPrecedingRoles(role);

    const user = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
      roles: rolesToAdd,
    });

    res.status(201).json({
      user: {
        name: user.name,
        username: user.username,
        roles: rolesToAdd,
      },
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "User creation failed" });
  }
}
