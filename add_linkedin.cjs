const fs = require('fs');
let html = fs.readFileSync('team.html', 'utf8');

const linkedinBtn = `
        <div style="margin-top: 1rem;">
          <a href="#" class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.4rem; text-decoration: none; background: transparent; border-color: var(--clr-border);">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            Connect on LinkedIn
          </a>
        </div>`;

// Use regex to find <div class="team-responsibility">...</div> and append the button
html = html.replace(/(<div class="team-responsibility">.*?<\/div>)/g, `$1${linkedinBtn}`);

fs.writeFileSync('team.html', html);
