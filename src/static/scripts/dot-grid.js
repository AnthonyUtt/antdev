/**
 * DotGrid - Interactive canvas background with animated dots
 * Vanilla JS port of the React DotGrid component
 *
 * Original source: https://github.com/DavidHDev/react-bits
 * Author: David Haz (https://github.com/DavidHDev)
 * License: MIT
 */

class DotGrid {
  /**
   * Create a DotGrid instance
   * @param {HTMLElement} container - Container element for the canvas
   * @param {Object} options - Configuration options
   */
  constructor(container, options = {}) {
    this.container = container;
    
    // Configuration with defaults
    this.config = {
      dotSize: options.dotSize ?? 16,
      gap: options.gap ?? 32,
      baseColor: options.baseColor ?? '#552e84',
      activeColor: options.activeColor ?? '#1ba09c',
      opacity: options.opacity ?? 1,
      proximity: options.proximity ?? 150,
      speedTrigger: options.speedTrigger ?? 100,
      shockRadius: options.shockRadius ?? 250,
      shockStrength: options.shockStrength ?? 5,
      maxSpeed: options.maxSpeed ?? 5000,
      resistance: options.resistance ?? 750,
      returnDuration: options.returnDuration ?? 1.5,
    };

    // Parse colors to RGB
    this.baseRgb = this.hexToRgb(this.config.baseColor);
    this.activeRgb = this.hexToRgb(this.config.activeColor);

    // State
    this.dots = [];
    this.pointer = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      speed: 0,
      lastTime: 0,
      lastX: 0,
      lastY: 0,
    };
    this.rafId = null;
    this.circlePath = null;

    // Bind methods
    this.handleMouseMove = this.throttle(this.onMouseMove.bind(this), 50);
    this.handleClick = this.onClick.bind(this);
    this.handleResize = this.buildGrid.bind(this);

