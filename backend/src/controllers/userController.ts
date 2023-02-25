import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";
import {generateAccessToken} from "../utils/jwt";
import jwt from "jsonwebtoken";

const prisma: PrismaClient = new PrismaClient();

const profile = async (req: any, res: any) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, "$2a$10$1zx46JdIYGSC7CMpIeeMFu7s8TkyWTxXmqGfPkJWeSPhfncikQtCm");

    const answer = await prisma.user.findFirst({
      // @ts-ignore
      where: {name: user.name}, select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        password: false,
        reporter: true
      }
    });

    res.status(200).json(answer);
  } catch (e) {
    console.log(e);
    return res.status(403).json({message: "You have not access to this operation."});
  }
}

const login = async (req: any, res: any) => {
  const
    email: string = req.body.email,
    password: string = req.body.password;

  if (email && password) {
    try {
      const user = await prisma.user.findFirst({
        where: {email: email}
      });

      if (user) {
        if (await bcrypt.compare(password, user.password)) {
          const token = generateAccessToken(user.id, user.email, user.name, user.reporter);

          res.status(200).json({ message: "You're logged in.", token: token });

        } else res.status(400).json({message: "Wrong password."});
      } else res.status(404).json({message: "User was not found."});

    } catch (e) {
      res.status(500).json({message: "Internal Server Error."});
      console.log(e)
    }
  } else {
    res.status(400).json({message: "User was not found."});
  }
}

const register = async (req: any, res: any) => {
  try {
    const
      name: string = req.body.name,
      surname: string = req.body.surname,
      email: string = req.body.email,
      password: string = req.body.password,
      salt = await bcrypt.genSalt(10);

    if (!name || !surname || !email || !password) return res.status(400).json({message: "All fields must be filled."});

    if (/^.*[^A-zА-яЁё].*$/.test(name) && name.length < 3) return res.status(400).json({message: "Name is not valid."});
    if (/^.*[^A-zА-яЁё].*$/.test(surname) && name.length < 3) return res.status(400).json({message: "Surname is not valid."});
    if (password.length < 5) return res.status(400).json({message: "Password is not valid."});
    if (!/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(email)) res.status(400).json({message: "Email is not valid."});

    const user = await prisma.user.create({
      data: {
        name: name,
        surname: surname,
        email: email,
        password: await bcrypt.hash(password, salt),
        reporter: false
      }
    });

    const token = generateAccessToken(user.id, user.email, user.name, user.reporter);

    res.status(200).json({ message: "You're registered.", token: token });

  } catch (e) {
    res.status(500).json({message: "Internal Server Error."});
    console.log(e);
  }
}

export {login, register, profile}