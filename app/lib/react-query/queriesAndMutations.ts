import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import { addCartItem, addCategory, addDeliveryInformation, addProduct, createOrder, deleteCategory, deleteProduct, fetchAllCart, fetchAllProducts, fetchCart, fetchCartItem, fetchCategories, fetchDeliveryInformations, fetchOrderDetails, fetchProducts, getActiveOrders, getAllOrders, getCategory, getOrders, getOutForDeliveries, getProductById, removeCartItem, updateCartItem, updateCategory, updateOrder, updateProduct, uploadImage } from "../data"
import { AddCategoryFormSchema, AddProductFormSchema, DeliveryInformationSchema, IAddProduct, IAddToCart, ICartItem, IOrder, IOrderListFilter, IOrderStatus, UpdateCategoryFormSchema, UpdateProductFormSchema } from '../definitions'
import { Tables } from "../supabase"
import { z } from "zod"

export const useGetCartItems = (userId: string, count: number = 10, start: number = 0) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CART_ITEMS],
        queryFn: () => fetchCart(userId, count, start),
        enabled: !!userId
    })
}

export const useGetAllCartItems = (user_id: string | null) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CART_ITEMS],
        queryFn: () => user_id ? fetchAllCart(user_id) : null,
        enabled: !!user_id
    })
}

export const useGetCategories = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CATEGORIES],
        queryFn: fetchCategories
    })
}

export const useGetCategory = (id: number) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CATEGORY, id],
        queryFn: () => getCategory(id)
    })
}

export const useGetProducts = (categoryId: number) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_PRODUCTS, categoryId],
        queryFn: () => fetchProducts(categoryId),
        enabled: !!categoryId
    })
}

export const useGetAllProducts = (page: number, limit: number) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS, page],
        queryFn: () => fetchAllProducts(page, limit),

    })
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (productData: z.infer<typeof UpdateProductFormSchema>) => updateProduct(productData),
        onSuccess: (data) => {
            if (data) {
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_PRODUCTS, QUERY_KEYS.GET_PRODUCT_BY_ID, data.id],
                })
            }
        }
    })
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteProduct(id),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_PRODUCTS, QUERY_KEYS.GET_PRODUCT_BY_ID],
            })
        }
    })
}

export const useGetCartItem = (productId: number, userId:string | null) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CART_ITEM, productId, userId],
        queryFn: () => userId ? fetchCartItem(productId, userId) : null,
        enabled: !!productId
    })
}

export const useAddCartItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (cart: IAddToCart) => addCartItem(cart),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CART_ITEMS],
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
        queryKey: [QUERY_KEYS.GET_ORDER_DETAILS],
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
                queryKey: [QUERY_KEYS.GET_ORDERS, QUERY_KEYS.GET_ALL_ORDERS]
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

export const useGetAllOrders = (filters: IOrderListFilter) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ALL_ORDERS],
        queryFn: () => getAllOrders(filters)
    })
}
export const useGetActiveOrders = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ACTIVE_ORDERS],
        queryFn: () => getActiveOrders()
    })
}
export const useGetOutForDeliveries = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_OUT_FOR_DELIVERIES],
        queryFn: () => getOutForDeliveries()
    })
}

export const useUploadImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { file: File, bucket: string, path: string }) => uploadImage(data.file, data.bucket, data.path),
    })
}

export const useAddProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productDetails: z.infer<typeof AddProductFormSchema>) => addProduct(productDetails),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS],
            });
        }
    })
}

export const useGetProductById = (id: number) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_PRODUCT_BY_ID + id],
        queryFn: () => getProductById(id),
        enabled: !!id
    })
}

export const useAddCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (categoryData: z.infer<typeof AddCategoryFormSchema>) => addCategory(categoryData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CATEGORIES]
            })
        }
    })
}
export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (categoryData: z.infer<typeof UpdateCategoryFormSchema>) => updateCategory(categoryData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CATEGORIES]
            })
        }
    })
}
export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (categoryId: number) => deleteCategory(categoryId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CATEGORIES]
            })
        }
    })
}

export const useUpdateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:(orderData:Tables<'orders'>) => updateOrder(orderData),
        onSuccess:(data) => {
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_ORDERS, QUERY_KEYS.GET_ORDER_DETAILS, QUERY_KEYS.GET_ALL_ORDERS, QUERY_KEYS.GET_ACTIVE_ORDERS, QUERY_KEYS.GET_OUT_FOR_DELIVERIES]
            })
        }
    })
}