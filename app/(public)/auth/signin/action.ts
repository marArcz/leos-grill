import { revalidatePath } from 'next/cache'
import { redirect, useRouter } from 'next/navigation'

import { createClient } from '@/utils/supabase/client'
import { z } from 'zod'
import { SigninFormSchema } from '@/app/lib/definitions'
import { encodedRedirect } from '@/utils/utils'

export const signin = async (signinData: z.infer<typeof SigninFormSchema>) => {
  const supabase = createClient();
  const { data,error } = await supabase.auth.signInWithPassword(signinData)
  if (error) {
      throw error;
  } else {
      const user = data.user;
      console.log('user: ', user)
      if(user.user_metadata.role  != 'customer'){
          await supabase.auth.signOut();
          return false;
      }else{
          return true;
      }
  }
}
  