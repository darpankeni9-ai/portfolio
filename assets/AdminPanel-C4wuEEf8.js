import{u,i as g,g as x,f as k,s as $,a as q,b as w}from"./index-Jc5xBOM9.js";function E(s,n){const e=document.createElement("div");return e.className="editor-section",e.innerHTML=`
    <div class="editor-header">
      <h3>Hero Section</h3>
      <p class="editor-desc">Main landing section with your name and title</p>
    </div>

    <div class="editor-fields">
      <div class="field-group">
        <label>Full Name</label>
        <input type="text" id="hero-name" value="${s.name||""}" placeholder="Your Name">
      </div>

      <div class="field-group">
        <label>Subtitle</label>
        <input type="text" id="hero-subtitle" value="${s.subtitle||""}" placeholder="Welcome to my portfolio">
      </div>

      <div class="field-group">
        <label>Description</label>
        <textarea id="hero-description" rows="3" placeholder="A brief description about yourself">${s.description||""}</textarea>
      </div>

      <div class="field-group">
        <label>Roles (comma separated)</label>
        <input type="text" id="hero-roles" value="${(s.roles||[]).join(", ")}" placeholder="Data Analyst, Power BI Expert, SQL Specialist">
        <p class="field-hint">These will rotate in the typing animation</p>
      </div>

      <div class="field-group">
        <label>Resume Link</label>
        <input type="text" id="hero-resume" value="${s.resumeLink||"#"}" placeholder="Link to your resume">
      </div>

      <div class="field-group">
        <label>Contact Link</label>
        <input type="text" id="hero-contact" value="${s.contactLink||"#contact"}" placeholder="#contact or full URL">
      </div>
    </div>

    <button class="save-btn" id="save-hero">Save Changes</button>
  `,e.querySelector("#save-hero").addEventListener("click",async()=>{const t={name:e.querySelector("#hero-name").value,subtitle:e.querySelector("#hero-subtitle").value,description:e.querySelector("#hero-description").value,roles:e.querySelector("#hero-roles").value.split(",").map(o=>o.trim()).filter(o=>o),resumeLink:e.querySelector("#hero-resume").value,contactLink:e.querySelector("#hero-contact").value};await u("hero",t)&&(n(t),showNotification("Hero section updated successfully!"))}),e}function L(s,n){const e=document.createElement("div");return e.className="editor-section",e.innerHTML=`
    <div class="editor-header">
      <h3>About Section</h3>
      <p class="editor-desc">Personal information and biography</p>
    </div>

    <div class="editor-fields">
      <div class="field-group">
        <label>Full Name</label>
        <input type="text" id="about-name" value="${s.name||""}" placeholder="Your Name">
      </div>

      <div class="field-group">
        <label>Initials (for avatar)</label>
        <input type="text" id="about-initials" value="${s.initials||""}" placeholder="DK" maxlength="3">
      </div>

      <div class="field-group">
        <label>Location</label>
        <input type="text" id="about-location" value="${s.location||""}" placeholder="San Francisco, CA">
      </div>

      <div class="field-group">
        <label>Education</label>
        <input type="text" id="about-education" value="${s.education||""}" placeholder="B.S. Data Science">
      </div>

      <div class="field-group">
        <label>Experience</label>
        <input type="text" id="about-experience" value="${s.experience||""}" placeholder="3+ Years">
      </div>

      <div class="field-group">
        <label>Focus Area</label>
        <input type="text" id="about-focus" value="${s.focus||""}" placeholder="Business Intelligence">
      </div>

      <div class="field-group">
        <label>Bio Paragraph 1</label>
        <textarea id="about-bio1" rows="3" placeholder="First paragraph of your bio">${s.bio1||""}</textarea>
      </div>

      <div class="field-group">
        <label>Bio Paragraph 2</label>
        <textarea id="about-bio2" rows="3" placeholder="Second paragraph of your bio">${s.bio2||""}</textarea>
      </div>
    </div>

    <button class="save-btn" id="save-about">Save Changes</button>
  `,e.querySelector("#save-about").addEventListener("click",async()=>{const t={name:e.querySelector("#about-name").value,initials:e.querySelector("#about-initials").value,location:e.querySelector("#about-location").value,education:e.querySelector("#about-education").value,experience:e.querySelector("#about-experience").value,focus:e.querySelector("#about-focus").value,bio1:e.querySelector("#about-bio1").value,bio2:e.querySelector("#about-bio2").value};await u("about",t)&&(n(t),showNotification("About section updated successfully!"))}),e}const b=["from-yellow-500 to-orange-500","from-blue-500 to-cyan-500","from-green-500 to-emerald-500","from-yellow-400 to-blue-500","from-purple-500 to-pink-500","from-cyan-500 to-blue-500","from-red-500 to-orange-500","from-indigo-500 to-purple-500"];function C(s,n,e){const t=document.createElement("div");t.className="editor-section",t.innerHTML=`
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
        <input type="text" id="other-skills" value="${(n||[]).join(", ")}" placeholder="Tableau, Pandas, NumPy">
        <p class="field-hint">These appear as badges below the skill cards</p>
      </div>
    </div>

    <button class="save-btn" id="save-skills">Save Changes</button>
  `;const c=t.querySelector("#skills-list");function o(i,a){const l=document.createElement("div");return l.className="item-card",l.dataset.index=a,l.innerHTML=`
      <div class="item-header">
        <span class="item-number">#${a+1}</span>
        <button class="remove-btn" data-index="${a}">Remove</button>
      </div>
      <div class="item-fields">
        <input type="text" class="skill-name" value="${i.name||""}" placeholder="Skill Name">
        <select class="skill-level">
          <option value="Beginner" ${i.level==="Beginner"?"selected":""}>Beginner</option>
          <option value="Intermediate" ${i.level==="Intermediate"?"selected":""}>Intermediate</option>
          <option value="Advanced" ${i.level==="Advanced"?"selected":""}>Advanced</option>
          <option value="Expert" ${i.level==="Expert"?"selected":""}>Expert</option>
        </select>
        <input type="number" class="skill-percentage" value="${i.percentage||80}" min="0" max="100" placeholder="%">
        <select class="skill-color">
          ${b.map(r=>`<option value="${r}" ${i.color===r?"selected":""}>${r}</option>`).join("")}
        </select>
      </div>
    `,l.querySelector(".remove-btn").addEventListener("click",()=>{l.remove(),c.querySelectorAll(".item-number").forEach((r,m)=>{r.textContent=`#${m+1}`})}),l}return(s||[]).forEach((i,a)=>{c.appendChild(o(i,a))}),t.querySelector("#add-skill").addEventListener("click",()=>{const i=c.children.length;c.appendChild(o({name:"",level:"Intermediate",percentage:80,color:b[0]},i))}),t.querySelector("#save-skills").addEventListener("click",async()=>{const i=c.querySelectorAll(".item-card"),a=[];i.forEach(p=>{a.push({name:p.querySelector(".skill-name").value,level:p.querySelector(".skill-level").value,percentage:parseInt(p.querySelector(".skill-percentage").value)||80,color:p.querySelector(".skill-color").value})});const l=t.querySelector("#other-skills").value.split(",").map(p=>p.trim()).filter(p=>p),r=await u("skills",a),m=await u("other_skills",l);r&&m&&(e({skills:a,other_skills:l}),showNotification("Skills updated successfully!"))}),t}const A=["cyan","purple","pink","blue","green","yellow"];function j(s,n){const e=document.createElement("div");e.className="editor-section",e.innerHTML=`
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
  `;const t=e.querySelector("#experience-list");function c(o,i){const a=document.createElement("div");return a.className="item-card",a.dataset.index=i,a.innerHTML=`
      <div class="item-header">
        <span class="item-number">#${i+1}</span>
        <button class="remove-btn" data-index="${i}">Remove</button>
      </div>
      <div class="item-fields">
        <input type="text" class="exp-title" value="${o.title||""}" placeholder="Job Title">
        <input type="text" class="exp-company" value="${o.company||""}" placeholder="Company Name">
        <input type="text" class="exp-period" value="${o.period||""}" placeholder="2022 - Present">
        <select class="exp-color">
          ${A.map(l=>`<option value="${l}" ${o.color===l?"selected":""}>${l}</option>`).join("")}
        </select>
      </div>
    `,a.querySelector(".remove-btn").addEventListener("click",()=>{a.remove(),t.querySelectorAll(".item-number").forEach((l,r)=>{l.textContent=`#${r+1}`})}),a}return(s||[]).forEach((o,i)=>{t.appendChild(c(o,i))}),e.querySelector("#add-experience").addEventListener("click",()=>{const o=t.children.length;t.appendChild(c({title:"",company:"",period:"",color:"cyan"},o))}),e.querySelector("#save-experience").addEventListener("click",async()=>{const o=t.querySelectorAll(".item-card"),i=[];o.forEach(l=>{i.push({title:l.querySelector(".exp-title").value,company:l.querySelector(".exp-company").value,period:l.querySelector(".exp-period").value,color:l.querySelector(".exp-color").value})}),await u("experience",i)&&(n(i),showNotification("Experience updated successfully!"))}),e}const h=["from-neon-purple/20 to-neon-cyan/20","from-neon-pink/20 to-neon-purple/20","from-neon-cyan/20 to-neon-blue/20","from-neon-blue/20 to-neon-purple/20","from-yellow-500/20 to-orange-500/20","from-green-500/20 to-emerald-500/20"],f=["from-neon-purple to-neon-cyan","from-neon-pink to-neon-purple","from-neon-cyan to-neon-blue","from-neon-blue to-neon-purple","from-yellow-500 to-orange-500","from-green-500 to-emerald-500"];function P(s,n){const e=document.createElement("div");e.className="editor-section",e.innerHTML=`
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
  `;const t=e.querySelector("#projects-list");function c(o,i){const a=document.createElement("div");return a.className="item-card wide",a.dataset.index=i,a.innerHTML=`
      <div class="item-header">
        <span class="item-number">#${i+1}</span>
        <button class="remove-btn" data-index="${i}">Remove</button>
      </div>
      <div class="item-fields">
        <input type="text" class="project-title" value="${o.title||""}" placeholder="Project Title">
        <textarea class="project-desc" rows="2" placeholder="Project description">${o.description||""}</textarea>
        <div class="field-row">
          <select class="project-colors">
            ${h.map(l=>`<option value="${l}" ${o.colors===l?"selected":""}>${l.split("/")[0]}</option>`).join("")}
          </select>
          <select class="project-icon-colors">
            ${f.map(l=>`<option value="${l}" ${o.iconColors===l?"selected":""}>${l.split(" ")[0]}</option>`).join("")}
          </select>
        </div>
        <div class="field-row">
          <input type="text" class="project-github" value="${o.github||"#"}" placeholder="GitHub URL">
          <input type="text" class="project-demo" value="${o.demo||"#"}" placeholder="Demo URL">
        </div>
      </div>
    `,a.querySelector(".remove-btn").addEventListener("click",()=>{a.remove(),t.querySelectorAll(".item-number").forEach((l,r)=>{l.textContent=`#${r+1}`})}),a}return(s||[]).forEach((o,i)=>{t.appendChild(c(o,i))}),e.querySelector("#add-project").addEventListener("click",()=>{const o=t.children.length;t.appendChild(c({title:"",description:"",colors:h[0],iconColors:f[0],github:"#",demo:"#"},o))}),e.querySelector("#save-projects").addEventListener("click",async()=>{const o=t.querySelectorAll(".item-card"),i=[];o.forEach(l=>{i.push({title:l.querySelector(".project-title").value,description:l.querySelector(".project-desc").value,colors:l.querySelector(".project-colors").value,iconColors:l.querySelector(".project-icon-colors").value,github:l.querySelector(".project-github").value,demo:l.querySelector(".project-demo").value})}),await u("projects",i)&&(n(i),showNotification("Projects updated successfully!"))}),e}const y=["from-yellow-400 to-yellow-600","from-blue-400 to-blue-600","from-orange-400 to-red-500","from-green-400 to-emerald-600","from-purple-400 to-purple-600","from-cyan-400 to-cyan-600"];function N(s,n){const e=document.createElement("div");e.className="editor-section",e.innerHTML=`
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
  `;const t=e.querySelector("#certs-list");function c(o,i){const a=document.createElement("div");return a.className="item-card",a.dataset.index=i,a.innerHTML=`
      <div class="item-header">
        <span class="item-number">#${i+1}</span>
        <button class="remove-btn" data-index="${i}">Remove</button>
      </div>
      <div class="item-fields">
        <input type="text" class="cert-name" value="${o.name||""}" placeholder="Certification Name">
        <input type="text" class="cert-issuer" value="${o.issuer||""}" placeholder="Issuing Organization">
        <input type="text" class="cert-year" value="${o.year||""}" placeholder="Year">
        <select class="cert-color">
          ${y.map(l=>`<option value="${l}" ${o.colors===l?"selected":""}>${l.split("-")[2]}</option>`).join("")}
        </select>
      </div>
    `,a.querySelector(".remove-btn").addEventListener("click",()=>{a.remove(),t.querySelectorAll(".item-number").forEach((l,r)=>{l.textContent=`#${r+1}`})}),a}return(s||[]).forEach((o,i)=>{t.appendChild(c(o,i))}),e.querySelector("#add-cert").addEventListener("click",()=>{const o=t.children.length;t.appendChild(c({name:"",issuer:"",year:"",colors:y[0]},o))}),e.querySelector("#save-certs").addEventListener("click",async()=>{const o=t.querySelectorAll(".item-card"),i=[];o.forEach(l=>{i.push({name:l.querySelector(".cert-name").value,issuer:l.querySelector(".cert-issuer").value,year:l.querySelector(".cert-year").value,colors:l.querySelector(".cert-color").value})}),await u("certifications",i)&&(n(i),showNotification("Certifications updated successfully!"))}),e}function T(s,n){const e=document.createElement("div");e.className="editor-section",e.innerHTML=`
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
  `;const t=e.querySelector("#stats-list");function c(o,i){const a=document.createElement("div");return a.className="item-card",a.dataset.index=i,a.innerHTML=`
      <div class="item-header">
        <span class="item-number">#${i+1}</span>
        <button class="remove-btn" data-index="${i}">Remove</button>
      </div>
      <div class="item-fields">
        <input type="number" class="stat-value" value="${o.value||0}" placeholder="Number" min="0">
        <input type="text" class="stat-suffix" value="${o.suffix||""}" placeholder="+" maxlength="5">
        <input type="text" class="stat-label" value="${o.label||""}" placeholder="Label">
      </div>
    `,a.querySelector(".remove-btn").addEventListener("click",()=>{a.remove(),t.querySelectorAll(".item-number").forEach((l,r)=>{l.textContent=`#${r+1}`})}),a}return(s||[]).forEach((o,i)=>{t.appendChild(c(o,i))}),e.querySelector("#add-stat").addEventListener("click",()=>{const o=t.children.length;t.appendChild(c({value:0,suffix:"",label:""},o))}),e.querySelector("#save-stats").addEventListener("click",async()=>{const o=t.querySelectorAll(".item-card"),i=[];o.forEach(l=>{i.push({value:parseInt(l.querySelector(".stat-value").value)||0,suffix:l.querySelector(".stat-suffix").value,label:l.querySelector(".stat-label").value})}),await u("stats",i)&&(n(i),showNotification("Statistics updated successfully!"))}),e}function H(s,n){const e=document.createElement("div");return e.className="editor-section",e.innerHTML=`
    <div class="editor-header">
      <h3>Contact Section</h3>
      <p class="editor-desc">Contact information and social links</p>
    </div>

    <div class="editor-fields">
      <div class="field-group">
        <label>Email</label>
        <input type="email" id="contact-email" value="${s.email||""}" placeholder="your@email.com">
      </div>

      <div class="field-group">
        <label>GitHub Profile</label>
        <input type="text" id="contact-github" value="${s.github||"#"}" placeholder="https://github.com/username">
      </div>

      <div class="field-group">
        <label>LinkedIn Profile</label>
        <input type="text" id="contact-linkedin" value="${s.linkedin||"#"}" placeholder="https://linkedin.com/in/username">
      </div>

      <div class="field-group">
        <label>Twitter Profile</label>
        <input type="text" id="contact-twitter" value="${s.twitter||"#"}" placeholder="https://twitter.com/username">
      </div>
    </div>

    <button class="save-btn" id="save-contact">Save Changes</button>
  `,e.querySelector("#save-contact").addEventListener("click",async()=>{const t={email:e.querySelector("#contact-email").value,github:e.querySelector("#contact-github").value,linkedin:e.querySelector("#contact-linkedin").value,twitter:e.querySelector("#contact-twitter").value};await u("contact",t)&&(n(t),showNotification("Contact info updated successfully!"))}),e}window.supabase=q;const I=[{id:"hero",label:"Hero",icon:"⭐"},{id:"about",label:"About",icon:"👤"},{id:"skills",label:"Skills",icon:"💼"},{id:"experience",label:"Experience",icon:"📈"},{id:"projects",label:"Projects",icon:"🚀"},{id:"certifications",label:"Certs",icon:"🏅"},{id:"stats",label:"Stats",icon:"📊"},{id:"contact",label:"Contact",icon:"✉️"}];let v="hero",d={};async function M(){var e;if(!await g())return window.location.hash="#login",null;const n=document.createElement("div");return n.className="admin-panel",n.innerHTML=`
    <div class="admin-header">
      <div class="admin-title">
        <h2>Portfolio Admin Panel</h2>
        <p class="admin-user">Logged in as: <strong>${((e=x())==null?void 0:e.email)||"Admin"}</strong></p>
      </div>
      <div class="admin-actions">
        <a href="#" class="view-site-btn" id="view-site">View Site</a>
        <button class="logout-btn" id="logout-btn">Logout</button>
        <button class="close-admin-btn" id="close-admin">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>

    <div class="admin-tabs">
      ${I.map(t=>`
        <button class="admin-tab ${t.id===v?"active":""}" data-tab="${t.id}">
          <span class="tab-icon">${t.icon}</span>
          <span class="tab-label">${t.label}</span>
        </button>
      `).join("")}
    </div>

    <div class="admin-content" id="admin-content">
      <div class="loading">Loading...</div>
    </div>
  `,console.log("AdminPanel: Fetching portfolio data..."),await k(),d=w(),console.log("AdminPanel: Data loaded:",d),S(n,v),n.querySelectorAll(".admin-tab").forEach(t=>{t.addEventListener("click",()=>{n.querySelectorAll(".admin-tab").forEach(c=>c.classList.remove("active")),t.classList.add("active"),v=t.dataset.tab,S(n,v)})}),n.querySelector("#close-admin").addEventListener("click",()=>{n.remove(),document.body.style.overflow=""}),n.querySelector("#view-site").addEventListener("click",t=>{t.preventDefault(),n.remove(),document.body.style.overflow="",window.location.hash=""}),n.querySelector("#logout-btn").addEventListener("click",async()=>{confirm("Are you sure you want to logout?")&&await $()}),n}function S(s,n){const e=s.querySelector("#admin-content");e.innerHTML="";const t=c=>{console.log(`AdminPanel: ${n} saved, updating cache`),d[n]=c};switch(console.log(`AdminPanel: Rendering tab ${n}`),n){case"hero":e.appendChild(E(d.hero||{},t));break;case"about":e.appendChild(L(d.about||{},t));break;case"skills":e.appendChild(C(d.skills||[],d.other_skills||[],t));break;case"experience":e.appendChild(j(d.experience||[],t));break;case"projects":e.appendChild(P(d.projects||[],t));break;case"certifications":e.appendChild(N(d.certifications||[],t));break;case"stats":e.appendChild(T(d.stats||[],t));break;case"contact":e.appendChild(H(d.contact||{},t));break}}window.AdminPanel=M;export{M as AdminPanel};
