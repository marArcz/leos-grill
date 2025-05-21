import { products } from "./dummy-data";
import { AddProductFormSchema, UpdateProductFormSchema, CartItemWithProduct, DeliveryInformationSchema, IAddProduct, IAddToCart, ICategory, IFilePath, IOrder, IProduct, OrderWithOrderItems, ProductWithCategory, AddCategoryFormSchema, UpdateCategoryFormSchema, IOrderStatus, IOrderListFilter, orderStatusList, orderStatusObj } from "./definitions";
import { createClient } from "@/utils/supabase/client";
import { Database, Tables } from "./supabase";
import { z } from "zod";

export const fetchProducts = async (categoryId: number): Promise<Tables<'products'>[]> => {
    const supabase = createClient();
    console.log('fetching: ', categoryId)
    const { data, error } = await supabase.from('products')
        .select('*')
        .eq('category_id', categoryId)


    if (error) {
        console.error('Error fetching products:', error);
        throw error;
    }


    return data;
}

export const fetchAllProducts = async (page: number, limit: number): Promise<ProductWithCategory[]> => {
    const supabase = createClient();

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error } = await supabase.from('products')
        .select('*, category:categories(*)')
        .returns<ProductWithCategory[]>()
        .range(from, to);

    if (error) throw new Error(error.message);
    return data ?? [];
}

export const updateProduct = async (productData: z.infer<typeof UpdateProductFormSchema>): Promise<ProductWithCategory | null> => {
    const supabase = createClient();
    const { id, ...updateFields } = productData; // Destructure to ensure `id` is explicitly handled
    console.log('product: ', productData);

    const { data, error } = await supabase.from('products')
        .update(updateFields)
        .eq('id', id)
        .select('*, category:categories(*)')
        .single();

    if (error) {
        console.error('Error updating product:', error);
        throw error;
    }

    return data;
}

export const deleteProduct = async (id: number): Promise<Boolean> => {
    const supabase = createClient();
    const { error, data } = await supabase.from('products')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting product: ', error);
        throw error;
    }

    return true;
}

export const fetchBestSellers = () => {
    return products.slice(0, 5);
}

export const fetchCategories = async () => {
    const supabase = createClient();
    let { data, error } = await supabase.from('categories').select('*');
    console.log('fetched categories: ', data);


    if (error) {
        console.error('categories error:', error);
        throw error;
    }

    return data;
}

export const fetchCart = async (userId: string, count: number = 10, start: number = 0): Promise<CartItemWithProduct[] | null> => {
    const supabase = createClient();
    let { data, error } = await supabase.from('cart_items')
        .select('*, product:products(*)')
        .eq('user_id', userId)
        .order('created_at')
        .range(start, start + count);
    console.log('fetched cart: ', data);


    if (error) {
        console.error('categories error:', error);
        return null;
    }

    return data as CartItemWithProduct[];
}

export const fetchCartItem = async (productId: number, userId: string): Promise<CartItemWithProduct | null> => {
    const supabase = createClient();
    let { data, error } = await supabase.from('cart_items')
        .select('*, product:products(*)')
        .eq('product_id', productId)
        .eq('user_id', userId)
        .single();

    if (error) {
        console.error('fetching cart item error:', error);
        return null;
    }
    return data as CartItemWithProduct;
}
export const fetchAllCart = async (user_id: string): Promise<CartItemWithProduct[] | null> => {
    const supabase = createClient();
    let { data, error } = await supabase.from('cart_items')
        .select('*, product:products(*)')
        .eq('user_id', user_id)
        .order('created_at')
        .returns<CartItemWithProduct[]>();


    if (error) {
        console.error('fetch cart error:', error);
        return null;
    }

    return data;
}
export const addCartItem = async (cart: IAddToCart): Promise<CartItemWithProduct | null> => {
    const supabase = createClient();

    const { data, error } = await supabase.from('cart_items').insert(cart).select().single();

    if (error) {
        throw error;
    }

    return data as CartItemWithProduct;
}
export const updateCartItem = async (cartItem: Tables<'cart_items'>): Promise<CartItemWithProduct | null> => {
    const supabase = createClient()

    const { data, error } = await supabase.from('cart_items').update({
        quantity: cartItem.quantity
    })
        .eq('id', cartItem.id)
        .select('*, product:products(*)')

    if (error) {
        console.log('ERROR UPDATING CART: ', error)
        throw error;
    }
    return data[0];
}

