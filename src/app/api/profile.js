import { PrismaClient } from "@prisma/client";
import { withAuth } from "../../utils/middleware";

const prisma = new PrismaClient();

const handler = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    include: { roles: { include: { role: true } } },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(user);
};

export default withAuth(handler, ["admin"]);
