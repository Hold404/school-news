import jwt from "jsonwebtoken";
import {PrismaClient} from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

export default async function (req: any, res: any, next: any) {
  if (req.method === "OPTIONS") next();

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(403).json({message: "You have not access to this operation"});

    const user = jwt.verify(token, "$2a$10$1zx46JdIYGSC7CMpIeeMFu7s8TkyWTxXmqGfPkJWeSPhfncikQtCm");

    const dbUser = await prisma.user.findFirst({
      // @ts-ignore
      where: { id: user.userId, email: user.email, name: user.name }
    });

    if (!dbUser || !dbUser.reporter) return res.status(403).json({message: "You have not access to this operation"});

    req.user = dbUser;
    next();

  } catch (e) {
    console.log(e);
    return res.status(403).json({message: "You have not access to this operation."});
  }
}