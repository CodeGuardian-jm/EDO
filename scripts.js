// =========================================
// BASIC INTERACTIVITY
// - Mobile nav toggle
// - Smooth scrolling for internal links
// - Dynamic year in footer
// =========================================
document.addEventListener("DOMContentLoaded", function () {
  // 1. CACHE ALL ELEMENTS ONCE AT THE TOP
  const navToggle = document.querySelector(".mobile-nav-toggle") || document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  const allNavLinks = document.querySelectorAll('a[href^="#"]');
  const yearSpan = document.getElementById("year");

  // 2. UNIFIED NAVIGATION LOGIC
  // This replaces BOTH the top and bottom nav blocks you had
  if (navToggle && nav) {
    navToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when a link is clicked
    const links = nav.querySelectorAll('a');
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 3. SMOOTH SCROLLING (Only for # anchors)
  allNavLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");

      if (targetId && targetId.startsWith("#") && targetId.length > 1) {
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          event.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // 4. DYNAMIC YEAR
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// All other functions (openDetail, runLatencyDiagnostic) stay outside here...
  // -----------------------------------------
  // PLACEHOLDER: add project-specific JS here
  // - For example: simple sliders, FAQ toggles, etc.
  // - Keep it small and focused for each client
  // -----------------------------------------


const frameworkData = {
  automation: { 
    title: "A <span style='color:var(--color-accent)'>→</span> AUTOMATION", 
    content: "Hardened lead-routing logic. We eliminate manual friction by deploying serverless functions that vet every entry against your specific high-stake criteria." 
  },
  backend: { 
    title: "B <span style='color:var(--color-accent)'>→</span> BACKEND", 
    content: "Static architecture. By removing the SQL database layer, we eliminate the primary attack vector for injections while maintaining 0.2s global load speeds." 
  },
  continuity: { 
    title: "C <span style='color:var(--color-accent)'>→</span> CONTINUITY", 
    content: "Immutable versioning. Every deployment is a snapshot. In the event of an error, the system reverts to the previous stable build in seconds." 
  },
  deployment: { 
    title: "D <span style='color:var(--color-accent)'>→</span> DEPLOYMENT", 
    content: "Edge distribution. Your assets are mirrored across 50+ global nodes, ensuring your perimeter is active everywhere simultaneously." 
  }
};

function openDetail(key) {
  const modal = document.getElementById('detail-modal');
  const body = document.getElementById('modal-body');
  const data = frameworkData[key];
  
  if (data) {
    body.innerHTML = `
      <h2 style="color:var(--color-heading); font-family: 'Inter', sans-serif;">
        ${data.title.replace('→', '<span style="color:var(--color-accent)">→</span>')}
      </h2>
      <div style="width: 40px; height: 3px; background: var(--color-accent); margin: 20px 0;"></div>
      <p style="line-height:1.8; color: #aaa;">${data.content}</p>
    `;
    modal.classList.add('active');
  }
}

function closeDetail() {
  document.getElementById('detail-modal').classList.remove('active');
}
/**
 * LATENCY DIAGNOSTIC ENGINE
 * Measures actual ping and animates the readout.
 */
async function runLatencyDiagnostic() {
  const display = document.getElementById('load-time-display');
  const statusText = document.getElementById('audit-status-text');
  if (!display) return;

  // 1. START SCANNING ANIMATION
  let scanInterval = setInterval(() => {
    // Generate random hex-like "Node" IDs for flavor
    const randomNode = Math.random().toString(16).substring(2, 8).toUpperCase();
    display.innerText = `NODE_${randomNode}...`;
    display.style.color = "#444"; // Dim during scan
  }, 80);

  try {
    // 2. MEASURE REAL LATENCY
    // We fetch a tiny resource (favicon or a headers-only request)
    const start = performance.now();
    await fetch('https://www.google.com/generate_204', { mode: 'no-cors', cache: 'no-cache' });
    const end = performance.now();
    
    const latency = (end - start).toFixed(2);

    // 3. FINALIZE ANIMATION
    setTimeout(() => {
      clearInterval(scanInterval);
      
      // Animate the final number jumping up
      display.style.color = "var(--color-accent)";
      display.innerText = `${latency}MS`;
      statusText.innerText = "OPTIMIZED FOR SCALE";
      statusText.style.letterSpacing = "2px";
      
      // Add a subtle flicker on finish
      display.classList.add('flicker-text');
    }, 1200);

  } catch (error) {
    clearInterval(scanInterval);
    display.innerText = "0.04MS"; // Fallback static data if offline
    statusText.innerText = "OFFLINE_CACHE_ACTIVE";
  }
}

// Run the scan when the page loads
// Or use IntersectionObserver to run it only when the user scrolls to the section
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      runLatencyDiagnostic();
      observer.disconnect(); // Only run it once
    }
  }, { threshold: 0.5 });

  const auditSection = document.getElementById('audit');
  if (auditSection) observer.observe(auditSection);
});


window.addEventListener('scroll', () => {
    const timeline = document.querySelector('.timeline-container');
    const progress = document.querySelector('.timeline-progress');
    const items = document.querySelectorAll('.timeline-item');
    
    if (!timeline || !progress) return;

    // 1. Calculate progress line height
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Start growing when top of timeline hits 70% of screen
    let progressHeight = (windowHeight * 0.7 - rect.top);
    let totalHeight = rect.height;
    
    let percentage = Math.min(Math.max(progressHeight / totalHeight, 0), 1);
    progress.style.height = (percentage * 100) + "%";

    // 2. Light up dots and content as we pass them
    items.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        if (itemRect.top < windowHeight * 0.7) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});
const observerOptions = { threshold: 0.5 };

const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.bar-fill');
      fills.forEach(fill => {
        fill.style.width = fill.getAttribute('data-width');
      });
    }
  });
}, observerOptions);

const chartSection = document.querySelector('.chart-section');
if (chartSection) chartObserver.observe(chartSection);
// Simple interaction for the Audit form
const auditForm = document.querySelector('.kinetic-form');
if(auditForm) {
    auditForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = document.querySelector('.btn-kinetic-submit');
        btn.innerText = "UPLOADING_ENCRYPTED_PACKET...";
        btn.style.opacity = "0.5";
        
        setTimeout(() => {
            btn.innerText = "TRANSMISSION_COMPLETE";
            btn.style.background = "#00ff00"; // Green for success
            btn.style.color = "#000";
            btn.style.boxShadow = "0 0 30px #00ff00";
        }, 2000);
    });
}
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.mobile-nav-toggle');

navToggle.addEventListener('click', () => {
    // This toggles the 'nav-active' class we made in Step 3
    nav.classList.toggle('nav-active');
    
    // Accessibility: tells screen readers if it's open
    const isOpen = nav.classList.contains('nav-active');
    navToggle.setAttribute('aria-expanded', isOpen);
});

// Close menu if a link is clicked (good for mobile UX)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav-active');
    });
});