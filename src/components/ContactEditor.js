import { updateSection } from '../database.js'

export function ContactEditor(data, onSave) {
  const section = document.createElement('div')
  section.className = 'editor-section'

  section.innerHTML = `
    <div class="editor-header">
      <h3>Contact Section</h3>
      <p class="editor-desc">Contact information and social links</p>
    </div>

    <div class="editor-fields">
      <div class="field-group">
        <label>Email</label>
        <input type="email" id="contact-email" value="${data.email || ''}" placeholder="your@email.com">
      </div>

      <div class="field-group">
        <label>GitHub Profile</label>
        <input type="text" id="contact-github" value="${data.github || '#'}" placeholder="https://github.com/username">
      </div>

      <div class="field-group">
        <label>LinkedIn Profile</label>
        <input type="text" id="contact-linkedin" value="${data.linkedin || '#'}" placeholder="https://linkedin.com/in/username">
      </div>

      <div class="field-group">
        <label>Twitter Profile</label>
        <input type="text" id="contact-twitter" value="${data.twitter || '#'}" placeholder="https://twitter.com/username">
      </div>
    </div>

    <button class="save-btn" id="save-contact">Save Changes</button>
  `

  section.querySelector('#save-contact').addEventListener('click', async () => {
    const newData = {
      email: section.querySelector('#contact-email').value,
      github: section.querySelector('#contact-github').value,
      linkedin: section.querySelector('#contact-linkedin').value,
      twitter: section.querySelector('#contact-twitter').value
    }

    const success = await updateSection('contact', newData)
    if (success) {
      onSave(newData)
      showNotification('Contact info updated successfully!')
    }
  })

  return section
}
