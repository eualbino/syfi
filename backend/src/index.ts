import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();
const cors = require('cors')

app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use(express.json());

app.get("/listbuys", async (req, res) => {
  const listBuy = await prisma.listBuy.findMany();
  res.json(listBuy);
});

app.get("/listbuys", async (req, res) => {
  const q  = typeof req.query.q === 'string' ? req.query.q : undefined
  try {
    const result = await prisma.listBuy.findMany({
      where: {
        name: {
          contains: q,
        },
      },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving data" });
  }
});

app.delete("/listbuy/:id", async (req, res) => {
  const { id } = req.params;
  const post = await prisma.listBuy.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(post);
});

app.post("/listbuy", async (req, res) => {
  const { name } = req.body;
  const result = await prisma.listBuy.create({
    data: {
      name,
    },
  });
  res.json(result);
});

app.put("/listbuy/:id", async (req, res) => {
  const { id, comprado } = req.body;
  try {
    const post = await prisma.listBuy.update({
      where: { id: Number(id) },
      data: {
        comprado,
      },
    });

    res.json(post);
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` });
  }
});

const server = app.listen(8080, () =>
  console.log(`
🚀 Server ready at: http://localhost:8080
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
