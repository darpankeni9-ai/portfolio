import { supabase, isAuthenticated } from './auth.js'

// Cache for portfolio data
let portfolioCache = {}

// Fetch all portfolio sections
export async function fetchPortfolioData() {
  try {
    console.log('Fetching portfolio data from Supabase...')

    const { data, error } = await supabase
      .from('portfolio_sections')
      .select('*')

    if (error) {
      console.error('Error fetching portfolio data:', error)
      throw error
    }

    // Convert array to object for easy access
    data.forEach(item => {
      portfolioCache[item.section_name] = item.data
    })

    console.log('Portfolio data loaded:', Object.keys(portfolioCache))
    return portfolioCache
  } catch (err) {
    console.error('Fetch failed:', err)
    return null
  }
}

// Fetch single section
export async function fetchSection(sectionName) {
  try {
    console.log(`Fetching section: ${sectionName}`)

    const { data, error } = await supabase
      .from('portfolio_sections')
      .select('data')
      .eq('section_name', sectionName)
      .single()

    if (error) {
      console.error(`Error fetching ${sectionName}:`, error)
      throw error
    }

    return data?.data
  } catch (err) {
    console.error(`Fetch section ${sectionName} failed:`, err)
    return null
  }
}

// Update a specific section (requires auth)
export async function updateSection(sectionName, newData) {
  try {
    // Check if authenticated
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      const error = new Error('Not authenticated. Please log in to make changes.')
      console.error(error.message)
      throw error
    }

    console.log(`Updating section: ${sectionName}`)
    console.log('New data:', JSON.stringify(newData, null, 2))

    // Show loading notification
    showNotification('Saving changes...', 'info')

    const { error } = await supabase
      .from('portfolio_sections')
      .update({
        data: newData,
        updated_at: new Date().toISOString()
      })
      .eq('section_name', sectionName)

    if (error) {
      console.error(`Error updating ${sectionName}:`, error)
      throw error
    }

    // Update cache
    portfolioCache[sectionName] = newData

    console.log(`Section ${sectionName} updated successfully`)

    // Show success notification
    showNotification(`${sectionName} saved successfully!`, 'success')

    return true
  } catch (err) {
    console.error(`Update failed for ${sectionName}:`, err)
    showNotification(`Failed to save: ${err.message}`, 'error')
    throw err
  }
}

// Get cached data
export function getCachedData() {
  return portfolioCache
}

// Set cached data
export function setCachedData(data) {
  portfolioCache = data
}

// Notification helper
function showNotification(message, type = 'success') {
  const notification = document.createElement('div')
  notification.className = `notification notification-${type}`
  notification.textContent = message

  // Type-based styling
  const colors = {
    success: 'linear-gradient(135deg, #22c55e, #10b981)',
    error: 'linear-gradient(135deg, #ef4444, #dc2626)',
    info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
  }

  notification.style.background = colors[type] || colors.success
  document.body.appendChild(notification)

  setTimeout(() => notification.remove(), 3000)
}

// Expose globally
window.updateSection = updateSection
window.showNotification = showNotification
window.getPortfolioCache = () => portfolioCache
