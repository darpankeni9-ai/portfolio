import { updateSection } from '../utils/supabase.js'

const colorPresets = [
  'from-neon-purple/20 to-neon-cyan/20',
  'from-neon-pink/20 to-neon-purple/20',
  'from-neon-cyan/20 to-neon-blue/20',
  'from-neon-blue/20 to-neon-purple/20',
  'from-yellow-500/20 to-orange-500/20',
  'from-green-500/20 to-emerald-500/20'
]

const iconColorPresets = [
  'from-neon-purple to-neon-cyan',
  'from-neon-pink to-neon-purple',
  'from-neon-cyan to-neon-blue',
  'from-neon-blue to-neon-purple',
  'from-yellow-500 to-orange-500',
  'from-green-500 to-emerald-500'
]

export function ProjectsEditor(data, onSave) {
  const section = document.createElement('div')
  section.className = 'editor-section'

  section.innerHTML = `
    <div class="editor-header">
      <h3>Projects Section</h3>
      <p class="editor-desc">Portfolio projects showcase</p>
    </div>

    <div class="editor-fields">
      <div class="field-group">
        <label>Project Cards</label>
        <div id="projects-list" class="items-list"></div>
        <button class="add-btn" id="add-project">+ Add Project</button>
      </div>
    </div>

    <button class="save-btn" id="save-projects">Save Changes</button>
  `

  const projectsList = section.querySelector('#projects-list')

  function renderProjectItem(project, index) {
    const item = document.createElement('div')
    item.className = 'item-card wide'
    item.dataset.index = index

    item.innerHTML = `
      <div class="item-header">
        <span class="item-number">#${index + 1}</span>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
      <div class="item-fields">
        <input type="text" class="project-title" value="${project.title || ''}" placeholder="Project Title">
        <textarea class="project-desc" rows="2" placeholder="Project description">${project.description || ''}</textarea>
        <div class="field-row">
          <select class="project-colors">
            ${colorPresets.map(c => `<option value="${c}" ${project.colors === c ? 'selected' : ''}>${c.split('/')[0]}</option>`).join('')}
          </select>
          <select class="project-icon-colors">
            ${iconColorPresets.map(c => `<option value="${c}" ${project.iconColors === c ? 'selected' : ''}>${c.split(' ')[0]}</option>`).join('')}
          </select>
        </div>
        <div class="field-row">
          <input type="text" class="project-github" value="${project.github || '#'}" placeholder="GitHub URL">
          <input type="text" class="project-demo" value="${project.demo || '#'}" placeholder="Demo URL">
        </div>
      </div>
    `

    item.querySelector('.remove-btn').addEventListener('click', () => {
      item.remove()
      projectsList.querySelectorAll('.item-number').forEach((el, i) => {
        el.textContent = `#${i + 1}`
      })
    })

    return item
  }

  ;(data || []).forEach((project, index) => {
    projectsList.appendChild(renderProjectItem(project, index))
  })

  section.querySelector('#add-project').addEventListener('click', () => {
    const newIndex = projectsList.children.length
    projectsList.appendChild(renderProjectItem({ title: '', description: '', colors: colorPresets[0], iconColors: iconColorPresets[0], github: '#', demo: '#' }, newIndex))
  })

  section.querySelector('#save-projects').addEventListener('click', async () => {
    const items = projectsList.querySelectorAll('.item-card')
    const newProjects = []

    items.forEach(item => {
      newProjects.push({
        title: item.querySelector('.project-title').value,
        description: item.querySelector('.project-desc').value,
        colors: item.querySelector('.project-colors').value,
        iconColors: item.querySelector('.project-icon-colors').value,
        github: item.querySelector('.project-github').value,
        demo: item.querySelector('.project-demo').value
      })
    })

    const success = await updateSection('projects', newProjects)
    if (success) {
      onSave(newProjects)
      showNotification('Projects updated successfully!')
    }
  })

  return section
}
