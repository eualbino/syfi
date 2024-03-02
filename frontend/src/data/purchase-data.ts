"use client";
import { api } from "@/lib/api";

interface GetPurchaseData {
  id: number;
  name: string;
  comprado: boolean;
  created_At: string;
}

interface PutPurchaseComprado {
  comprado: boolean;
}

interface PutPurchaseName {
  name: string;
}

interface PostPurchaseData {
  name: string;
}

interface ResponseData {
  listBuy: GetPurchaseData[];
  totalItems: number;
}

export async function purchaseGet(page: number, q?: string) {
  const response = await api.get<ResponseData>("/listbuys", {
    params: {
      page: page,
      q: q,
    },
  });
  const listBuy = response.data.listBuy;
  const totalItems = response.data.totalItems;
  return { listBuy, totalItems };
}

export async function purchasePost(data: PostPurchaseData) {
  await api.post("/listbuy", data);
}

export async function purchasePutName(id: number, name: PutPurchaseName) {
  await api.put(`/listbuy/name/${id}`, name);
}

export async function purchasePutComprado(
  id: number,
  comprado: PutPurchaseComprado
) {
  await api.put(`/listbuy/comprado/${id}`, comprado);
}

export async function purchaseDelete(id: number) {
  await api.delete(`/listbuy/${id}`);
}
