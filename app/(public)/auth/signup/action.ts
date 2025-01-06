// 'use client';
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { IUserInformation, SignupFormSchema } from '@/app/lib/definitions'
import { z } from 'zod'
import { encodedRedirect } from '@/utils/utils'

export async function createAccount(formData: z.infer<typeof SignupFormSchema>) {
    console.log('creating account');
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options:{
            data:{
                role:'customer',
                firstname:formData.firstname,
                lastname:formData.lastname,
                phone:formData.phone,
            }
        }
    })


    if (error) {
        throw error;
    } else {
        // //save info
        // const { data, error } = await supabase
        //     .from('user_informations')
        //     .insert<IUserInformation>({
        //         firstname: formData.firstname,
        //         lastname:formData.lastname,
        //         photo:''
        //     })
        return;
    }
}
