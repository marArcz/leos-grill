import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import { fetchCart, fetchCategories, fetchProducts } from "../data"

export const useGetCartItems = (count:number=10,start:number=0) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CART_ITEMS],
        queryFn: () => fetchCart(count, start)
    })
}

export const useGetCategories = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CATEGORIES],
        queryFn: fetchCategories
    })
}

export const useGetProducts = (categoryId:number) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_PRODUCTS, categoryId],
        queryFn: () => fetchProducts(categoryId),
        enabled: !!categoryId
    })
}