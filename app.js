/* ── SCMB v6 – app.js ── */

// ── Inject shared nav & footer on every page ──
(function(){
  const page = location.pathname.split('/').pop() || 'index.html';

  const navLinks = [
    ['index.html','Home'],
    ['about.html','About'],
    ['pricing.html','Pricing'],
    ['resources.html','Resources'],
    ['community.html','Community'],
    ['dashboard.html','Dashboard'],
    ['nutrition.html','Nutrition'],
    ['faq.html','FAQ'],
    ['contact.html','Contact'],
  ];

  const navHTML = `
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <a class="navbar-brand" href="index.html">
        <i class="fa-solid fa-seedling me-2" style="color:var(--tan);font-size:1.1rem;"></i>
        The Smart Choice<span> Meal Blueprint</span>
      </a>
      <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="nav">
        <div class="navbar-nav ms-auto gap-1">
          ${navLinks.map(([href,label])=>`
            <a class="nav-link${page===href?' active':''}" href="${href}">${label}</a>
          `).join('')}
          <a class="btn-sm-cta ms-2" href="signup.html">Free Trial</a>
        </div>
      </div>
    </div>
  </nav>`;

  const footerHTML = `
  <footer>
    <div class="container">
      <div class="row g-4">
        <div class="col-md-4">
          <h5><i class="fa-solid fa-seedling me-2"></i>Smart Choice Meal Blueprint</h5>
          <p style="font-size:.9rem;max-width:260px;">Empowering Canadian families to eat healthier, save money, and reclaim their evenings — one planned meal at a time.</p>
          <div class="social-icons mt-3">
            <a href="#" title="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" title="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" title="Twitter / X"><i class="fab fa-x-twitter"></i></a>
          </div>
        </div>
        <div class="col-md-2">
          <h5>Explore</h5>
          ${navLinks.map(([href,label])=>`<a href="${href}">${label}</a>`).join('')}
        </div>
        <div class="col-md-3">
          <h5>Resources</h5>
          <a href="resources.html">Recipe Library</a>
          <a href="resources.html">Meal Plan Templates</a>
          <a href="resources.html">Budget Grocery Guide</a>
          <a href="resources.html">Batch Cooking Guide</a>
          <a href="faq.html">FAQ</a>
          <div class="mt-3">
            <a class="brochure-link" href="brochure.pdf" target="_blank">
              <i class="fa-solid fa-file-pdf"></i> Download Brochure
            </a>
          </div>
        </div>
        <div class="col-md-3">
          <h5>Get In Touch</h5>
          <a href="mailto:info@smartmealblueprint.com"><i class="fa-solid fa-envelope me-2"></i>info@smartmealblueprint.com</a>
          <a href="tel:18005551234"><i class="fa-solid fa-phone me-2"></i>1-800-555-1234</a>
          <a href="http://www.smartchoicemealblueprint.com" target="_blank"><i class="fa-solid fa-globe me-2"></i>smartchoicemealblueprint.com</a>
          <p class="mt-3" style="font-size:.82rem;opacity:.6;">Based in Winnipeg, Manitoba 🍁<br>Serving Canadian families coast to coast</p>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container d-flex justify-content-between flex-wrap gap-2">
        <span>© 2025 The Smart Choice Meal Blueprint · Jaymee B. & Quincy B. · All rights reserved.</span>
        <span>
          <a href="login.html" style="display:inline;margin:0 .5rem;">Login</a>·
          <a href="signup.html" style="display:inline;margin:0 .5rem;">Sign Up</a>
        </span>
      </div>
    </div>
  </footer>`;

  document.getElementById('app-nav').innerHTML = navHTML;
  document.getElementById('app-footer').innerHTML = footerHTML;
})();

// ── FAQ accordion ──
document.addEventListener('click', function(e){
  const btn = e.target.closest('.faq-q');
  if(!btn) return;
  const answer = btn.nextElementSibling;
  const open = btn.classList.contains('open');
  // close all
  document.querySelectorAll('.faq-q').forEach(b=>{
    b.classList.remove('open');
    const a = b.nextElementSibling;
    if(a) a.classList.remove('open');
  });
  if(!open){ btn.classList.add('open'); answer.classList.add('open'); }
});

// ── Meal plan generator ──
function generatePlan(){
  const breakfasts = ['Overnight Oats & Berries','Veggie Egg Muffins','Greek Yogurt Parfait','Smoothie Bowl','Avocado Toast'];
  const dinners = ['Slow Cooker Chicken Stew','Sheet Pan Salmon & Veg','One-Pot Pasta Primavera','Taco Night','Lentil Soup'];
  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
  let html = '<div class="mt-3">';
  days.forEach((d,i)=>{
    html += `<div class="meal-row">
      <div class="meal-dot"></div>
      <div>
        <div class="meal-day">${d}</div>
        <div class="meal-name">🌅 ${breakfasts[Math.floor(Math.random()*breakfasts.length)]} &nbsp;|&nbsp; 🍽 ${dinners[Math.floor(Math.random()*dinners.length)]}</div>
      </div>
    </div>`;
  });
  html += '</div>';
  document.getElementById('generatedPlan').innerHTML = html;
}

// ── Contact form handler ──
function handleContact(e){
  e.preventDefault();
  const btn = document.getElementById('contactBtn');
  btn.textContent = 'Message Sent ✓';
  btn.style.background = 'var(--forest)';
  btn.disabled = true;
}

// ── Nutrition tracker ──
function logFood(){
  const input = document.getElementById('foodInput');
  const list  = document.getElementById('foodList');
  if(!input || !input.value.trim()) return;
  const li = document.createElement('div');
  li.className = 'meal-row';
  li.innerHTML = `<div class="meal-dot"></div><span>${input.value.trim()}</span>`;
  list.appendChild(li);
  input.value = '';
}