    // Initialize
    this.createCanvas();
    this.buildGrid();
    this.createCirclePath();
    this.attachEventListeners();
    this.startRenderLoop();
  }

  /**
   * Convert hex color to RGB object
   */
  hexToRgb(hex) {
    const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!m) return { r: 0, g: 0, b: 0 };
    return {
      r: parseInt(m[1], 16),
      g: parseInt(m[2], 16),
      b: parseInt(m[3], 16),
    };
  }

  /**
   * Convert RGB object to rgba string
   */
  rgbToRgba(rgb, alpha) {
    return `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
  }

  /**
   * Throttle function to limit execution rate
   */
  throttle(func, limit) {
    let lastCall = 0;
    return (...args) => {
      const now = performance.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        func.apply(this, args);
      }
    };
  }

  /**
   * Create and setup canvas element
   */
  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'dot-grid__canvas';
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
  }

  /**
   * Create reusable circle path for performance
   */
  createCirclePath() {
    if (typeof Path2D === 'undefined') return;
    this.circlePath = new Path2D();
    this.circlePath.arc(0, 0, this.config.dotSize / 2, 0, Math.PI * 2);
  }

  /**
   * Build the grid of dots based on container size
   */
  buildGrid() {
    const { width, height } = this.container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size with high-DPI support
    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.ctx.scale(dpr, dpr);

    const { dotSize, gap } = this.config;
    const cell = dotSize + gap;

    const cols = Math.floor((width + gap) / cell);
    const rows = Math.floor((height + gap) / cell);

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;

    const startX = (width - gridW) / 2 + dotSize / 2;
    const startY = (height - gridH) / 2 + dotSize / 2;

    // Clear existing dots and create new grid
    this.dots = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        this.dots.push({
          cx: startX + x * cell,
          cy: startY + y * cell,
          xOffset: 0,
          yOffset: 0,
          _inertiaApplied: false,
        });
      }
    }
  }

  /**
   * Main render loop
   */
  draw() {
    const { ctx, canvas, dots, pointer, config, baseRgb, activeRgb, circlePath } = this;
    const { proximity, baseColor } = config;
    const proxSq = proximity * proximity;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw each dot
    for (const dot of dots) {
      const ox = dot.cx + dot.xOffset;
      const oy = dot.cy + dot.yOffset;
      const dx = dot.cx - pointer.x;
      const dy = dot.cy - pointer.y;
      const dsq = dx * dx + dy * dy;

      // Calculate color based on proximity
      const opacity = config.opacity;
      let fillStyle = this.rgbToRgba(baseRgb, opacity);
      if (dsq <= proxSq) {
        const dist = Math.sqrt(dsq);
        const t = 1 - dist / proximity;
        const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
        const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
        const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
        fillStyle = `rgba(${r},${g},${b},${opacity})`;
      }

      // Draw dot
      ctx.save();
      ctx.translate(ox, oy);
      ctx.fillStyle = fillStyle;
      if (circlePath) {
        ctx.fill(circlePath);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, config.dotSize / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    this.rafId = requestAnimationFrame(() => this.draw());
  }

  /**
   * Start the render loop
   */
  startRenderLoop() {
    if (this.rafId) return;
    this.draw();
  }

  /**
   * Stop the render loop
   */
  stopRenderLoop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  /**
   * Handle mouse move events
   */
  onMouseMove(e) {
    const now = performance.now();
    const pr = this.pointer;
    const dt = pr.lastTime ? now - pr.lastTime : 16;
    const dx = e.clientX - pr.lastX;
    const dy = e.clientY - pr.lastY;

    // Calculate velocity
    let vx = (dx / dt) * 1000;
    let vy = (dy / dt) * 1000;
    let speed = Math.hypot(vx, vy);

    // Cap speed
    if (speed > this.config.maxSpeed) {
      const scale = this.config.maxSpeed / speed;
      vx *= scale;
      vy *= scale;
      speed = this.config.maxSpeed;
    }

    pr.lastTime = now;
    pr.lastX = e.clientX;
    pr.lastY = e.clientY;
    pr.vx = vx;
    pr.vy = vy;
    pr.speed = speed;

    // Get position relative to canvas
    const rect = this.canvas.getBoundingClientRect();
    pr.x = e.clientX - rect.left;
    pr.y = e.clientY - rect.top;

    // Apply inertia to nearby dots on fast movement
    const { speedTrigger, proximity, resistance, returnDuration } = this.config;

    for (const dot of this.dots) {
      const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);

      if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {
        dot._inertiaApplied = true;
        gsap.killTweensOf(dot);

        const pushX = dot.cx - pr.x + vx * 0.005;
        const pushY = dot.cy - pr.y + vy * 0.005;

        gsap.to(dot, {
          inertia: { xOffset: pushX, yOffset: pushY, resistance },
          onComplete: () => {
            gsap.to(dot, {
              xOffset: 0,
              yOffset: 0,
              duration: returnDuration,
              ease: 'elastic.out(1,0.75)',
            });
            dot._inertiaApplied = false;
          },
        });
      }
    }
  }

  /**
   * Handle click events - shockwave effect
   */
  onClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    const { shockRadius, shockStrength, resistance, returnDuration } = this.config;

    for (const dot of this.dots) {
      const dist = Math.hypot(dot.cx - cx, dot.cy - cy);

      if (dist < shockRadius && !dot._inertiaApplied) {
        dot._inertiaApplied = true;
        gsap.killTweensOf(dot);

        const falloff = Math.max(0, 1 - dist / shockRadius);
        const pushX = (dot.cx - cx) * shockStrength * falloff;
        const pushY = (dot.cy - cy) * shockStrength * falloff;

        gsap.to(dot, {
          inertia: { xOffset: pushX, yOffset: pushY, resistance },
          onComplete: () => {
            gsap.to(dot, {
              xOffset: 0,
              yOffset: 0,
              duration: returnDuration,
              ease: 'elastic.out(1,0.75)',
            });
            dot._inertiaApplied = false;
          },
        });
      }
    }
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    window.addEventListener('mousemove', this.handleMouseMove, { passive: true });
    window.addEventListener('click', this.handleClick);

    // Resize handling
    if ('ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(() => this.buildGrid());
      this.resizeObserver.observe(this.container);
    } else {
      window.addEventListener('resize', this.handleResize);
    }
  }

  /**
   * Remove event listeners and cleanup
   */
  destroy() {
    this.stopRenderLoop();
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('click', this.handleClick);

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    } else {
      window.removeEventListener('resize', this.handleResize);
    }

    // Kill any active GSAP tweens on dots
    for (const dot of this.dots) {
      gsap.killTweensOf(dot);
    }

    // Remove canvas from DOM
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}
