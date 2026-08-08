const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const baseProps = `fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240"`;
const wheel = `<circle r="18" fill="#0D1F1A" stroke="var(--clr-primary)" stroke-width="1.5"/><circle r="8" fill="#C5E8CE" stroke="var(--clr-primary)" stroke-width="1.5"/>`;

const svgEV3 = `<svg ${baseProps}>
  <ellipse cx="140" cy="205" rx="20" ry="4" fill="#A8D8B9" filter="blur(4px)"/>
  <ellipse cx="280" cy="205" rx="20" ry="4" fill="#A8D8B9" filter="blur(4px)"/>
  <path d="M 120 190 L 300 190 L 300 100 C 300 80 280 70 260 70 L 160 70 C 140 70 120 90 120 120 Z" fill="#C5E8CE" stroke="var(--clr-primary)" stroke-width="1.5"/>
  <path d="M 165 80 L 260 80 L 290 120 L 140 120 Z" fill="#0D1F1A" stroke="var(--clr-primary)" stroke-width="1.5"/>
  <g transform="translate(140, 180)">${wheel}</g>
  <g transform="translate(280, 180)">${wheel}</g>
</svg>`;

const svgEV4 = `<svg ${baseProps}>
  <ellipse cx="120" cy="205" rx="25" ry="5" fill="#A8D8B9" filter="blur(4px)"/>
  <ellipse cx="300" cy="205" rx="25" ry="5" fill="#A8D8B9" filter="blur(4px)"/>
  <path d="M 80 190 L 340 190 C 350 190 360 180 360 170 L 360 80 C 360 60 340 50 320 50 L 140 50 C 100 50 80 80 70 120 C 60 150 70 190 80 190 Z" fill="#C5E8CE" stroke="var(--clr-primary)" stroke-width="1.5"/>
  <path d="M 140 65 L 320 65 C 330 65 340 70 340 80 L 340 120 L 95 120 C 105 85 120 65 140 65 Z" fill="#0D1F1A" stroke="var(--clr-primary)" stroke-width="1.5"/>
  <line x1="220" y1="65" x2="220" y2="120" stroke="var(--clr-primary)" stroke-width="1.5"/>
  <g transform="translate(120, 180)">${wheel}</g>
  <g transform="translate(300, 180)">${wheel}</g>
</svg>`;

const svgAgri = `<svg ${baseProps}>
  <ellipse cx="100" cy="205" rx="30" ry="6" fill="#A8D8B9" filter="blur(4px)"/>
  <ellipse cx="300" cy="205" rx="30" ry="6" fill="#A8D8B9" filter="blur(4px)"/>
  <path d="M 60 190 L 200 190 L 200 80 C 200 60 180 50 160 50 L 100 50 C 80 50 60 70 60 90 Z" fill="#C5E8CE" stroke="var(--clr-primary)" stroke-width="1.5"/>
  <path d="M 200 190 L 360 190 L 360 130 L 200 130 Z" fill="#A8D8B9" stroke="var(--clr-primary)" stroke-width="1.5"/>
  <g transform="translate(100, 180)">${wheel}</g>
  <g transform="translate(300, 180)">${wheel}</g>
</svg>`;

const defaultSvg = `<svg ${baseProps}>
  <ellipse cx="120" cy="205" rx="25" ry="5" fill="#A8D8B9" filter="blur(4px)"/>
  <ellipse cx="300" cy="205" rx="25" ry="5" fill="#A8D8B9" filter="blur(4px)"/>
  <path d="M 60 190 L 360 190 C 370 190 380 180 380 160 L 360 120 C 340 100 320 80 260 80 L 180 80 C 140 80 100 110 80 130 L 50 150 C 40 160 50 190 60 190 Z" fill="#C5E8CE" stroke="var(--clr-primary)" stroke-width="1.5"/>
  <g transform="translate(120, 180)">${wheel}</g>
  <g transform="translate(300, 180)">${wheel}</g>
</svg>`;

const marqueeHtml = `
    <!-- START: section marquee -->
    <section class="marquee-section" style="overflow: hidden; background: var(--clr-bg); padding: var(--space-8) 0; border-top: 1px solid var(--clr-border); position: relative;">
      <style>
        @keyframes slide-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-content {
          display: inline-flex;
          animation: slide-left 30s linear infinite;
          gap: var(--space-16);
          padding-left: var(--space-16);
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
        .marquee-item {
          width: 250px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        .marquee-item:hover {
          transform: scale(1.05);
        }
        .marquee-item svg {
          width: 100%;
          height: auto;
          filter: drop-shadow(0 10px 15px rgba(0,0,0,0.05));
        }
        .marquee-item span {
          margin-top: var(--space-4);
          font-family: var(--font-display);
          color: var(--clr-primary);
          font-size: var(--text-lg);
        }
      </style>
      <div class="marquee-content">
        <!-- Group 1 -->
        <a href="./vehicle.html?id=etrike" class="marquee-item" style="text-decoration: none;">
          ${svgEV3}
          <span>eTRIKE</span>
        </a>
        <a href="./vehicle.html?id=eshuttle" class="marquee-item" style="text-decoration: none;">
          ${svgEV4}
          <span>eSHUTTLE</span>
        </a>
        <a href="./vehicle.html?id=bevdeluxe" class="marquee-item" style="text-decoration: none;">
          ${defaultSvg}
          <span>BEV Deluxe</span>
        </a>
        <a href="./vehicle.html?id=elinebus" class="marquee-item" style="text-decoration: none;">
          ${svgAgri}
          <span>eLine Bus</span>
        </a>
        
        <!-- Group 2 (Duplicate for seamless loop) -->
        <a href="./vehicle.html?id=etrike" class="marquee-item" style="text-decoration: none;">
          ${svgEV3}
          <span>eTRIKE</span>
        </a>
        <a href="./vehicle.html?id=eshuttle" class="marquee-item" style="text-decoration: none;">
          ${svgEV4}
          <span>eSHUTTLE</span>
        </a>
        <a href="./vehicle.html?id=bevdeluxe" class="marquee-item" style="text-decoration: none;">
          ${defaultSvg}
          <span>BEV Deluxe</span>
        </a>
        <a href="./vehicle.html?id=elinebus" class="marquee-item" style="text-decoration: none;">
          ${svgAgri}
          <span>eLine Bus</span>
        </a>
      </div>
    </section>
    <!-- END: section marquee -->
`;

html = html.replace('  </main>', marqueeHtml + '\n  </main>');

fs.writeFileSync('index.html', html);
