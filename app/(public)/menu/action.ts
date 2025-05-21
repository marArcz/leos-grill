import { IAddToCart } from "@/app/lib/definitions"
import { useAddCartItem, useGetCartItem, useUpdateCartItem } from "@/app/lib/react-query/queriesAndMutations";
import { createClient } from "@/utils/supabase/client"

export const addTocart = async (cart: IAddToCart) => {
    const supabase = createClient();
    const { data: cartItem, error: errorFetchingCartItem } = useGetCartItem(cart.product_id)
    const { mutateAsync: updateCartItem, isPending: pendingUpdateCartItem } = useUpdateCartItem()
    const { mutateAsync: addCartItem, isPending: pendingAddCartItem } = useAddCartItem()

    if (cartItem) {
        const updatedCartItem = await updateCartItem(cartItem);
        return updatedCartItem;
    } else {
        const newCartItem = await addCartItem(cart);
        return newCartItem;
    }
}