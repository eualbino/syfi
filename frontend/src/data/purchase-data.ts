"use client";
import { api } from "@/lib/api";

interface GetPurchaseData {
  id: number;
  name: string;
  comprado: boolean;
  created_At: string;
}

interface PutPurchase{
  comprado: boolean
}

interface PostPurchaseData {
  name: string;
}

interface ResponseData {
  listBuy: GetPurchaseData[];
  totalItems: number;
}

export async function purchaseGet(page: number) {
  const response = await api.get<ResponseData>("/listbuys", {
    params: {
      page: page,
    },
  });
  const listBuy = response.data.listBuy;
  const totalItems = response.data.totalItems;
  return { listBuy, totalItems };
}

export async function purchasePost(data: PostPurchaseData) {
  await api.post("/listbuy", data);
}

export async function purchasePut(id: number, data: PutPurchase){
  await api.put(`/listbuy/${id}`, data)
}

export async function purchaseDelete(id: number) {
  await api.delete(`/listbuy/${id}`);
}
