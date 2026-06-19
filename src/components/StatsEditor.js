import { updateSection } from '../utils/supabase.js'

export function StatsEditor(data, onSave) {
  const section = document.createElement('div')
  section.className = 'editor-section'

  section.innerHTML = `
    <div class="editor-header">
      <h3>Statistics Section</h3>
      <p class="editor-desc">Animated counter stats displayed after hero</p>
    </div>

    <div class="editor-fields">
      <div class="field-group">
        <label>Statistics</label>
        <div id="stats-list" class="items-list"></div>
        <button class="add-btn" id="add-stat">+ Add Stat</button>
      </div>
    </div>

    <button class="save-btn" id="save-stats">Save Changes</button>
  `

  const statsList = section.querySelector('#stats-list')

  function renderStatItem(stat, index) {
    const item = document.createElement('div')
    item.className = 'item-card'
    item.dataset.index = index

    item.innerHTML = `
      <div class="item-header">
        <span class="item-number">#${index + 1}</span>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
      <div class="item-fields">
        <input type="number" class="stat-value" value="${stat.value || 0}" placeholder="Number" min="0">
        <input type="text" class="stat-suffix" value="${stat.suffix || ''}" placeholder="+" maxlength="5">
        <input type="text" class="stat-label" value="${stat.label || ''}" placeholder="Label">
      </div>
    `

    item.querySelector('.remove-btn').addEventListener('click', () => {
      item.remove()
      statsList.querySelectorAll('.item-number').forEach((el, i) => {
        el.textContent = `#${i + 1}`
      })
    })

    return item
  }

  ;(data || []).forEach((stat, index) => {
    statsList.appendChild(renderStatItem(stat, index))
  })

  section.querySelector('#add-stat').addEventListener('click', () => {
    const newIndex = statsList.children.length
    statsList.appendChild(renderStatItem({ value: 0, suffix: '', label: '' }, newIndex))
  })

  section.querySelector('#save-stats').addEventListener('click', async () => {
    const items = statsList.querySelectorAll('.item-card')
    const newStats = []

    items.forEach(item => {
      newStats.push({
        value: parseInt(item.querySelector('.stat-value').value) || 0,
        suffix: item.querySelector('.stat-suffix').value,
        label: item.querySelector('.stat-label').value
      })
    })

    const success = await updateSection('stats', newStats)
    if (success) {
      onSave(newStats)
      showNotification('Statistics updated successfully!')
    }
  })

  return section
}
