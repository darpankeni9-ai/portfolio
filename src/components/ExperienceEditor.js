import { updateSection } from '../utils/supabase.js'

const colorOptions = ['cyan', 'purple', 'pink', 'blue', 'green', 'yellow']

export function ExperienceEditor(data, onSave) {
  const section = document.createElement('div')
  section.className = 'editor-section'

  section.innerHTML = `
    <div class="editor-header">
      <h3>Experience Section</h3>
      <p class="editor-desc">Work history and timeline</p>
    </div>

    <div class="editor-fields">
      <div class="field-group">
        <label>Experience Items</label>
        <div id="experience-list" class="items-list"></div>
        <button class="add-btn" id="add-experience">+ Add Experience</button>
      </div>
    </div>

    <button class="save-btn" id="save-experience">Save Changes</button>
  `

  const experienceList = section.querySelector('#experience-list')

  function renderExperienceItem(exp, index) {
    const item = document.createElement('div')
    item.className = 'item-card'
    item.dataset.index = index

    item.innerHTML = `
      <div class="item-header">
        <span class="item-number">#${index + 1}</span>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
      <div class="item-fields">
        <input type="text" class="exp-title" value="${exp.title || ''}" placeholder="Job Title">
        <input type="text" class="exp-company" value="${exp.company || ''}" placeholder="Company Name">
        <input type="text" class="exp-period" value="${exp.period || ''}" placeholder="2022 - Present">
        <select class="exp-color">
          ${colorOptions.map(c => `<option value="${c}" ${exp.color === c ? 'selected' : ''}>${c}</option>`).join('')}
        </select>
      </div>
    `

    item.querySelector('.remove-btn').addEventListener('click', () => {
      item.remove()
      experienceList.querySelectorAll('.item-number').forEach((el, i) => {
        el.textContent = `#${i + 1}`
      })
    })

    return item
  }

  ;(data || []).forEach((exp, index) => {
    experienceList.appendChild(renderExperienceItem(exp, index))
  })

  section.querySelector('#add-experience').addEventListener('click', () => {
    const newIndex = experienceList.children.length
    experienceList.appendChild(renderExperienceItem({ title: '', company: '', period: '', color: 'cyan' }, newIndex))
  })

  section.querySelector('#save-experience').addEventListener('click', async () => {
    const items = experienceList.querySelectorAll('.item-card')
    const newExperience = []

    items.forEach(item => {
      newExperience.push({
        title: item.querySelector('.exp-title').value,
        company: item.querySelector('.exp-company').value,
        period: item.querySelector('.exp-period').value,
        color: item.querySelector('.exp-color').value
      })
    })

    const success = await updateSection('experience', newExperience)
    if (success) {
      onSave(newExperience)
      showNotification('Experience updated successfully!')
    }
  })

  return section
}
