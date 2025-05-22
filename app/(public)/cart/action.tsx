import { createClient } from "@/utils/supabase/client";

export const updateQuantity = async (id:number, quantity:number) => {
    const supabase = createClient()

    const {data, error} = await supabase.from('cart_items').update({
        quantity
    })
    .eq('id',id)
    .select();
    
}