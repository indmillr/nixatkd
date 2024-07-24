import { verifyToken } from "./auth";

export const withAuth = (handler, requiredRoles = []) => {
  return async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const decoded = verifyToken(token);
      req.userId = decoded.userId;
      req.roles = decoded.roles;

      if (
        requiredRoles.length > 0 &&
        !requiredRoles.some((role) => req.roles.includes(role))
      ) {
        return res.status(403).json({ error: "Access denied" });
      }

      return handler(req, res);
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: "Not authenticated" });
    }
  };
};
