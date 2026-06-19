import { updateSection } from '../utils/supabase.js'

export function HeroEditor(data, onSave) {
  const section = document.createElement('div')
  section.className = 'editor-section'

  section.innerHTML = `
    <div class="editor-header">
      <h3>Hero Section</h3>
      <p class="editor-desc">Main landing section with your name and title</p>
    </div>

    <div class="editor-fields">
      <div class="field-group">
        <label>Full Name</label>
        <input type="text" id="hero-name" value="${data.name || ''}" placeholder="Your Name">
      </div>

      <div class="field-group">
        <label>Subtitle</label>
        <input type="text" id="hero-subtitle" value="${data.subtitle || ''}" placeholder="Welcome to my portfolio">
      </div>

      <div class="field-group">
        <label>Description</label>
        <textarea id="hero-description" rows="3" placeholder="A brief description about yourself">${data.description || ''}</textarea>
      </div>

      <div class="field-group">
        <label>Roles (comma separated)</label>
        <input type="text" id="hero-roles" value="${(data.roles || []).join(', ')}" placeholder="Data Analyst, Power BI Expert, SQL Specialist">
        <p class="field-hint">These will rotate in the typing animation</p>
      </div>

      <div class="field-group">
        <label>Resume Link</label>
        <input type="text" id="hero-resume" value="${data.resumeLink || '#'}" placeholder="Link to your resume">
      </div>

      <div class="field-group">
        <label>Contact Link</label>
        <input type="text" id="hero-contact" value="${data.contactLink || '#contact'}" placeholder="#contact or full URL">
      </div>
    </div>

    <button class="save-btn" id="save-hero">Save Changes</button>
  `

  section.querySelector('#save-hero').addEventListener('click', async () => {
    const newData = {
      name: section.querySelector('#hero-name').value,
      subtitle: section.querySelector('#hero-subtitle').value,
      description: section.querySelector('#hero-description').value,
      roles: section.querySelector('#hero-roles').value.split(',').map(r => r.trim()).filter(r => r),
      resumeLink: section.querySelector('#hero-resume').value,
      contactLink: section.querySelector('#hero-contact').value
    }

    const success = await updateSection('hero', newData)
    if (success) {
      onSave(newData)
      showNotification('Hero section updated successfully!')
    }
  })

  return section
}
