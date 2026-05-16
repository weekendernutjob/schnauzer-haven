const SHEET_ID = '1qUF0N8Kq32yL2MOPdOZ1zEsO6FLboxudPxhpRO7RitM';
const SHEET_NAME = 'Sheet1';
const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

async function loadPuppies() {
  const grid = document.getElementById('puppies-grid');
  const loading = document.getElementById('loading');

  try {
    const res = await fetch(url);
    const text = await res.text();
    const json = JSON.parse(text.substring(47, text.length - 2));
    const rows = json.table.rows.slice(1);

    if (rows.length === 0) {
      grid.innerHTML = '<p>No puppies available right now. Check back soon or contact us to join the waitlist!</p>';
      return;
    }

    grid.innerHTML = '';

    rows.forEach(row => {
      const name   = row.c[0]?.v || '';
      const gender = row.c[1]?.v || '';
      const color  = row.c[2]?.v || '';
      const age    = row.c[3]?.v || '';
      const status = row.c[4]?.v || 'Available';
      const photo  = row.c[5]?.v || '';

      const badgeClass = status.toLowerCase() === 'available' ? 'badge-available'
                       : status.toLowerCase() === 'reserved'  ? 'badge-reserved'
                       : 'badge-sold';

      const imgHTML = photo
        ? `<img src="${photo}" alt="${name}" />`
        : `<div class="placeholder-img">🐾</div>`;

      grid.innerHTML += `
        <div class="puppy-card">
          ${imgHTML}
          <div class="puppy-info">
            <h3>${name}</h3>
            <p>${gender} · ${color} · ${age}</p>
            <span class="badge ${badgeClass}">${status}</span>
          </div>
        </div>`;
    });

  } catch (err) {
    grid.innerHTML = '<p>Could not load puppies right now. Please contact us directly!</p>';
    console.error(err);
  }
}

loadPuppies();