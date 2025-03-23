import { products } from "./dummy-data";
import { CartItemWithProduct, DeliveryInformationSchema, ICategory } from "./definitions";
import { createClient } from "@/utils/supabase/client";
import { Tables } from "./supabase";
import { z } from "zod";

export const fetchProducts = async (categoryId: Tables<'products'>['id']) => {
    const supabase = createClient();
    const { data, error } = await supabase.from('products').select('*').eq('id', categoryId);

    if (error) {
        console.error('Error fetching products:', error);
        throw error;
    }


    return data;
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

export const fetchCart = async (count: number = 10, start: number = 0): Promise<CartItemWithProduct[] | null> => {
    const supabase = createClient();
    let { data, error } = await supabase.from('cart_items')
        .select('*, product:products(*)')
        .order('created_at')
        .range(start, start + count);
    console.log('fetched cart: ', data);


    if (error) {
        console.error('categories error:', error);
        return null;
    }

    return data as CartItemWithProduct[];
}
export const fetchAllCart = async (): Promise<CartItemWithProduct[] | null> => {
    const supabase = createClient();
    let { data, error } = await supabase.from('cart_items')
        .select('*, product:products(*)')
        .order('created_at')


    if (error) {
        console.error('categories error:', error);
        return null;
    }

    return data as CartItemWithProduct[];
}

export const updateCartItem = async (cartItem: Tables<'cart_items'>): Promise<CartItemWithProduct | null> => {
    console.log('cartItem: ', cartItem)
    const supabase = createClient()

    const { data, error } = await supabase.from('cart_items').update({
        quantity: cartItem.quantity
    })
        .eq('id', cartItem.id)
        .select('*, product:products(*)');

    if (error) {
        console.log('ERROR UPDATING CART: ', error)
        throw error;
    }
    console.log('SUccess: ', data)
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


export const addDeliveryInformation = async (deliveryInfo:z.infer<typeof DeliveryInformationSchema>) => {
    const supabase = createClient();
    const { data, error } = await supabase.from('delivery_informations').insert(deliveryInfo)

    if (error) {
        console.error(error);
        throw error;
    }

    return data;
}