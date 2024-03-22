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
  try {
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
  } catch (error) {
    console.error(error);
  }
}

export async function purchasePost(data: PostPurchaseData) {
  try {
    const token = localStorage.getItem("authToken");
    await api.post("/listbuy", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function purchasePutName(id: number, name: PutPurchaseName) {
  try {
    const token = localStorage.getItem("authToken");
    await api.put(`/listbuy/name/${id}`, name, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function purchasePutComprado(
  id: number,
  comprado: PutPurchaseComprado
) {
  try {
    const token = localStorage.getItem("authToken");
    await api.put(`/listbuy/comprado/${id}`, comprado, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function purchaseDelete(id: number) {
  try {
    await api.delete(`/listbuy/${id}`);
  } catch (error) {
    console.error(error);
  }
}
