import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import { addDeliveryInformation, fetchAllCart, fetchCart, fetchCategories, fetchDeliveryInformations, fetchProducts, removeCartItem, updateCartItem } from "../data"
import { DeliveryInformationSchema, ICartItem } from '../definitions'
import { Tables } from "../supabase"
import { z } from "zod"

export const useGetCartItems = (count: number = 10, start: number = 0) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CART_ITEMS],
        queryFn: () => fetchCart(count, start)
    })
}

export const useGetAllCartItems = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CART_ITEMS],
        queryFn: () => fetchAllCart()
    })
}

export const useGetCategories = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CATEGORIES],
        queryFn: fetchCategories
    })
}

export const useGetProducts = (categoryId: number) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_PRODUCTS, categoryId],
        queryFn: () => fetchProducts(categoryId),
        enabled: !!categoryId
    })
}

export const useUpdateCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (cartItem: Tables<'cart_items'>) => updateCartItem(cartItem),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_PRODUCTS, QUERY_KEYS.GET_PRODUCT_BY_ID]
            })
        }
    })
}
export const useRemoveCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => removeCartItem(id),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_PRODUCTS, QUERY_KEYS.GET_PRODUCT_BY_ID]
            })
        }
    })
}

export const useGetDeliveryInfos = (userId: string | null) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_DELIVERY_INFORMATIONS, userId],
        queryFn: () => userId ? fetchDeliveryInformations(userId) : null,
        enabled: !!userId
    })
}

export const useCreateDeliveryInfo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (deliveryInfo:z.infer<typeof DeliveryInformationSchema>) => addDeliveryInformation(deliveryInfo),
        onSuccess:(data) => {
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_DELIVERY_INFORMATIONS]
            })
        }
    })
}