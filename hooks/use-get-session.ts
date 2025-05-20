import { getUserInformation } from '@/app/lib/data'
import { IUserSession } from '@/app/lib/definitions'
import { createClient } from '@/utils/supabase/client'
import { Session, User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

export const useGetSession = () => {
    const [session, setSession] = useState<IUserSession | null>(null)
    const supabase = createClient()
    
    useEffect(() => {
        // Check initial session
        const getSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession()
            console.log('use-get-session:', error)
            if (session?.user) {
                const user_information = await getUserInformation(session.user.id)
                console.log('user info: ', user_information)
                setSession({
                    ...session,
                    user_information
                })
            } else {
                setSession(session)
            }
        }
        getSession()
        // Listen for auth state changes
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log("Auth event:", event)  // Optional: log auth events (SIGNED_IN, SIGNED_OUT, etc.)
            if (session?.user) {
                const user_information = await getUserInformation(session.user.id)
                console.log('user info: ', user_information)
                setSession({
                    ...session,
                    user_information
                })
            } else {
                setSession(session)
            }
        })

        // Cleanup on unmount
        return () => {
            authListener?.subscription.unsubscribe()
        }
    }, [supabase])

    return session;
}