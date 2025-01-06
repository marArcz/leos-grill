import { createClient } from '@/utils/supabase/client'
import { Session, User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

export const useGetSession = () => {
    const [session, setSession] = useState<Session | null>(null)
    const supabase = createClient()

    useEffect(() => {
        // Check initial session
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setSession(session)
        }
        getSession()
        // Listen for auth state changes
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            console.log("Auth event:", event)  // Optional: log auth events (SIGNED_IN, SIGNED_OUT, etc.)
            setSession(session)
        })

        // Cleanup on unmount
        return () => {
            authListener?.subscription.unsubscribe()
        }
    }, [supabase])

    return session;
}