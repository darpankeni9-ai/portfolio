import { HeroEditor } from './HeroEditor.js'
import { AboutEditor } from './AboutEditor.js'
import { SkillsEditor } from './SkillsEditor.js'
import { ExperienceEditor } from './ExperienceEditor.js'
import { ProjectsEditor } from './ProjectsEditor.js'
import { CertificationsEditor } from './CertificationsEditor.js'
import { StatsEditor } from './StatsEditor.js'
import { ContactEditor } from './ContactEditor.js'
import { isAuthenticated, getCurrentUser, signOut } from '../auth.js'
import { fetchPortfolioData, getCachedData } from '../database.js'

// Make supabase available globally
import { supabase } from '../auth.js'
window.supabase = supabase

const tabs = [
  { id: 'hero', label: 'Hero', icon: '⭐' },
  { id: 'about', label: 'About', icon: '👤' },
  { id: 'skills', label: 'Skills', icon: '💼' },
  { id: 'experience', label: 'Experience', icon: '📈' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'certifications', label: 'Certs', icon: '🏅' },
  { id: 'stats', label: 'Stats', icon: '📊' },
  { id: 'contact', label: 'Contact', icon: '✉️' }
]

let currentTab = 'hero'
let data = {}

export async function AdminPanel() {
  // Verify authentication first
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    window.location.hash = '#login'
    return null
  }

  const container = document.createElement('div')
  container.className = 'admin-panel'

  container.innerHTML = `
    <div class="admin-header">
      <div class="admin-title">
        <h2>Portfolio Admin Panel</h2>
        <p class="admin-user">Logged in as: <strong>${getCurrentUser()?.email || 'Admin'}</strong></p>
      </div>
      <div class="admin-actions">
        <a href="#" class="view-site-btn" id="view-site">View Site</a>
        <button class="logout-btn" id="logout-btn">Logout</button>
        <button class="close-admin-btn" id="close-admin">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>

    <div class="admin-tabs">
      ${tabs.map(tab => `
        <button class="admin-tab ${tab.id === currentTab ? 'active' : ''}" data-tab="${tab.id}">
          <span class="tab-icon">${tab.icon}</span>
          <span class="tab-label">${tab.label}</span>
        </button>
      `).join('')}
    </div>

    <div class="admin-content" id="admin-content">
      <div class="loading">Loading...</div>
    </div>
  `

  // Fetch data
  console.log('AdminPanel: Fetching portfolio data...')
  await fetchPortfolioData()
  data = getCachedData()
  console.log('AdminPanel: Data loaded:', data)

  // Render initial tab
  renderTabContent(container, currentTab)

  // Tab click handlers
  container.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      container.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'))
      tab.classList.add('active')
      currentTab = tab.dataset.tab
      renderTabContent(container, currentTab)
    })
  })

  // Close button
  container.querySelector('#close-admin').addEventListener('click', () => {
    container.remove()
    document.body.style.overflow = ''
  })

  // View site button
  container.querySelector('#view-site').addEventListener('click', (e) => {
    e.preventDefault()
    container.remove()
    document.body.style.overflow = ''
    window.location.hash = ''
  })

  // Logout button
  container.querySelector('#logout-btn').addEventListener('click', async () => {
    if (confirm('Are you sure you want to logout?')) {
      await signOut()
    }
  })

  return container
}

function renderTabContent(container, tabId) {
  const content = container.querySelector('#admin-content')
  content.innerHTML = ''

  const onSave = (newData) => {
    console.log(`AdminPanel: ${tabId} saved, updating cache`)
    data[tabId] = newData
  }

  console.log(`AdminPanel: Rendering tab ${tabId}`)

  switch (tabId) {
    case 'hero':
      content.appendChild(HeroEditor(data.hero || {}, onSave))
      break
    case 'about':
      content.appendChild(AboutEditor(data.about || {}, onSave))
      break
    case 'skills':
      content.appendChild(SkillsEditor(data.skills || [], data.other_skills || [], onSave))
      break
    case 'experience':
      content.appendChild(ExperienceEditor(data.experience || [], onSave))
      break
    case 'projects':
      content.appendChild(ProjectsEditor(data.projects || [], onSave))
      break
    case 'certifications':
      content.appendChild(CertificationsEditor(data.certifications || [], onSave))
      break
    case 'stats':
      content.appendChild(StatsEditor(data.stats || [], onSave))
      break
    case 'contact':
      content.appendChild(ContactEditor(data.contact || {}, onSave))
      break
  }
}

// Make AdminPanel globally available
window.AdminPanel = AdminPanel
