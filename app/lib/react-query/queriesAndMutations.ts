import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import { addCartItem, addDeliveryInformation, createOrder, fetchAllCart, fetchAllProducts, fetchCart, fetchCartItem, fetchCategories, fetchDeliveryInformations, fetchOrderDetails, fetchProducts, getOrders, removeCartItem, updateCartItem } from "../data"
import { DeliveryInformationSchema, IAddToCart, ICartItem, IOrder } from '../definitions'
import { Tables } from "../supabase"
import { z } from "zod"

export const useGetCartItems = (userId: string, count: number = 10, start: number = 0) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CART_ITEMS],
        queryFn: () => fetchCart(userId, count, start),
        enabled: !!userId
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

export const useGetAllProducts = (page: number, limit:number) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS, page],
        queryFn: () => fetchAllProducts(page, limit),
        
    })
}

export const useGetCartItem = (productId: number) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CART_ITEM, productId],
        queryFn: () => fetchCartItem(productId),
        enabled: !!productId
    })
}

export const useAddCartItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (cart: IAddToCart) => addCartItem(cart),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.ADD_CART_ITEM],
            })
        }
    })
}
export const useUpdateCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (cartItem: Tables<'cart_items'>) => updateCartItem(cartItem),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CART_ITEM, QUERY_KEYS.GET_CART_ITEMS]
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
        mutationFn: (deliveryInfo: z.infer<typeof DeliveryInformationSchema>) => addDeliveryInformation(deliveryInfo),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_DELIVERY_INFORMATIONS]
            })
        }
    })
}


export const useGetOrderDetails = (orderId: string | null) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ORDER_DETAILS, orderId],
        queryFn: () => orderId ? fetchOrderDetails(orderId) : null,
        enabled: !!orderId
    })
}

export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (orderData: IOrder) => createOrder(orderData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ORDER_DETAILS]
            })
        }
    })
}

export const useGetOrders = (userId: string | null) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ORDERS],
        queryFn: () => userId ? getOrders(userId) : null,
        enabled: !!userId
    })
}