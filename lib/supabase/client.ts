import { auth } from '@clerk/nextjs/server'
import { createBrowserClient } from '@supabase/ssr'

export function createSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
      async accessToken(){
        return ((await auth()).getToken())
      }
    }
  )
}
