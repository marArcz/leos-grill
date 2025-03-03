import { IAddToCart, ICartItem } from "@/app/lib/definitions"
import { createClient } from "@/utils/supabase/client"

export const addTocart = async (cart:IAddToCart) => {
    const supabase = createClient();

    const {data:cartItem} = await supabase.from('cart_items').select('*').eq('product_id',cart.product_id).single();
    
    if(cartItem){
        const {data, error} = await supabase.from('cart_items').update({
            ...cartItem,
            quantity:cartItem.quantity + 1
        }).eq('id',cartItem.id)
        if(error){
            console.error('error adding to cart: ', cart);
            throw error;
        }
    
        console.log(data);
        return data;
    }else{
        const {data, error} = await supabase.from('cart_items').insert(cart);
        if(error){
            console.error('error adding to cart: ', cart);
            throw error;
        }
    
        console.log(data);
        return data;
    }
}