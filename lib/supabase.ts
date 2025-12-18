
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    // In a real app we might throw, but for this demo check page we might want to handle it gracefully or log it.
    // console.warn('Supabase env vars missing')
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '')
