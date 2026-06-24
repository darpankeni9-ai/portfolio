import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Cache for portfolio data
let portfolioCache = {}

// Fetch all portfolio sections
export async function fetchPortfolioData() {
  const { data, error } = await supabase
    .from('portfolio_sections')
    .select('*')

  if (error) {
    console.error('Error fetching portfolio data:', error)
    return null
  }

  data.forEach(item => {
    portfolioCache[item.section_name] = item.data
  })

  return portfolioCache
}

// Fetch single section
export async function fetchSection(sectionName) {
  const { data, error } = await supabase
    .from('portfolio_sections')
    .select('data')
    .eq('section_name', sectionName)
    .single()

  if (error) {
    console.error('Error fetching section:', error)
    return null
  }

  return data?.data
}

// Update a specific section
export async function updateSection(sectionName, newData) {
  const { error } = await supabase
    .from('portfolio_sections')
    .update({ data: newData })
    .eq('section_name', sectionName)

  if (error) {
    console.error('Error updating section:', error)
    return false
  }

  portfolioCache[sectionName] = newData
  return true
}

// Get cached data
export function getCachedData() {
  return portfolioCache
}

// Set cached data
export function setCachedData(data) {
  portfolioCache = data
}
