const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const portfolioSection = `    <!-- START: section portfolio-preview -->
    <section class="portfolio-preview section" style="padding: var(--space-20) 0; background-color: var(--clr-bg);">
      <div class="container">
        <h2 class="text-center font-display scroll-reveal" style="margin-bottom: var(--space-4)">Our Vehicle Portfolio</h2>
        <p class="text-center text-muted scroll-reveal" style="max-width: 600px; margin-inline: auto; margin-bottom: var(--space-12);">From versatile 3-wheelers to mass transit e-buses, discover the perfect electric vehicle for your needs.</p>
        
        <div class="feature-grid">
          <a href="./vehicles.html?category=ev3" class="feature-card scroll-reveal stagger-1" style="text-decoration: none; color: inherit; transition: transform 0.3s ease, box-shadow 0.3s ease; display: block;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='var(--shadow-md)';" onmouseout="this.style.transform='none'; this.style.boxShadow='none';">
            <div class="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            </div>
            <h3 style="font-size: var(--text-lg); margin-bottom: var(--space-2); color: var(--clr-primary);">EV3 WHEELERS</h3>
            <p class="text-sm">Agile, efficient electric tricycles perfect for urban transport, delivery, and personal mobility.</p>
          </a>
          
          <a href="./vehicles.html?category=ev4" class="feature-card scroll-reveal stagger-2" style="text-decoration: none; color: inherit; transition: transform 0.3s ease, box-shadow 0.3s ease; display: block;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='var(--shadow-md)';" onmouseout="this.style.transform='none'; this.style.boxShadow='none';">
            <div class="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
            </div>
            <h3 style="font-size: var(--text-lg); margin-bottom: var(--space-2); color: var(--clr-primary);">EV4 WHEELERS</h3>
            <p class="text-sm">Versatile 4-wheel EVs offering stability, accessibility, and space for family or cargo.</p>
          </a>
          
          <a href="./vehicles.html?category=commercial" class="feature-card scroll-reveal stagger-3" style="text-decoration: none; color: inherit; transition: transform 0.3s ease, box-shadow 0.3s ease; display: block;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='var(--shadow-md)';" onmouseout="this.style.transform='none'; this.style.boxShadow='none';">
            <div class="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
            </div>
            <h3 style="font-size: var(--text-lg); margin-bottom: var(--space-2); color: var(--clr-primary);">COMMERCIAL</h3>
            <p class="text-sm">High-capacity shuttles and transit vehicles built for fleet operators and public utility.</p>
          </a>
        </div>
        
        <div class="text-center scroll-reveal" style="margin-top: var(--space-12);">
          <a href="./vehicles.html" class="btn btn-primary">View Full Portfolio</a>
        </div>
      </div>
    </section>
    <!-- END: section portfolio-preview -->
`;

const ctaSection = `    <!-- START: section cta -->
    <section class="cta-section section" style="padding: var(--space-20) 0; background-color: var(--clr-primary); color: white; margin-top: var(--space-12);">
      <div class="container text-center">
        <h2 class="font-display scroll-reveal" style="margin-bottom: var(--space-4); color: white;">Ready to Electrify Your Fleet?</h2>
        <p class="text-muted scroll-reveal stagger-1" style="max-width: 700px; margin-inline: auto; margin-bottom: var(--space-8); color: rgba(255,255,255,0.8);">
          Transitioning to electric mobility has never been easier. Discover how CLEVA can help you reduce operating costs, eliminate emissions, and provide a superior passenger experience.
        </p>
        <div class="hero-actions scroll-reveal stagger-2" style="justify-content: center;">
          <a href="./contact.html" class="btn" style="background-color: white; color: var(--clr-primary);">Contact Sales</a>
          <a href="./calcsaving.html" class="btn btn-secondary" style="border-color: rgba(255,255,255,0.5); color: white;">Calculate Savings</a>
        </div>
      </div>
    </section>
    <!-- END: section cta -->
`;

html = html.replace('    <!-- FEATURES OVERVIEW -->', portfolioSection + '\n    <!-- FEATURES OVERVIEW -->');
html = html.replace('  </main>', ctaSection + '\n  </main>');

fs.writeFileSync('index.html', html);
