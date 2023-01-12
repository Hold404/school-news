import express, {Express} from "express";
import cors from "cors";
import userRouter from "./routes/userRouter";
import {PrismaClient} from "@prisma/client";
import postsRouter from "./routes/postsRouter";

const app: Express = express();
const PORT: number = 4000;

const prisma: PrismaClient = new PrismaClient();

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server has been started on PORT: ${PORT}`);
    })
  } catch (e) {
    console.error(e);
  }
}

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(postsRouter);

start()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });