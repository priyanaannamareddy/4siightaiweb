document.addEventListener('DOMContentLoaded', () => {
    // Create main cursor elements
    const cursor = document.createElement('div');
    const follower = document.createElement('div');
    cursor.className = 'cursor';
    follower.className = 'cursor-follower';
    document.body.appendChild(cursor);
    document.body.appendChild(follower);

    // Force cursor visibility
    cursor.style.display = 'block';
    follower.style.display = 'block';

    // Create trail elements
    const trails = [];
    const numTrails = 20;
    for (let i = 0; i < numTrails; i++) {
        const trail = document.createElement('div');
        trail.className = 'trail';
        document.body.appendChild(trail);
        trails.push({
            element: trail,
            x: 0,
            y: 0,
            alpha: 0
        });
    }

    // Initialize positions
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let followerX = window.innerWidth / 2;
    let followerY = window.innerHeight / 2;

    // Movement parameters
    const smoothing = 0.2;        // Faster response for main cursor
    const followerSmoothing = 0.1; // Smoother follow effect

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateTrails() {
        for (let i = trails.length - 1; i > 0; i--) {
            const current = trails[i];
            const prev = trails[i - 1];
            
            current.x += (prev.x - current.x) * 0.3;
            current.y += (prev.y - current.y) * 0.3;
            current.alpha *= 0.95;

            current.element.style.transform = `translate(${current.x}px, ${current.y}px)`;
            current.element.style.opacity = current.alpha;
        }

        // Update first trail with cursor position
        trails[0].x = cursorX;
        trails[0].y = cursorY;
        trails[0].alpha = 1;
    }

    function animate() {
        // Update positions with smoothing
        cursorX = lerp(cursorX, mouseX, smoothing);
        cursorY = lerp(cursorY, mouseY, smoothing);
        followerX = lerp(followerX, mouseX, followerSmoothing);
        followerY = lerp(followerY, mouseY, followerSmoothing);

    // Apply transforms with translate3d for better performance
        cursor.style.transform = `translate3d(${cursorX - 16}px, ${cursorY - 16}px, 0)`;
        follower.style.transform = `translate3d(${followerX - 20}px, ${followerY - 20}px, 0)`;

        // Ensure cursor is visible by setting opacity
        cursor.style.opacity = '1';
        follower.style.opacity = '1';

        // Update trails
        updateTrails();

        requestAnimationFrame(animate);
    }

    // Linear interpolation function for smooth movement
    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    // Start animation
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        mouseX = window.innerWidth / 2;
        mouseY = window.innerHeight / 2;
    });

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input[type="button"], input[type="submit"]');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = `translate(${cursorX - 18}px, ${cursorY - 18}px) scale(1.5)`;
            follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px) scale(1.8)`;
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = `translate(${cursorX - 12}px, ${cursorY - 12}px) scale(1)`;
            follower.style.transform = `translate(${followerX - 15}px, ${followerY - 15}px) scale(1)`;
        });
    });
});