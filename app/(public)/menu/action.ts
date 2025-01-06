import { IAddToCart, ICartItem } from "@/app/lib/definitions"
import { createClient } from "@/utils/supabase/client"

export const addTocart = async (cart:IAddToCart) => {
    const supabase = createClient();

    const {data, error} = await supabase.from('cart_items').insert(cart);

    if(error){
        console.error('error adding to cart: ', cart);
        throw error;
    }

    console.log(data);
    return data;
}