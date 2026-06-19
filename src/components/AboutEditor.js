import { updateSection } from '../utils/supabase.js'

export function AboutEditor(data, onSave) {
  const section = document.createElement('div')
  section.className = 'editor-section'

  section.innerHTML = `
    <div class="editor-header">
      <h3>About Section</h3>
      <p class="editor-desc">Personal information and biography</p>
    </div>

    <div class="editor-fields">
      <div class="field-group">
        <label>Full Name</label>
        <input type="text" id="about-name" value="${data.name || ''}" placeholder="Your Name">
      </div>

      <div class="field-group">
        <label>Initials (for avatar)</label>
        <input type="text" id="about-initials" value="${data.initials || ''}" placeholder="DK" maxlength="3">
      </div>

      <div class="field-group">
        <label>Location</label>
        <input type="text" id="about-location" value="${data.location || ''}" placeholder="San Francisco, CA">
      </div>

      <div class="field-group">
        <label>Education</label>
        <input type="text" id="about-education" value="${data.education || ''}" placeholder="B.S. Data Science">
      </div>

      <div class="field-group">
        <label>Experience</label>
        <input type="text" id="about-experience" value="${data.experience || ''}" placeholder="3+ Years">
      </div>

      <div class="field-group">
        <label>Focus Area</label>
        <input type="text" id="about-focus" value="${data.focus || ''}" placeholder="Business Intelligence">
      </div>

      <div class="field-group">
        <label>Bio Paragraph 1</label>
        <textarea id="about-bio1" rows="3" placeholder="First paragraph of your bio">${data.bio1 || ''}</textarea>
      </div>

      <div class="field-group">
        <label>Bio Paragraph 2</label>
        <textarea id="about-bio2" rows="3" placeholder="Second paragraph of your bio">${data.bio2 || ''}</textarea>
      </div>
    </div>

    <button class="save-btn" id="save-about">Save Changes</button>
  `

  section.querySelector('#save-about').addEventListener('click', async () => {
    const newData = {
      name: section.querySelector('#about-name').value,
      initials: section.querySelector('#about-initials').value,
      location: section.querySelector('#about-location').value,
      education: section.querySelector('#about-education').value,
      experience: section.querySelector('#about-experience').value,
      focus: section.querySelector('#about-focus').value,
      bio1: section.querySelector('#about-bio1').value,
      bio2: section.querySelector('#about-bio2').value
    }

    const success = await updateSection('about', newData)
    if (success) {
      onSave(newData)
      showNotification('About section updated successfully!')
    }
  })

  return section
}
