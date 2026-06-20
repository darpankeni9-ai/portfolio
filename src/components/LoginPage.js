import { signIn, isAuthenticated, onAuthStateChange } from '../auth.js'

export async function LoginPage() {
  // Check if already authenticated
  const authenticated = await isAuthenticated()
  if (authenticated) {
    window.location.hash = '#admin'
    return null
  }

  const page = document.createElement('div')
  page.className = 'login-page'

  page.innerHTML = `
    <div class="login-container">
      <div class="login-card glass">
        <div class="login-header">
          <div class="login-logo">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" stroke-width="2">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#06b6d4"/>
                  <stop offset="100%" style="stop-color:#8b5cf6"/>
                </linearGradient>
              </defs>
              <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z"/>
              <path d="M12 22V12"/>
              <path d="M12 12L3 7"/>
              <path d="M12 12l9-5"/>
            </svg>
          </div>
          <h1>Admin Login</h1>
          <p>Sign in to manage your portfolio</p>
        </div>

        <form id="login-form" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="admin@example.com"
              required
              autocomplete="email"
            >
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              autocomplete="current-password"
            >
          </div>

          <div id="login-error" class="login-error hidden"></div>

          <button type="submit" class="login-btn" id="login-submit">
            <span class="btn-text">Sign In</span>
            <span class="btn-loader hidden">
              <svg class="spinner" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="31.4 31.4" stroke-linecap="round">
                  <animateTransform attributeName="transform" type="rotate" dur="1s" from="0 12 12" to="360 12 12" repeatCount="indefinite"/>
                </circle>
              </svg>
            </span>
          </button>
        </form>

        <div class="login-footer">
          <a href="#" class="back-link">← Back to Portfolio</a>
        </div>
      </div>

      <div class="login-info">
        <h3>First Time Setup</h3>
        <p>To create your admin account, run this in the browser console:</p>
        <code>await auth.signUp('your@email.com', 'your-password')</code>
        <p class="info-note">This only needs to be done once.</p>
      </div>
    </div>
  `

  // Handle form submission
  const form = page.querySelector('#login-form')
  const errorDiv = page.querySelector('#login-error')
  const submitBtn = page.querySelector('#login-submit')
  const btnText = page.querySelector('.btn-text')
  const btnLoader = page.querySelector('.btn-loader')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = page.querySelector('#email').value.trim()
    const password = page.querySelector('#password').value

    // Reset error
    errorDiv.classList.add('hidden')

    // Show loading state
    btnText.classList.add('hidden')
    btnLoader.classList.remove('hidden')
    submitBtn.disabled = true

    try {
      console.log('Attempting login...')
      const result = await signIn(email, password)

      if (result.user) {
        console.log('Login successful, redirecting to admin...')
        window.location.hash = '#admin'
        window.location.reload()
      }
    } catch (error) {
      console.error('Login failed:', error)

      // Show error
      errorDiv.textContent = getErrorMessage(error.message)
      errorDiv.classList.remove('hidden')

      // Reset button
      btnText.classList.remove('hidden')
      btnLoader.classList.add('hidden')
      submitBtn.disabled = false
    }
  })

  // Back link
  page.querySelector('.back-link').addEventListener('click', (e) => {
    e.preventDefault()
    window.location.hash = ''
    window.location.reload()
  })

  return page
}

function getErrorMessage(error) {
  const messages = {
    'Invalid login credentials': 'Invalid email or password. Please try again.',
    'Email not confirmed': 'Please check your email and confirm your account first.',
    'Too many requests': 'Too many login attempts. Please wait a moment.',
    'User not found': 'Account not found. Please sign up first.'
  }
  return messages[error] || error || 'An error occurred. Please try again.'
}
