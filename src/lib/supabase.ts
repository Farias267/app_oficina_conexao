import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
export const supabase = url && key && !url.includes('SEU-PROJETO') && !key.includes('SUA_CHAVE') ? createClient(url, key) : null
