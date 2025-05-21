import { IAddToCart } from "@/app/lib/definitions";
import { useAddCartItem, useGetCartItem, useUpdateCartItem } from "@/app/lib/react-query/queriesAndMutations";
import { useGetSession } from "@/hooks/use-get-session";
import { createClient } from "@/utils/supabase/client";

export const addTocart = async (cart: IAddToCart) => {
    const supabase = createClient();
    const session = useGetSession()
    const { data: cartItem, error: errorFetchingCartItem } = useGetCartItem(cart.product_id, session?.user.id ?? null)
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