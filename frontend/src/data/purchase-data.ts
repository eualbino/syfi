"use client"
import { api } from "@/lib/api"
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query"

interface GetPurchaseData{
  id: number
  name: string
  comprado: boolean
  created_At: string
}

interface PostPurchaseData{
  name: string
}

async function purchaseGet(){
  const response = await api.get<GetPurchaseData[]>("/listbuys")
  return response.data
}

async function purchasePost(data: PostPurchaseData) {
  await api.post("/listbuy", data)
}

export function usePurchase(){

  const {data: getPurchase, refetch} = useQuery({
    queryKey: ['purchase'],
    queryFn: purchaseGet,
    refetchOnWindowFocus: false,
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