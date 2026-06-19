import './style.css'

// Initialize App
const app = document.querySelector('#app')

// Particles.js Configuration
const initParticles = () => {
  const particlesContainer = document.getElementById('particles-js')
  if (!particlesContainer) return

  const canvas = document.createElement('canvas')
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  particlesContainer.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  let particles = []
  let animationId

  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.vx = (Math.random() - 0.5) * 0.5
      this.vy = (Math.random() - 0.5) * 0.5
      this.radius = Math.random() * 2 + 1
      this.opacity = Math.random() * 0.5 + 0.2
      this.color = ['#8B5CF6', '#06B6D4', '#EC4899', '#3B82F6'][Math.floor(Math.random() * 4)]
    }

    update() {
      this.x += this.vx
      this.y += this.vy

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.fillStyle = this.color
      ctx.globalAlpha = this.opacity
      ctx.fill()
      ctx.globalAlpha = 1
    }
  }

  const initParticleArray = () => {
    particles = []
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000)
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }
  }

  const connectParticles = () => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 150)})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(particle => {
      particle.update()
      particle.draw()
    })

    connectParticles()
    animationId = requestAnimationFrame(animate)
  }

  initParticleArray()
  animate()
}

// Mouse Glow Effect
const initMouseGlow = () => {
  const glow = document.querySelector('.cursor-glow')
  if (!glow) return

  let mouseX = 0, mouseY = 0
  let glowX = 0, glowY = 0

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  const updateGlow = () => {
    glowX += (mouseX - glowX) * 0.1
    glowY += (mouseY - glowY) * 0.1
    glow.style.left = glowX + 'px'
    glow.style.top = glowY + 'px'
    requestAnimationFrame(updateGlow)
  }

  updateGlow()
}

// Typing Effect
const initTypingEffect = () => {
  const typingElement = document.querySelector('.typing-text')
  if (!typingElement) return

  const texts = ['Data Analyst', 'Power BI Expert', 'SQL Specialist', 'Python Developer']
  let textIndex = 0
  let charIndex = 0
  let isDeleting = false
  let currentText = ''

  const type = () => {
    const fullText = texts[textIndex]

    if (isDeleting) {
      currentText = fullText.substring(0, charIndex - 1)
      charIndex--
    } else {
      currentText = fullText.substring(0, charIndex + 1)
      charIndex++
    }

    typingElement.textContent = currentText

    let typeSpeed = isDeleting ? 30 : 80

    if (!isDeleting && charIndex === fullText.length) {
      typeSpeed = 2000
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
      typeSpeed = 500
    }

    setTimeout(type, typeSpeed)
  }

  type()
}

// Scroll Animation Observer
const initScrollAnimations = () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')

        // Animate progress bars
        if (entry.target.querySelector('.progress-fill')) {
          entry.target.querySelectorAll('.progress-fill').forEach((bar, index) => {
            setTimeout(() => {
              bar.classList.add('animate')
            }, index * 100)
          })
        }
      }
    })
  }, observerOptions)

  document.querySelectorAll('.fade-up, .fade-left, .fade-right, .fade-scale').forEach(el => {
    observer.observe(el)
  })
}

// Counter Animation
const animateCounter = (element, target, duration = 2000) => {
  let start = 0
  const increment = target / (duration / 16)
  const suffix = element.dataset.suffix || ''

  const updateCounter = () => {
    start += increment
    if (start < target) {
      element.textContent = Math.floor(start) + suffix
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target + suffix
    }
  }

  updateCounter()
}

const initCounters = () => {
  const counters = document.querySelectorAll('.stat-number[data-target]')
  const observerOptions = { threshold: 0.5 }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target)
        animateCounter(entry.target, target)
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  counters.forEach(counter => observer.observe(counter))
}

// Magnetic Button Effect
const initMagneticButtons = () => {
  document.querySelectorAll('.btn-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
    })

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)'
    })
  })
}

