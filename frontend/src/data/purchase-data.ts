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
  const token = localStorage.getItem("authToken");
  const response = await api.get<ResponseData>("/listbuys", {
    headers: { Authorization: `Bearer ${token}` },
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
  const token = localStorage.getItem("authToken");
  await api.post("/listbuy", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function purchasePutName(id: number, name: PutPurchaseName) {
  const token = localStorage.getItem("authToken");
  await api.put(`/listbuy/name/${id}`, name, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function purchasePutComprado(
  id: number,
  comprado: PutPurchaseComprado
) {
  const token = localStorage.getItem("authToken");
  await api.put(`/listbuy/comprado/${id}`, comprado, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function purchaseDelete(id: number) {
  await api.delete(`/listbuy/${id}`);
}
