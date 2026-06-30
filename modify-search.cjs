const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const inlineSearchHTML = `    </div>
    <div id="inlineSearchContainer" style="display: none; width: 100%; border-top: 1px solid var(--clr-border); background: var(--clr-bg); padding: 1.5rem 0;">
      <div class="container">
        <form id="inlineSearchForm" style="display: flex; gap: 1rem; margin-bottom: 0;">
          <input type="text" id="inlineSearchInput" placeholder="Search the website..." style="flex: 1; padding: 0.75rem 1rem; font-size: 1.1rem; border: 1px solid var(--clr-border); border-radius: var(--radius-md); background: var(--clr-surface); color: var(--clr-text);" required>
          <button type="submit" class="btn btn-primary" style="padding: 0 1.5rem;">Search</button>
        </form>
        <div id="inlineSearchResults" style="margin-top: 0; display: flex; flex-direction: column; gap: 0.5rem; max-height: 50vh; overflow-y: auto; transition: margin-top 0.3s ease;"></div>
      </div>
    </div>`;

const scriptHTML = `  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const searchBtns = document.querySelectorAll('.search-btn');
      const inlineSearchContainer = document.getElementById('inlineSearchContainer');
      const inlineSearchForm = document.getElementById('inlineSearchForm');
      const inlineSearchInput = document.getElementById('inlineSearchInput');
      const inlineSearchResults = document.getElementById('inlineSearchResults');
      
      const pages = [
        { title: 'Home', url: './index.html', desc: 'The Next-Generation Passenger EV Standard' },
        { title: 'Products / Vehicles', url: './vehicles.html', desc: 'Browse our electric vehicle models' },
        { title: 'eTRIKE', url: './vehicle.html?id=etrike', desc: 'Urban delivery and transport' },
        { title: 'eSHUTTLE', url: './vehicle.html?id=eshuttle', desc: 'Resort and campus mobility' },
        { title: 'BEV Deluxe', url: './vehicle.html?id=bevdeluxe', desc: 'Premium passenger transit' },
        { title: 'eLine Bus', url: './vehicle.html?id=elinebus', desc: 'Mass transit solutions' },
        { title: 'Technology', url: './technology.html', desc: 'Our advanced EV platforms and battery tech' },
        { title: 'Savings Calculator', url: './solutions.html', desc: 'Calculate your fleet savings' },
        { title: 'Compare Models', url: './compare.html', desc: 'Compare CLEVA electric vehicles side-by-side' },
        { title: 'Careers', url: './careers.html', desc: 'Join the CLEVA team' },
        { title: 'About Us', url: './about.html', desc: 'Our mission and history' },
        { title: 'Contact Us', url: './contact.html', desc: 'Get in touch with our sales team' },
        { title: 'Blog & Events', url: './blog.html', desc: 'Latest news, events, and updates from CLEVA' },
        { title: 'Sustainability', url: './sustainability.html', desc: 'Our environmental commitments' },
        { title: 'Privacy Policy', url: './privacy.html', desc: 'Our privacy commitments' },
        { title: 'Terms of Service', url: './terms.html', desc: 'Terms of use' }
      ];

      searchBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          if (inlineSearchContainer.style.display === 'none') {
            inlineSearchContainer.style.display = 'block';
            setTimeout(() => inlineSearchInput.focus(), 100);
          } else {
            inlineSearchContainer.style.display = 'none';
          }
        });
      });

      inlineSearchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = inlineSearchInput.value.toLowerCase();
        inlineSearchResults.innerHTML = '';
        inlineSearchResults.style.marginTop = '1.5rem';
        
        const results = pages.filter(p => p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query));
        
        if (results.length > 0) {
          results.forEach(res => {
            const el = document.createElement('a');
            el.href = res.url;
            el.style.display = 'block';
            el.style.padding = '1rem';
            el.style.border = '1px solid var(--clr-border)';
            el.style.borderRadius = 'var(--radius-md)';
            el.style.textDecoration = 'none';
            el.style.color = 'var(--clr-text)';
            el.innerHTML = '<h3 style="margin-bottom: 0.5rem; color: var(--clr-primary);">' + res.title + '</h3><p style="color: var(--clr-muted); font-size: 0.9rem; margin-bottom: 0;">' + res.desc + '</p>';
            
            el.addEventListener('mouseover', () => {
              el.style.borderColor = 'var(--clr-primary)';
            });
            el.addEventListener('mouseout', () => {
              el.style.borderColor = 'var(--clr-border)';
            });

            inlineSearchResults.appendChild(el);
          });
        } else {
          inlineSearchResults.innerHTML = '<p style="color: var(--clr-muted);">No results found.</p>';
        }
      });
    });
  </script>
</body>`;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace overlay with script
  content = content.replace(/<!-- SEARCH OVERLAY -->[\s\S]*?<\/body>/, scriptHTML);
  
  // Insert inline search container
  content = content.replace(/    <\/div>\n  <\/nav>/, inlineSearchHTML + '\n  </nav>');

  fs.writeFileSync(file, content, 'utf8');
}
console.log('Search updated');
