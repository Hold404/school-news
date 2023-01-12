import {PrismaClient} from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

const getAllPosts = async (req: any, res: any) => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      text: false,
      views: true
    }
  });

  res.status(200).json(posts);
}

const getByID = async (req: any, res: any) => {
  const id = Number(req.params.id);
  const post = await prisma.post.findFirst({where: {id: id}});

  if (post) res.status(200).json(post);
  else res.status(404).json({message: "Post was not found."});
}

const addView = async (req: any, res: any) => {
  const id = Number(req.params.id);
  const currentPost = await prisma.post.findFirst({where: {id: id}});

  if (currentPost) {
    await prisma.post.update({
      where: {
        id: id
      },
      data: {
        views: currentPost.views + 1
      }
    });

    res.status(200).json({message: "View added."});
  } else res.status(404).json({message: "Post was not found."});
}

const createPost = async (req: any, res: any) => {
  try {
    const
      title: string = req.body.title,
      text: string = req.body.text;

    if (!title || !text) return res.status(400).json({message: "All fields must be filled."});

    if (title.length < 20) return res.status(400).json({message: "Title is to short."});
    if (text.length < 20) return res.status(400).json({message: "Text is to short."});

    try {
      await prisma.post.create({
        data: {
          title: title,
          text: text,
          views: 0
        }
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({message: "Internal Server Error."});
    }

    res.status(200).json({message: "Post created."});

  } catch (e) {
    res.status(500).json({message: "Internal Server Error."});
    console.log(e);
  }
}

const updatePost = async (req: any, res: any) => {
  try {
    const
      title: string = req.body.title,
      text: string = req.body.text,
      id: number = Number(req.params.id);

    try {
      const post = await prisma.post.findFirst({where: {id: id}});

      if (post) {
        if (title) await prisma.post.update({where: {id: id}, data: {title: title}});
        if (text) await prisma.post.update({where: {id: id}, data: {text: text}});

        return res.status(200).json({message: "Post updated."});

      } else return res.status(400).json({message: "Post was not found."});
    } catch (e) {
      res.status(400).json({message: "Post was not found."});
      console.log(e);
    }

  } catch (e) {
    res.status(500).json({message: "Internal Server Error."});
    console.log(e);
  }
}

const deletePost = async (req: any, res: any) => {
  const
    id: number = Number(req.params.id);

  try {
    const post = await prisma.post.findFirst({where: {id: id}});

    if (post) {
      await prisma.post.delete({where: {id: id}})

      return res.status(200).json({message: "Post deleted."});

    } else return res.status(400).json({message: "Post was not found."});
  } catch (e) {
    res.status(400).json({message: "Post was not found."});
    console.log(e);
  }
}

export {getAllPosts, getByID, addView, createPost, updatePost, deletePost}