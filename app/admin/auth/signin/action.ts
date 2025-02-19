import { SigninFormSchema } from "@/app/lib/definitions";
import { createClient } from "@/utils/supabase/client";
import { z } from "zod";

export const signin = async (signinData: z.infer<typeof SigninFormSchema>) => {
    const supabase = createClient();
    const { data,error } = await supabase.auth.signInWithPassword(signinData)
    if (error) {
        throw error;
    } else {
        const user = data.user;
        console.log('user: ', user)
        if(user.user_metadata.role  ! = 'admin'){
            await supabase.auth.signOut();
            return false;
        }else{
            return true;
        }
    }
}