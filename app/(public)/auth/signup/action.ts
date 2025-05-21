// 'use client';
import { createClient } from '@/utils/supabase/client'
import { SignupFormSchema } from '@/app/lib/definitions'
import { z } from 'zod'
import { Tables } from '@/app/lib/supabase'

export async function createAccount(formData: z.infer<typeof SignupFormSchema>): Promise<Tables<'user_informations'>> {
    console.log('creating account');
    const supabase = createClient()
    const { data: userAccount, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
            data: {
                role: 'customer',
                firstname: formData.firstname,
                lastname: formData.lastname,
                phone: formData.phone,
            }
        }
    })

    if (error) {
        throw error;
    } else {
        //save info
        if (userAccount.user) {
            const { data, error } = await supabase
                .from('user_informations')
                .insert({
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                    photo: '',
                    account_id: userAccount.user?.id
                })
                .select()
                .single()

            if (error) {
                throw error;
            }
            return data;
        }
        throw new Error('Cannot store user information')
    }
}
