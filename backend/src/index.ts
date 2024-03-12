import express from "express";
import { createItemListBuy } from "./http/routes/create-item";
import { putNameItem, putStatusItem } from "./http/routes/put-endpoints";
import { getItemsPagination } from "./http/routes/get-items";
import { deleteItem } from "./http/routes/delete-item";

const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.get("/listbuys", getItemsPagination)
app.post("/listbuy", createItemListBuy);
app.put("/listbuy/comprado/:id", putStatusItem)
app.put("/listbuy/name/:id", putNameItem)
app.delete("/listbuy/:id", deleteItem)

app.listen(8080, () =>
  console.log(`
🚀 Server ready at: http://localhost:8080`)
);