// 3D Card Tilt Effect
const init3DCards = () => {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`
    })

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)'
    })
  })
}

// Navbar Scroll Effect
const initNavbar = () => {
  const nav = document.querySelector('nav')
  if (!nav) return

  let lastScroll = 0

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 50) {
      nav.classList.add('glass-dark', 'py-4')
      nav.classList.remove('py-6')
    } else {
      nav.classList.remove('glass-dark', 'py-4')
      nav.classList.add('py-6')
    }

    lastScroll = currentScroll
  })
}

// Smooth Scroll for anchor links
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  })
}

// Render the portfolio
const renderPortfolio = () => {
  app.innerHTML = `
    <!-- Mouse Glow -->
    <div class="cursor-glow"></div>

    <!-- Animated Gradient Background -->
    <div class="gradient-bg"></div>

    <!-- Particles -->
    <div id="particles-js"></div>

    <!-- Floating Orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
    <div class="orb orb-4"></div>

    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-6">
      <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" class="text-2xl font-display font-bold gradient-text">Portfolio</a>
        <div class="hidden md:flex items-center gap-8">
          <a href="#about" class="nav-link text-sm font-medium">About</a>
          <a href="#skills" class="nav-link text-sm font-medium">Skills</a>
          <a href="#experience" class="nav-link text-sm font-medium">Experience</a>
          <a href="#projects" class="nav-link text-sm font-medium">Projects</a>
          <a href="#certifications" class="nav-link text-sm font-medium">Certifications</a>
          <a href="#contact" class="nav-link text-sm font-medium">Contact</a>
        </div>
        <button class="md:hidden text-white" id="mobile-menu-btn">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <!-- Mobile Menu -->
      <div class="hidden md:hidden glass-dark mt-4 mx-6 rounded-2xl p-6" id="mobile-menu">
        <div class="flex flex-col gap-4">
          <a href="#about" class="nav-link text-sm font-medium">About</a>
          <a href="#skills" class="nav-link text-sm font-medium">Skills</a>
          <a href="#experience" class="nav-link text-sm font-medium">Experience</a>
          <a href="#projects" class="nav-link text-sm font-medium">Projects</a>
          <a href="#certifications" class="nav-link text-sm font-medium">Certifications</a>
          <a href="#contact" class="nav-link text-sm font-medium">Contact</a>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="hero" class="min-h-screen flex items-center justify-center pt-20 pb-10 px-6 relative">
      <div class="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div class="fade-up">
          <p class="text-neon-cyan font-mono text-sm mb-4 tracking-widest uppercase">Welcome to my portfolio</p>
          <h1 class="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
            Hi, I'm <span class="gradient-text glow-text">Darpan Keni</span>
          </h1>
          <div class="text-2xl md:text-3xl font-display text-gray-300 mb-8">
            <span class="typing-wrapper">I'm a <span class="typing-text gradient-text"></span></span>
          </div>
          <p class="text-gray-400 text-lg mb-10 max-w-xl leading-relaxed">
            Transforming complex data into actionable insights through powerful visualizations and advanced analytics.
            Passionate about uncovering stories hidden in numbers.
          </p>
          <div class="flex flex-wrap gap-4">
            <a href="#contact" class="btn-neon btn-magnetic">Get In Touch</a>
            <a href="#" class="btn-outline btn-magnetic">Download Resume</a>
          </div>
        </div>
        <div class="fade-right flex justify-center">
          <div class="dashboard-mockup floating glass rounded-2xl p-1 w-full max-w-md">
            <div class="bg-dark-800 rounded-xl p-4">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div class="space-y-3">
                <div class="glass rounded-lg p-3 flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-xs text-gray-400">Revenue</p>
                    <p class="text-lg font-bold text-white">$248,500</p>
                  </div>
                  <span class="text-green-400 text-xs">+12.5%</span>
                </div>
                <div class="grid grid-cols-2 gap-3">
                  <div class="glass rounded-lg p-3">
                    <p class="text-xs text-gray-400 mb-1">Users</p>
                    <p class="text-xl font-bold text-neon-cyan">12.8K</p>
                  </div>
                  <div class="glass rounded-lg p-3">
                    <p class="text-xs text-gray-400 mb-1">Conversion</p>
                    <p class="text-xl font-bold text-neon-pink">8.2%</p>
                  </div>
                </div>
                <div class="glass rounded-lg p-3 h-24 flex items-end gap-1">
                  <div class="flex-1 bg-gradient-to-t from-neon-purple to-neon-cyan rounded" style="height: 60%"></div>
                  <div class="flex-1 bg-gradient-to-t from-neon-purple to-neon-cyan rounded" style="height: 45%"></div>
                  <div class="flex-1 bg-gradient-to-t from-neon-purple to-neon-cyan rounded" style="height: 80%"></div>
                  <div class="flex-1 bg-gradient-to-t from-neon-purple to-neon-cyan rounded" style="height: 65%"></div>
                  <div class="flex-1 bg-gradient-to-t from-neon-purple to-neon-cyan rounded" style="height: 90%"></div>
                  <div class="flex-1 bg-gradient-to-t from-neon-purple to-neon-cyan rounded" style="height: 75%"></div>
                  <div class="flex-1 bg-gradient-to-t from-neon-purple to-neon-cyan rounded" style="height: 95%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section class="py-16 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="glass rounded-3xl p-8 md:p-12 fade-up">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p class="stat-number" data-target="20" data-suffix="+">0</p>
              <p class="text-gray-400 mt-2">Projects Completed</p>
            </div>
            <div>
              <p class="stat-number" data-target="100" data-suffix="K+">0</p>
              <p class="text-gray-400 mt-2">Rows Analysed</p>
            </div>
            <div>
              <p class="stat-number" data-target="5" data-suffix="+">0</p>
              <p class="text-gray-400 mt-2">Certifications</p>
            </div>
            <div>
              <p class="stat-number" data-target="3" data-suffix="+">0</p>
              <p class="text-gray-400 mt-2">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-24 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16 fade-up">
          <h2 class="text-4xl md:text-5xl font-display font-bold mb-4">About <span class="gradient-text">Me</span></h2>
          <div class="section-header mx-auto"></div>
        </div>
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="fade-left">
            <div class="glass rounded-3xl p-8 relative overflow-hidden">
              <div class="absolute top-0 right-0 w-64 h-64 bg-neon-purple/20 rounded-full blur-3xl"></div>
              <div class="relative z-10">
                <div class="w-48 h-48 mx-auto mb-8 rounded-full gradient-bg p-1">
                  <div class="w-full h-full rounded-full bg-dark-800 flex items-center justify-center">
                    <span class="text-6xl font-display font-bold gradient-text">DK</span>
                  </div>
                </div>
                <p class="text-gray-300 leading-relaxed text-center">
                  Data enthusiast with a passion for transforming raw data into meaningful insights.
                  Specialized in Power BI, SQL, and Python for data analysis and visualization.
                </p>
              </div>
            </div>
          </div>
          <div class="fade-right space-y-6">
            <p class="text-gray-300 text-lg leading-relaxed">
              I'm a dedicated Data Analyst with expertise in transforming complex datasets into actionable business insights.
              My journey in data analytics began with a curiosity about how numbers tell stories, and has evolved into a passion for creating impactful visualizations.
            </p>
            <p class="text-gray-300 text-lg leading-relaxed">
              With hands-on experience in Power BI, SQL, Excel, and Python, I specialize in building interactive dashboards,
              performing data cleaning and transformation, and developing automated reporting solutions that drive business decisions.
            </p>
            <div class="grid grid-cols-2 gap-4 mt-8">
              <div class="glass rounded-xl p-4">
                <p class="text-neon-cyan font-mono text-sm">Location</p>
                <p class="text-white font-medium">San Francisco, CA</p>
              </div>
              <div class="glass rounded-xl p-4">
                <p class="text-neon-pink font-mono text-sm">Education</p>
                <p class="text-white font-medium">B.S. Data Science</p>
              </div>
              <div class="glass rounded-xl p-4">
                <p class="text-neon-purple font-mono text-sm">Experience</p>
                <p class="text-white font-medium">3+ Years</p>
              </div>
              <div class="glass rounded-xl p-4">
                <p class="text-neon-blue font-mono text-sm">Focus</p>
                <p class="text-white font-medium">Business Intelligence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="py-24 px-6 relative">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16 fade-up">
          <h2 class="text-4xl md:text-5xl font-display font-bold mb-4">Technical <span class="gradient-text">Skills</span></h2>
          <div class="section-header mx-auto"></div>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Power BI -->
          <div class="skill-card glass rounded-2xl fade-up" style="transition-delay: 0.1s">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h4v4H7V7zm0 6h10v2H7v-2zm6-6h4v4h-4V7z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-bold text-white">Power BI</h3>
                <p class="text-sm text-gray-400">Advanced</p>
              </div>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="--progress: 95%"></div>
            </div>
          </div>

          <!-- SQL -->
          <div class="skill-card glass rounded-2xl fade-up" style="transition-delay: 0.2s">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-bold text-white">SQL</h3>
                <p class="text-sm text-gray-400">Expert</p>
              </div>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="--progress: 90%"></div>
            </div>
          </div>

          <!-- Excel -->
          <div class="skill-card glass rounded-2xl fade-up" style="transition-delay: 0.3s">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-bold text-white">Excel</h3>
                <p class="text-sm text-gray-400">Advanced</p>
              </div>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="--progress: 92%"></div>
            </div>
          </div>

          <!-- Python -->
          <div class="skill-card glass rounded-2xl fade-up" style="transition-delay: 0.4s">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-blue-500 flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-bold text-white">Python</h3>
                <p class="text-sm text-gray-400">Intermediate</p>
              </div>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="--progress: 75%"></div>
            </div>
          </div>

          <!-- Power Query -->
          <div class="skill-card glass rounded-2xl fade-up" style="transition-delay: 0.5s">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-bold text-white">Power Query</h3>
                <p class="text-sm text-gray-400">Advanced</p>
              </div>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="--progress: 88%"></div>
            </div>
          </div>

          <!-- DAX -->
          <div class="skill-card glass rounded-2xl fade-up" style="transition-delay: 0.6s">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-bold text-white">DAX</h3>
                <p class="text-sm text-gray-400">Advanced</p>
              </div>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="--progress: 85%"></div>
            </div>
          </div>
        </div>

        <!-- Additional Skills -->
        <div class="mt-12 fade-up">
          <h3 class="text-xl font-display font-bold text-center mb-8">Other Technologies</h3>
          <div class="flex flex-wrap justify-center gap-3">
            <span class="glass px-4 py-2 rounded-full text-sm text-gray-300 hover:border-neon-purple/50 border border-transparent transition-all cursor-default">Tableau</span>
            <span class="glass px-4 py-2 rounded-full text-sm text-gray-300 hover:border-neon-cyan/50 border border-transparent transition-all cursor-default">Pandas</span>
            <span class="glass px-4 py-2 rounded-full text-sm text-gray-300 hover:border-neon-pink/50 border border-transparent transition-all cursor-default">NumPy</span>
            <span class="glass px-4 py-2 rounded-full text-sm text-gray-300 hover:border-neon-purple/50 border border-transparent transition-all cursor-default">PostgreSQL</span>
            <span class="glass px-4 py-2 rounded-full text-sm text-gray-300 hover:border-neon-cyan/50 border border-transparent transition-all cursor-default">MySQL</span>
            <span class="glass px-4 py-2 rounded-full text-sm text-gray-300 hover:border-neon-pink/50 border border-transparent transition-all cursor-default">Azure</span>
            <span class="glass px-4 py-2 rounded-full text-sm text-gray-300 hover:border-neon-purple/50 border border-transparent transition-all cursor-default">SSIS</span>
            <span class="glass px-4 py-2 rounded-full text-sm text-gray-300 hover:border-neon-cyan/50 border border-transparent transition-all cursor-default">Git</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="py-24 px-6">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16 fade-up">
          <h2 class="text-4xl md:text-5xl font-display font-bold mb-4">Work <span class="gradient-text">Experience</span></h2>
          <div class="section-header mx-auto"></div>
        </div>

        <div class="relative">
          <!-- Timeline Line -->
          <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-purple via-neon-cyan to-neon-pink"></div>

          <!-- Experience Items -->
          <div class="space-y-12">
            <!-- Item 1 -->
            <div class="fade-up md:grid md:grid-cols-2 md:gap-8 items-center">
              <div class="md:text-right md:pr-12 mb-4 md:mb-0">
                <div class="glass rounded-2xl p-6 inline-block">
                  <h3 class="text-xl font-display font-bold text-white mb-2">Senior Data Analyst</h3>
                  <p class="text-neon-cyan font-medium">TechCorp Inc.</p>
                  <p class="text-gray-400 text-sm mt-1">2022 - Present</p>
                </div>
              </div>
              <div class="hidden md:flex items-center justify-start pl-4">
                <div class="timeline-dot"></div>
              </div>
            </div>

            <!-- Item 2 -->
            <div class="fade-up md:grid md:grid-cols-2 md:gap-8 items-center">
              <div class="hidden md:flex items-center justify-end pr-4 md:order-1">
                <div class="timeline-dot"></div>
              </div>
              <div class="md:pl-12 md:order-2 md:text-left mb-4 md:mb-0">
                <div class="glass rounded-2xl p-6 inline-block">
                  <h3 class="text-xl font-display font-bold text-white mb-2">Data Analyst</h3>
                  <p class="text-neon-purple font-medium">DataDriven Solutions</p>
                  <p class="text-gray-400 text-sm mt-1">2020 - 2022</p>
                </div>
              </div>
            </div>

            <!-- Item 3 -->
            <div class="fade-up md:grid md:grid-cols-2 md:gap-8 items-center">
              <div class="md:text-right md:pr-12 mb-4 md:mb-0">
                <div class="glass rounded-2xl p-6 inline-block">
                  <h3 class="text-xl font-display font-bold text-white mb-2">Business Intelligence Intern</h3>
                  <p class="text-neon-pink font-medium">Analytics Pro</p>
                  <p class="text-gray-400 text-sm mt-1">2019 - 2020</p>
                </div>
              </div>
              <div class="hidden md:flex items-center justify-start pl-4">
                <div class="timeline-dot"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-24 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16 fade-up">
          <h2 class="text-4xl md:text-5xl font-display font-bold mb-4">Featured <span class="gradient-text">Projects</span></h2>
          <div class="section-header mx-auto"></div>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Project 1 -->
          <div class="project-card glass rounded-2xl overflow-hidden fade-up" style="transition-delay: 0.1s">
            <div class="h-48 bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 flex items-center justify-center">
              <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
            </div>
            <div class="relative z-10 p-6">
              <h3 class="text-xl font-display font-bold text-white mb-2">Sales Dashboard</h3>
              <p class="text-gray-400 text-sm mb-4">Interactive Power BI dashboard tracking sales performance with real-time KPIs and drill-down capabilities.</p>
              <div class="flex gap-3">
                <a href="#" class="text-neon-cyan hover:text-neon-purple transition-colors text-sm flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </a>
                <a href="#" class="text-neon-pink hover:text-neon-purple transition-colors text-sm flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  Live Demo
                </a>
              </div>
            </div>
          </div>

          <!-- Project 2 -->
          <div class="project-card glass rounded-2xl overflow-hidden fade-up" style="transition-delay: 0.2s">
            <div class="h-48 bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 flex items-center justify-center">
              <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/>
                </svg>
              </div>
            </div>
            <div class="relative z-10 p-6">
              <h3 class="text-xl font-display font-bold text-white mb-2">Customer Analytics</h3>
              <p class="text-gray-400 text-sm mb-4">SQL-based customer segmentation and churn prediction model with Python integration.</p>
              <div class="flex gap-3">
                <a href="#" class="text-neon-cyan hover:text-neon-purple transition-colors text-sm flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </a>
                <a href="#" class="text-neon-pink hover:text-neon-purple transition-colors text-sm flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  Live Demo
                </a>
              </div>
            </div>
          </div>

          <!-- Project 3 -->
          <div class="project-card glass rounded-2xl overflow-hidden fade-up" style="transition-delay: 0.3s">
            <div class="h-48 bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 flex items-center justify-center">
              <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-blue flex items-center justify-center">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
            </div>
            <div class="relative z-10 p-6">
              <h3 class="text-xl font-display font-bold text-white mb-2">Financial Reporting</h3>
              <p class="text-gray-400 text-sm mb-4">Automated Excel reporting system with VBA macros and Power Query transformations.</p>
              <div class="flex gap-3">
                <a href="#" class="text-neon-cyan hover:text-neon-purple transition-colors text-sm flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </a>
                <a href="#" class="text-neon-pink hover:text-neon-purple transition-colors text-sm flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  Live Demo
                </a>
              </div>
            </div>
          </div>

          <!-- Project 4 -->
          <div class="project-card glass rounded-2xl overflow-hidden fade-up" style="transition-delay: 0.4s">
            <div class="h-48 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
              <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
              </div>
            </div>
            <div class="relative z-10 p-6">
              <h3 class="text-xl font-display font-bold text-white mb-2">Predictive Analytics</h3>
              <p class="text-gray-400 text-sm mb-4">Machine learning model for demand forecasting using Python and time series analysis.</p>
              <div class="flex gap-3">
                <a href="#" class="text-neon-cyan hover:text-neon-purple transition-colors text-sm flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </a>
                <a href="#" class="text-neon-pink hover:text-neon-purple transition-colors text-sm flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Certifications Section -->
    <section id="certifications" class="py-24 px-6">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16 fade-up">
          <h2 class="text-4xl md:text-5xl font-display font-bold mb-4">Professional <span class="gradient-text">Certifications</span></h2>
          <div class="section-header mx-auto"></div>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div class="cert-badge glass rounded-2xl fade-up" style="transition-delay: 0.1s">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center flex-shrink-0">
                <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.18l6.9 3.82L12 11.82 5.1 8 12 4.18zM5 9.82l6 3.33v6.03l-6-3.33V9.82zm13 0v6.03l-6 3.33v-6.03l6-3.33z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-white">Microsoft Power BI Data Analyst</h3>
                <p class="text-gray-400 text-sm">Microsoft • 2023</p>
              </div>
            </div>
          </div>

          <div class="cert-badge glass rounded-2xl fade-up" style="transition-delay: 0.2s">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.18l6.9 3.82L12 11.82 5.1 8 12 4.18zM5 9.82l6 3.33v6.03l-6-3.33V9.82zm13 0v6.03l-6 3.33v-6.03l6-3.33z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-white">Google Data Analytics</h3>
                <p class="text-gray-400 text-sm">Google • 2022</p>
              </div>
            </div>
          </div>

          <div class="cert-badge glass rounded-2xl fade-up" style="transition-delay: 0.3s">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center flex-shrink-0">
                <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.18l6.9 3.82L12 11.82 5.1 8 12 4.18zM5 9.82l6 3.33v6.03l-6-3.33V9.82zm13 0v6.03l-6 3.33v-6.03l6-3.33z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-white">Tableau Desktop Specialist</h3>
                <p class="text-gray-400 text-sm">Tableau • 2022</p>
              </div>
            </div>
          </div>

          <div class="cert-badge glass rounded-2xl fade-up" style="transition-delay: 0.4s">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center flex-shrink-0">
                <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.18l6.9 3.82L12 11.82 5.1 8 12 4.18zM5 9.82l6 3.33v6.03l-6-3.33V9.82zm13 0v6.03l-6 3.33v-6.03l6-3.33z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-white">Azure Data Fundamentals</h3>
                <p class="text-gray-400 text-sm">Microsoft • 2021</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-24 px-6">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16 fade-up">
          <h2 class="text-4xl md:text-5xl font-display font-bold mb-4">Get In <span class="gradient-text">Touch</span></h2>
          <p class="text-gray-400 mt-4 max-w-xl mx-auto">Have a project in mind or want to collaborate? Feel free to reach out!</p>
        </div>

        <div class="glass rounded-3xl p-8 md:p-12 fade-up">
          <form class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input type="text" class="form-input" placeholder="Your name">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input type="email" class="form-input" placeholder="your@email.com">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Subject</label>
              <input type="text" class="form-input" placeholder="What's this about?">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea class="form-input min-h-32 resize-none" placeholder="Your message..."></textarea>
            </div>
            <button type="submit" class="btn-neon btn-magnetic w-full">
              Send Message
            </button>
          </form>

          <div class="mt-12 pt-8 border-t border-gray-700/50">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6">
              <div class="flex gap-4">
                <a href="#" class="social-icon">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="#" class="social-icon">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" class="social-icon">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.018 10.0018 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="mailto:darpan@example.com" class="social-icon">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </a>
              </div>
              <p class="text-gray-400 text-sm">darpan@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 px-6 border-t border-gray-800">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-gray-400 text-sm">&copy; 2024 Darpan Keni. All rights reserved.</p>
        <p class="text-gray-500 text-sm">Designed & Built with passion</p>
      </div>
    </footer>
  `
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  renderPortfolio()

  // Wait for DOM to be fully populated
  requestAnimationFrame(() => {
    initParticles()
    initMouseGlow()
    initTypingEffect()
    initScrollAnimations()
    initCounters()
    initMagneticButtons()
    init3DCards()
    initNavbar()
    initSmoothScroll()

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn')
    const mobileMenu = document.getElementById('mobile-menu')

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden')
      })

      // Close menu when clicking a link
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden')
        })
      })
    }

    // Animate progress bars width
    const style = document.createElement('style')
    style.textContent = `
      .progress-fill.animate {
        transform: translateX(0) !important;
      }
      .progress-fill {
        width: 100%;
      }
      .progress-fill[style*="--progress"] {
        width: var(--progress);
      }
    `
    document.head.appendChild(style)
  })
})

// Export for Vite HMR
export { renderPortfolio }
