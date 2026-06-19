import { updateSection } from '../utils/supabase.js'

const colorPresets = [
  'from-yellow-500 to-orange-500',
  'from-blue-500 to-cyan-500',
  'from-green-500 to-emerald-500',
  'from-yellow-400 to-blue-500',
  'from-purple-500 to-pink-500',
  'from-cyan-500 to-blue-500',
  'from-red-500 to-orange-500',
  'from-indigo-500 to-purple-500'
]

export function SkillsEditor(skills, otherSkills, onSave) {
  const section = document.createElement('div')
  section.className = 'editor-section'

  section.innerHTML = `
    <div class="editor-header">
      <h3>Skills Section</h3>
      <p class="editor-desc">Technical skills with progress bars</p>
    </div>

    <div class="editor-fields">
      <div class="field-group">
        <label>Skill Cards</label>
        <div id="skills-list" class="items-list"></div>
        <button class="add-btn" id="add-skill">+ Add Skill</button>
      </div>

      <div class="field-group">
        <label>Other Technologies (comma separated)</label>
        <input type="text" id="other-skills" value="${(otherSkills || []).join(', ')}" placeholder="Tableau, Pandas, NumPy">
        <p class="field-hint">These appear as badges below the skill cards</p>
      </div>
    </div>

    <button class="save-btn" id="save-skills">Save Changes</button>
  `

  const skillsList = section.querySelector('#skills-list')

  function renderSkillItem(skill, index) {
    const item = document.createElement('div')
    item.className = 'item-card'
    item.dataset.index = index

    item.innerHTML = `
      <div class="item-header">
        <span class="item-number">#${index + 1}</span>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
      <div class="item-fields">
        <input type="text" class="skill-name" value="${skill.name || ''}" placeholder="Skill Name">
        <select class="skill-level">
          <option value="Beginner" ${skill.level === 'Beginner' ? 'selected' : ''}>Beginner</option>
          <option value="Intermediate" ${skill.level === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
          <option value="Advanced" ${skill.level === 'Advanced' ? 'selected' : ''}>Advanced</option>
          <option value="Expert" ${skill.level === 'Expert' ? 'selected' : ''}>Expert</option>
        </select>
        <input type="number" class="skill-percentage" value="${skill.percentage || 80}" min="0" max="100" placeholder="%">
        <select class="skill-color">
          ${colorPresets.map(c => `<option value="${c}" ${skill.color === c ? 'selected' : ''}>${c}</option>`).join('')}
        </select>
      </div>
    `

    item.querySelector('.remove-btn').addEventListener('click', () => {
      item.remove()
      skillsList.querySelectorAll('.item-number').forEach((el, i) => {
        el.textContent = `#${i + 1}`
      })
    })

    return item
  }

  ;(skills || []).forEach((skill, index) => {
    skillsList.appendChild(renderSkillItem(skill, index))
  })

  section.querySelector('#add-skill').addEventListener('click', () => {
    const newIndex = skillsList.children.length
    skillsList.appendChild(renderSkillItem({ name: '', level: 'Intermediate', percentage: 80, color: colorPresets[0] }, newIndex))
  })

  section.querySelector('#save-skills').addEventListener('click', async () => {
    const skillItems = skillsList.querySelectorAll('.item-card')
    const newSkills = []

    skillItems.forEach(item => {
      newSkills.push({
        name: item.querySelector('.skill-name').value,
        level: item.querySelector('.skill-level').value,
        percentage: parseInt(item.querySelector('.skill-percentage').value) || 80,
        color: item.querySelector('.skill-color').value
      })
    })

    const newOtherSkills = section.querySelector('#other-skills').value.split(',').map(s => s.trim()).filter(s => s)

    const successSkills = await updateSection('skills', newSkills)
    const successOther = await updateSection('other_skills', newOtherSkills)

    if (successSkills && successOther) {
      onSave({ skills: newSkills, other_skills: newOtherSkills })
      showNotification('Skills updated successfully!')
    }
  })

  return section
}