export const removeCartItem = async (id: number) => {
    const supabase = createClient();

    const { error } = await supabase.from('cart_items')
        .delete()
        .eq('id', id);

    if (error) {
        console.error(error);
        throw error;
    }
}


export const fetchDeliveryInformations = async (userId: string): Promise<Tables<'delivery_informations'>[] | null> => {
    const supabase = createClient();
    const { data, error } = await supabase.from('delivery_informations').select('*').eq('user_id', userId);

    if (error) {
        console.error(error);
        throw error;
    }

    return data;
}

export const fetchOrderDetails = async (orderId: string): Promise<OrderWithOrderItems | null> => {
    const supabase = createClient();
    const { data, error } = await supabase.from('orders').select('*, order_items(*)')
        .eq('id', orderId).returns<OrderWithOrderItems>().single()

    if (error) {
        console.error(error);
        throw error;
    }

    return data as OrderWithOrderItems;
}


export const addDeliveryInformation = async (deliveryInfo: z.infer<typeof DeliveryInformationSchema>) => {
    const supabase = createClient();
    const { data, error } = await supabase.from('delivery_informations').insert(deliveryInfo)

    if (error) {
        console.error(error);
        throw error;
    }

    return data;
}

export const createOrder = async (orderData: IOrder): Promise<Tables<'orders'> | null> => {
    console.log('creating order 2')
    const supabase = createClient();
    // create order items from cart
    const { data: cartItems, error: errorCartItems } = await supabase.from('cart_items').select('*, product:products(*)').eq('user_id', orderData.account_id)
    console.log('creating order, cartitems: ', cartItems)
    if (cartItems) {
        const { data: order, error } = await supabase.from('orders').insert(orderData).select().single();

        if (error) {
            console.error(error);
            throw error;
        }
        for (let cartItem of cartItems) {
            cartItem = cartItem as CartItemWithProduct;
            const { error } = await supabase.from('order_items').insert({
                order_id: order.id,
                product_id: cartItem.product_id,
                product_name: cartItem.product?.product_name,
                product_price: cartItem.product?.price,
                product_image: cartItem.product?.image,
                quantity: cartItem.quantity
            })
            if (error) {
                console.error('error in cart item: ', error)
                throw error;
            }
        }

        if (order.account_id) {
            await supabase.from('cart_items').delete()
                .eq('user_id', order.account_id)
        }
        return order;
    }
    throw new Error('No cart items found')
}

export const getOrders = async (userId: string): Promise<OrderWithOrderItems[] | null> => {
    const supabase = createClient();
    const { data, error } = await supabase.from('orders')
        .select('*, order_items(*), user_informations(*), delivery_informations(*)')
        .eq('account_id', userId);

    if (error) {
        console.log('error in getting orders: ', error);
        throw error;
    }

    return data;
}

export const uploadImage = async (file: File, bucket: string, path: string): Promise<String> => {
    if (!file) throw new Error('No file provided');
    const supabase = createClient();

    // Step 1: Try to download the file (to check if it exists)
    const { data, error } = await supabase.storage.from(bucket).download(path)

    if (!error) {
        // File exists, return its public URL
        const { data: publicURL } = supabase.storage.from(bucket).getPublicUrl(path)
        return publicURL.publicUrl
    }

    // Upload the file
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
            cacheControl: '3600',
            upsert: false, // Set to true if you want to overwrite existing files
            contentType: file.type,
        });

    if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(path);

    return publicUrlData.publicUrl;
}

export const addProduct = async (productDetails: z.infer<typeof AddProductFormSchema>): Promise<Tables<'products'> | null> => {
    const supabase = createClient();

    const { data, error } = await supabase.from('products')
        .insert(productDetails)
        .select()
        .single();


    if (error) {
        console.error(error);
        throw error;
    }

    return data;
}

