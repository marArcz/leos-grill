'use server'

import { createClient } from '@/utils/supabase/server'
import { encodedRedirect } from '@/utils/utils'

export async function createAccount(data: FormData) {
    console.log('creating account');
    const supabase = await createClient()
    const { error } = await supabase.auth.signUp({
        email: (data.get('email') ?? '').toString(),
        password: (data.get('password') ?? '').toString(),
    })


    if (error) {
        console.error(error.code + " " + error.message);
    } else {
        return encodedRedirect(
            "success",
            "/sign-up",
            "Thanks for signing up! Please check your email for a verification link.",
        );
    }
}
