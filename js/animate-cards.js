document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  const images = document.querySelectorAll('.card .card-image img');

  // IntersectionObserver to add in-view class when cards enter viewport
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          // Add AI-inspired staggered animation with neural network effect
          setTimeout(() => {
            el.classList.add('in-view');
            // Add a subtle pulse effect when card comes into view
            el.style.animation = 'cardPulse 2s ease-in-out';
            // Add AI glow effect
            el.style.boxShadow = '0 18px 40px rgba(10, 32, 64, 0.12), 0 0 30px rgba(0, 229, 255, 0.1)';
          }, index * 200);
        }
      });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));
  } else {
    // Fallback: ensure cards are visible
    cards.forEach(c => c.classList.add('in-view'));
  }

  // Parallax effect for card images: images move slower than scroll
  let ticking = false;

  function updateParallax() {
    images.forEach(img => {
      const card = img.closest('.card');
      if (!card) return;
      const rect = card.getBoundingClientRect();

      // Only apply significant transform when card is somewhat in view
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const distanceFromCenter = rect.top + rect.height / 2 - viewportHeight / 2;

      // parallax factor (adjust for stronger/weaker effect)
      const factor = 0.09; // smaller = subtler
      const translateY = -distanceFromCenter * factor;

      // limit translate so image doesn't move out of view too much
      const maxTranslate = rect.height * 0.35;
      const clamped = Math.max(-maxTranslate, Math.min(maxTranslate, translateY));

      img.style.transform = `translate3d(0, ${clamped}px, 0) scale(1.12)`;
    });
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Initial update
  updateParallax();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  // Optional: add small hover/focus pulse for accessibility
  cards.forEach(card => {
    card.addEventListener('focusin', () => card.classList.add('in-view'));
  });

  // Add AI neural connection effect on hover
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Create temporary neural connection lines
      createNeuralConnections(card);
    });

    card.addEventListener('mouseleave', () => {
      // Remove neural connections
      removeNeuralConnections(card);
    });
  });
});

// Function to create neural connection effect on card hover
function createNeuralConnections(card) {
  const cardRect = card.getBoundingClientRect();
  const connections = [];

  // Create 3-5 connection lines emanating from the card
  for (let i = 0; i < Math.floor(Math.random() * 3) + 3; i++) {
    const connection = document.createElement('div');
    connection.className = 'ai-card-connection';
    connection.style.position = 'fixed';
    connection.style.left = (cardRect.left + cardRect.width / 2) + 'px';
    connection.style.top = (cardRect.top + cardRect.height / 2) + 'px';
    connection.style.width = (Math.random() * 100 + 50) + 'px';
    connection.style.height = '1px';
    connection.style.background = 'linear-gradient(90deg, rgba(0, 229, 255, 0.8) 0%, transparent 100%)';
    connection.style.transformOrigin = 'left center';
    connection.style.transform = `rotate(${(Math.random() - 0.5) * 60}deg)`;
    connection.style.opacity = '0';
    connection.style.animation = 'aiConnectionFade 0.8s ease-out forwards';
    connection.style.zIndex = '9999';
    connection.style.pointerEvents = 'none';

    document.body.appendChild(connection);
    connections.push(connection);
  }

  // Store connections on card for cleanup
  card._neuralConnections = connections;

  // Remove connections after animation
  setTimeout(() => {
    removeNeuralConnections(card);
  }, 800);
}

// Function to remove neural connections
function removeNeuralConnections(card) {
  if (card._neuralConnections) {
    card._neuralConnections.forEach(connection => {
      if (connection.parentNode) {
        connection.parentNode.removeChild(connection);
      }
    });
    card._neuralConnections = null;
  }
}
