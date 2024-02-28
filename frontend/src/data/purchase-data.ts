"use client"
import { api } from "@/lib/api"
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

interface GetPurchaseData{
  id: number
  name: string
  comprado: boolean
  created_At: string
}

interface PostPurchaseData{
  name: string
}

interface ResponseData {
  listBuy: GetPurchaseData[];
  totalItems: number;
}

async function purchaseGet(page: number){
  const response = await api.get<ResponseData>("/listbuys", {
    params: {
      page: page
    }
  })
  const listBuy = response.data.listBuy
  const totalItems = response.data.totalItems
  return { listBuy, totalItems }
}

async function purchasePost(data: PostPurchaseData) {
  await api.post("/listbuy", data)
}

export function usePurchase(page?: number){
  const {data: getPurchase, refetch} = useQuery({
    queryKey: ['purchase', page],
    queryFn: () => page ? purchaseGet(page) : null,
    refetchOnWindowFocus: true,
    placeholderData: keepPreviousData,
  })

  const {mutateAsync: postPurchase} = useMutation({
    mutationFn: purchasePost,
    onSuccess: () => {
      refetch()
    }
  })

  return { getPurchase, postPurchase }
}