import { updateSection } from '../database.js'

const colorPresets = [
  'from-yellow-400 to-yellow-600',
  'from-blue-400 to-blue-600',
  'from-orange-400 to-red-500',
  'from-green-400 to-emerald-600',
  'from-purple-400 to-purple-600',
  'from-cyan-400 to-cyan-600'
]

export function CertificationsEditor(data, onSave) {
  const section = document.createElement('div')
  section.className = 'editor-section'

  section.innerHTML = `
    <div class="editor-header">
      <h3>Certifications Section</h3>
      <p class="editor-desc">Professional certifications and badges</p>
    </div>

    <div class="editor-fields">
      <div class="field-group">
        <label>Certifications</label>
        <div id="certs-list" class="items-list"></div>
        <button class="add-btn" id="add-cert">+ Add Certification</button>
      </div>
    </div>

    <button class="save-btn" id="save-certs">Save Changes</button>
  `

  const certsList = section.querySelector('#certs-list')

  function renderCertItem(cert, index) {
    const item = document.createElement('div')
    item.className = 'item-card'
    item.dataset.index = index

    item.innerHTML = `
      <div class="item-header">
        <span class="item-number">#${index + 1}</span>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
      <div class="item-fields">
        <input type="text" class="cert-name" value="${cert.name || ''}" placeholder="Certification Name">
        <input type="text" class="cert-issuer" value="${cert.issuer || ''}" placeholder="Issuing Organization">
        <input type="text" class="cert-year" value="${cert.year || ''}" placeholder="Year">
        <select class="cert-color">
          ${colorPresets.map(c => `<option value="${c}" ${cert.colors === c ? 'selected' : ''}>${c.split('-')[2]}</option>`).join('')}
        </select>
      </div>
    `

    item.querySelector('.remove-btn').addEventListener('click', () => {
      item.remove()
      certsList.querySelectorAll('.item-number').forEach((el, i) => {
        el.textContent = `#${i + 1}`
      })
    })

    return item
  }

  ;(data || []).forEach((cert, index) => {
    certsList.appendChild(renderCertItem(cert, index))
  })

  section.querySelector('#add-cert').addEventListener('click', () => {
    const newIndex = certsList.children.length
    certsList.appendChild(renderCertItem({ name: '', issuer: '', year: '', colors: colorPresets[0] }, newIndex))
  })

  section.querySelector('#save-certs').addEventListener('click', async () => {
    const items = certsList.querySelectorAll('.item-card')
    const newCerts = []

    items.forEach(item => {
      newCerts.push({
        name: item.querySelector('.cert-name').value,
        issuer: item.querySelector('.cert-issuer').value,
        year: item.querySelector('.cert-year').value,
        colors: item.querySelector('.cert-color').value
      })
    })

    const success = await updateSection('certifications', newCerts)
    if (success) {
      onSave(newCerts)
      showNotification('Certifications updated successfully!')
    }
  })

  return section
}
