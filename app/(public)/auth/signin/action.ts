import { revalidatePath } from 'next/cache'
import { redirect, useRouter } from 'next/navigation'

import { createClient } from '@/utils/supabase/client'
import { z } from 'zod'
import { SigninFormSchema } from '@/app/lib/definitions'
import { encodedRedirect } from '@/utils/utils'

export async function signin(data: z.infer<typeof SigninFormSchema>) {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    throw error;
  } else {
    return;
  }
}
  