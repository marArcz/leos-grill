import { Database } from '@/app/lib/supabase'
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    return createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}