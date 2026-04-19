import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Only initialize if URL is valid to prevent white screen crash
let supabaseInstance = null

if (supabaseUrl && supabaseUrl.startsWith('http')) {
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error('Failed to initialize Supabase:', error)
  }
} else {
  console.warn('Supabase credentials missing. Lead generation will run in Demo Mode.')
}

export const supabase = supabaseInstance