export const getCategories = async (): Promise<Tables<'categories'>[] | null> => {
    const supabase = createClient();

    const { data, error } = await supabase.from("categories")
        .select('*');

    if (error) {
        console.log('error');
        throw error;
    }

    return data;
}

export const addCategory = async (categoryData: z.infer<typeof AddCategoryFormSchema>): Promise<Tables<'categories'>> => {
    const supabase = createClient();
    const { data, error } = await supabase.from("categories")
        .insert(categoryData)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}

export const updateCategory = async (categoryData: z.infer<typeof UpdateCategoryFormSchema>): Promise<Tables<'categories'>> => {
    const supabase = createClient();
    const { id, ...categoryDetails } = categoryData;

    const { data, error } = await supabase.from("categories")
        .update(categoryDetails)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}
export const deleteCategory = async (categoryId: number): Promise<boolean> => {
    const supabase = createClient();

    const { data, error } = await supabase.from("categories")
        .delete()
        .eq('id', categoryId)

    if (error) {
        throw error;
    }

    return true;
}

export const getProductById = async (id: number): Promise<ProductWithCategory | null> => {
    const supabase = createClient();
    const { data, error } = await supabase.from("products").select("*, category:categories(*)").eq("id", id).returns<ProductWithCategory>().single();

    if (error) {
        console.error("Error fetching product details: ", error);
    }

    return data;
}

export const getCategory = async (id: number): Promise<Tables<'categories'> | null> => {
    const supabase = createClient();
    const { data, error } = await supabase.from("categories").select("*").eq("id", id).single();

    if (error) {
        console.error("Error fetching category details: ", error);
    }

    return data;
}

export const getAllOrders = async (filters: IOrderListFilter): Promise<OrderWithOrderItems[] | null> => {
    const supabase = createClient();

    let query = supabase.from('orders')
        .select('*, order_items(*), user_informations(*), delivery_informations(*)')

    if (filters.status !== undefined) {
        query = query.eq('status', filters.status)
    }

    if (filters.order_number !== undefined) {
        query = query.eq('order_number', filters.order_number)
    }

    if (filters.is_cancelled !== undefined) {
        query = query.eq('is_cancelled', filters.is_cancelled)
    }

    const { data, error } = await query.returns<OrderWithOrderItems[]>()


    if (error) {
        throw error
    }

    return data;
}

export const getActiveOrders = async (): Promise<OrderWithOrderItems[] | null> => {
    const supabase = createClient();
    const { data, error } = await supabase.from('orders')
        .select('*, order_items(*), user_informations(*), delivery_informations(*)')
        .neq('status', orderStatusObj.OUT_FOR_DELIVERY)
        .neq('status', orderStatusObj.CANCELLED)
        .neq('status', orderStatusObj.DELIVERED)
        .order('ordered_at',{
            ascending:false
        })
        .returns<OrderWithOrderItems[]>()
    if (error) {
        throw error;
    }

    return data;
}

export const getOutForDeliveries = async (): Promise<OrderWithOrderItems[] | null> => {
    const supabase = createClient();
    const { data, error } = await supabase.from('orders')
        .select('*, order_items(*), user_informations(*), delivery_informations(*)')
        .eq('status', orderStatusObj.OUT_FOR_DELIVERY)
        .returns<OrderWithOrderItems[]>()
        
    if (error) {
        throw error;
    }

    return data;
}

export const getUserInformation = async (accountId: string): Promise<Tables<'user_informations'>> => {
    const supabase = createClient();
    const { data, error } = await supabase.from('user_informations')
        .select('*')
        .eq('account_id', accountId)
        .single()

    if (error) {
        throw error;
    }

    return data;
}

export const updateOrder = async (orderData: Tables<'orders'>): Promise<Tables<'orders'>> => {
    const supabase = createClient();
    const { id, ...orderDetails } = orderData;
    
    if (typeof id === "undefined" || id === null) {
        throw new Error("Order id is required for update.");
    }
    console.log('updatingggg')
    const { data, error } = await supabase.from('orders')
        .update(orderDetails)
        .eq('id', id)
        .select('*')
        .single();
        
    if (error) {
        throw error;
    }
    console.log('updated order: ', data)

    return data;
}