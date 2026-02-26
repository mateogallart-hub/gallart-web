document.addEventListener('DOMContentLoaded', function() {
    
    // Hero slideshow - cambio automático de imágenes de fondo
    const heroSlides = document.querySelectorAll('.hero-bg-slide');
    if (heroSlides.length > 1) {
        let currentIndex = 0;
        setInterval(function() {
            heroSlides[currentIndex].classList.remove('activo');
            currentIndex = (currentIndex + 1) % heroSlides.length;
            heroSlides[currentIndex].classList.add('activo');
        }, 5000);
    }
    
    // GALLART-TEC Color Switcher
    const colorTags = document.querySelectorAll('.coleccion-suelo[data-producto] .color-tag[data-color]');
    
    colorTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const producto = this.closest('.coleccion-suelo');
            const productoId = producto.dataset.producto;
            const color = this.dataset.color;
            const img = producto.querySelector('.producto-imagen img');
            
            // Update active state
            producto.querySelectorAll('.color-tag').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Build new image path
            const newSrc = `../assets/gallart-tec-${productoId}-${color}.png`;
            
            // Check if image exists before changing
            const testImg = new Image();
            testImg.onload = function() {
                img.src = newSrc;
                img.alt = img.alt.replace(/GALLART-TEC.*/, 'GALLART-TEC ' + color.charAt(0).toUpperCase() + color.slice(1));
            };
            testImg.onerror = function() {
                console.log('Image not found: ' + newSrc);
            };
            testImg.src = newSrc;
        });
    });

    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
    
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.producto-card:not(.tablero-tab), .exposicion-card, .stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Cookie Banner
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAceptar = document.getElementById('cookie-aceptar');
    const cookieRechazar = document.getElementById('cookie-rechazar');

    if (cookieBanner) {
        const cookiesAccepted = localStorage.getItem('cookies_accepted');
        
        if (cookiesAccepted === null) {
            cookieBanner.classList.add('show');
        }

        if (cookieAceptar) {
            cookieAceptar.addEventListener('click', () => {
                localStorage.setItem('cookies_accepted', 'true');
                cookieBanner.classList.remove('show');
            });
        }

        if (cookieRechazar) {
            cookieRechazar.addEventListener('click', () => {
                localStorage.setItem('cookies_accepted', 'false');
                cookieBanner.classList.remove('show');
            });
        }
    }
});
