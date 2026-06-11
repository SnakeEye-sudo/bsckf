/* जिला संगठन page — data.js से render होता है */

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('districtGrid');
  const search = document.getElementById('districtSearch');
  const noResults = document.getElementById('noResults');
  const countEl = document.getElementById('districtCount');
  if (!grid || typeof DISTRICTS === 'undefined') return;

  const initial = s => { const t = (s || '').replace(/^चित्रांश\s*/, '').trim(); return t && t[0] !== '—' ? t[0] : '🙏'; };
  const avatar = (p, extra) => p.photo
    ? `<div class="dc-avatar" style="padding:0;overflow:hidden"><img src="${p.photo}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;object-position:top"></div>`
    : `<div class="dc-avatar" ${extra || ''}>${initial(p.name)}</div>`;

  function render(list) {
    grid.innerHTML = list.map((d, i) => `
      <a class="district-card reveal visible" href="district.html?d=${d.id}" style="transition-delay:${Math.min(i * 0.03, 0.4)}s">
        <div class="dc-head">${d.name} <small>${d.en}</small></div>
        <div class="dc-body">
          <div class="dc-row">
            ${avatar(d.pramukh)}
            <div><div class="dc-role">जिला प्रमुख</div><div class="dc-name">${d.pramukh.name}</div></div>
          </div>
          <div class="dc-row">
            ${avatar(d.upPramukh, 'style="background:linear-gradient(135deg,#6b0f1a,#a0202f)"')}
            <div><div class="dc-role">उपप्रमुख</div><div class="dc-name">${d.upPramukh.name}</div></div>
          </div>
          <div style="text-align:center;margin-top:12px">
            <span style="font-size:.85rem;font-weight:700;color:var(--saffron-deep)">पूरा विवरण व सदस्य देखें →</span>
          </div>
        </div>
      </a>`).join('');
    noResults.style.display = list.length ? 'none' : 'block';
    if (countEl) countEl.textContent = list.length;
  }

  render(DISTRICTS);

  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    render(DISTRICTS.filter(d =>
      d.name.includes(q) ||
      d.en.toLowerCase().includes(q) ||
      d.hq.includes(q) ||
      d.cities.some(c => c.includes(q)) ||
      d.pramukh.name.toLowerCase().includes(q) ||
      d.upPramukh.name.toLowerCase().includes(q) ||
      d.members.some(m => m.name.toLowerCase().includes(q))
    ));
  });
});
