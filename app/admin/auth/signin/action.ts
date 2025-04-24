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
        if(user.user_metadata.role == 'admin'){
            console.log('user is an admin')
            return true;            
        }else{
            console.log('user is not an admin: ', user.user_metadata.role)
            await supabase.auth.signOut();
            return false;
        }
    }
}