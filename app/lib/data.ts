import { products } from "./dummy-data";
import { CartItemWithProduct, ICategory } from "./definitions";
import { createClient } from "@/utils/supabase/client";
import { Tables } from "./supabase";

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
    let { data, error } = await supabase.from('cart_items').select('*, product:products(*)').range(start, start + count);
    console.log('fetched cart: ', data);


    if (error) {
        console.error('categories error:', error);
        return null;
    }

    return data as CartItemWithProduct[];
}