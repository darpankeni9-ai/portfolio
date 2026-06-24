import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Auth state management
let currentUser = null
let sessionChecked = false

// Check if user is authenticated
export async function isAuthenticated() {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    sessionChecked = true
    currentUser = session?.user || null
    console.log('Auth check:', currentUser ? `Logged in as ${currentUser.email}` : 'Not logged in')
    return !!session
  } catch (error) {
    console.error('Auth check error:', error)
    return false
  }
}

// Get current user
export function getCurrentUser() {
  return currentUser
}

// Sign in with email/password
export async function signIn(email, password) {
  console.log('Attempting login for:', email)

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    console.error('Login error:', error.message)
    throw error
  }

  currentUser = data.user
  console.log('Login successful:', data.user.email)
  return data
}

// Sign out
export async function signOut() {
  console.log('Signing out...')

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Logout error:', error.message)
    throw error
  }

  currentUser = null
  console.log('Logged out successfully')

  // Clear any cached data
  localStorage.removeItem('portfolio_cache')

  // Redirect to home
  window.location.hash = ''
  window.location.reload()
}

// Sign up (for creating admin account)
export async function signUp(email, password) {
  console.log('Creating account for:', email)

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirect: window.location.origin
    }
  })

  if (error) {
    console.error('Signup error:', error.message)
    throw error
  }

  console.log('Account created:', data.user?.email)
  return data
}

// Listen for auth changes
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth state changed:', event)
    currentUser = session?.user || null
    callback(event, session)
  })
}

// Check if on admin route
export function isAdminRoute() {
  return window.location.hash === '#admin' || window.location.pathname === '/admin'
}

// Redirect to login if not authenticated
export async function requireAuth() {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    console.log('Not authenticated, redirecting to login')
    window.location.hash = '#login'
    return false
  }

  return true
}

// Expose supabase client and auth functions globally
window.supabase = supabase
window.auth = {
  isAuthenticated,
  getCurrentUser,
  signIn,
  signOut,
  signUp,
  requireAuth
}
