/**
 * Editorial Scrapbook / Zine Portfolio Script
 * Handles interactions: copy to clipboard, theme toggle, project modals, quick contact form
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('zine-theme');

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggleLabel(savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('zine-theme', newTheme);
      updateThemeToggleLabel(newTheme);
      showToast(newTheme === 'dark' ? '★ BLUEPRINT DARK MODE' : '☀ KRAFT PAPER LIGHT MODE');
    });
  }

  function updateThemeToggleLabel(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === 'dark' 
      ? '<i class="bi bi-sun"></i> [ LIGHT MODE ]' 
      : '<i class="bi bi-moon-stars"></i> [ DARK MODE ]';
  }

  // 2. Copy To Clipboard
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`COPIED TO CLIPBOARD: ${textToCopy}`);
          const originalText = btn.innerHTML;
          btn.innerHTML = '<i class="bi bi-check2"></i> COPIED';
          btn.classList.add('bg-success', 'text-white');
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('bg-success', 'text-white');
          }, 2000);
        }).catch(err => {
          console.error('Copy failed', err);
        });
      }
    });
  });

  // 3. Project Details Modal Dynamic Content
  const projectData = {
    'lumen': {
      title: 'LUMEN ARCHIVE — EDITORIAL DESIGN',
      year: '2025 / 2026',
      client: 'Independent Curators & Art Directors',
      role: 'Creative Director & Editorial Designer',
      tools: 'Bootstrap 5, Figma, Grid Systems, Typography',
      summary: 'A curated visual archive and digital storytelling publication built with editorial zine layouts, experimental typography, and fast responsive interactions.',
      image: 'assets/images/workspace.jpg',
      link: '#'
    },
    'kinetic': {
      title: 'KINETIC TYPOGRAPHY SYSTEM',
      year: '2024 / 2025',
      client: 'Design Week Showcase',
      role: 'Brand Designer & Frontend Architect',
      tools: 'CSS Animations, SVG Micro-Interactions, Bootstrap',
      summary: 'Exploration of brutalist kinetic identity systems, dynamic posters, and interactive web zines with tactile paper-like aesthetics.',
      image: 'assets/images/hero.jpg',
      link: '#'
    },
    'monochrome': {
      title: 'MONOCHROME JOURNAL & STORE',
      year: '2023 / 2024',
      client: 'Minimalist Publishing House',
      role: 'Content Strategist & Web Developer',
      tools: 'HTML5, Bootstrap, SEO Optimization, Content Architecture',
      summary: 'High-speed editorial platform optimized for long-form reading, high-contrast monochrome photography, and zero-distraction layout.',
      image: 'assets/images/connect.jpg',
      link: '#'
    }
  };

  const projectModalElement = document.getElementById('projectModal');
  if (projectModalElement) {
    const projectModal = new bootstrap.Modal(projectModalElement);

    document.querySelectorAll('.project-trigger').forEach(card => {
      card.addEventListener('click', () => {
        const key = card.getAttribute('data-project');
        const data = projectData[key];
        if (data) {
          document.getElementById('modalProjectTitle').textContent = data.title;
          document.getElementById('modalProjectYear').textContent = data.year;
          document.getElementById('modalProjectClient').textContent = data.client;
          document.getElementById('modalProjectRole').textContent = data.role;
          document.getElementById('modalProjectTools').textContent = data.tools;
          document.getElementById('modalProjectDesc').textContent = data.summary;
          document.getElementById('modalProjectImg').src = data.image;
          projectModal.show();
        }
      });
    });
  }

  // 4. Quick Message Paper Form
  const paperForm = document.getElementById('quickMessageForm');
  if (paperForm) {
    paperForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('senderName').value;
      const emailInput = document.getElementById('senderEmail').value;
      const messageInput = document.getElementById('senderMessage').value;

      if (!nameInput || !emailInput || !messageInput) {
        showToast('⚠️ PLEASE FILL ALL FIELDS');
        return;
      }

      const submitBtn = paperForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> STAMPING MESSAGE...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '✔ MESSAGE DISPATCHED!';
        paperForm.reset();
        showToast(`✉ THANKS ${nameInput.toUpperCase()}! MESSAGE SENT.`);
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }, 1200);
    });
  }

  // 5. Toast notification helper
  function showToast(message) {
    let toast = document.getElementById('toastStamp');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastStamp';
      toast.className = 'toast-stamp';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 6. Interactive sticker micro-shake on click
  document.querySelectorAll('.sticker-badge').forEach(badge => {
    badge.addEventListener('mousedown', () => {
      badge.style.transform = `${badge.style.transform || ''} scale(0.96)`;
    });
    badge.addEventListener('mouseup', () => {
      badge.style.transform = '';
    });
  });
});
