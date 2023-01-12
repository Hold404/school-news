import jwt from "jsonwebtoken";

export default function (req: any, res: any, next: any) {
  if (req.method === "OPTIONS") next();

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(403).json({message: "You have not access to this operation"});

    const user = jwt.verify(token, "$2a$10$1zx46JdIYGSC7CMpIeeMFu7s8TkyWTxXmqGfPkJWeSPhfncikQtCm");

    // @ts-ignore
    if (!Boolean(user.reporter)) return res.status(403).json({message: "You have not access to this operation"});

    req.user = user;
    next();

  } catch (e) {
    console.log(e);
    return res.status(403).json({message: "You have not access to this operation."});
  }
}