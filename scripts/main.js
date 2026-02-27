// Sayfanın yüklendiğini göster
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sayfa yüklendi!');
    initializeEffects();
});

// Dinamik efektler
function initializeEffects() {
    // Smooth scroll
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Aktif nav linki vurgula
    highlightActiveNav();

    // Sayfa başında fade-in efektini tetikle
    const sections = document.querySelectorAll('section, article');
    sections.forEach((section, index) => {
        section.style.animationDelay = (index * 0.1) + 's';
    });
}

// Aktif sayfayı navbar'da vurgula
function highlightActiveNav() {
    const currentLocation = location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentLocation.includes(href) || 
            (href === 'index.html' && currentLocation.endsWith('/'))) {
            link.style.background = 'rgba(102, 126, 234, 0.8)';
            link.style.borderBottomColor = '#667eea';
        }
    });
}

// Scroll efektleri
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
    }
});

// Sayfa başına dön butonu
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑ Başa Dön';
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 0.8rem 1.2rem;
        border-radius: 50px;
        cursor: pointer;
        display: none;
        z-index: 99;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
    `;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    button.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
    });

    button.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    });

    document.body.appendChild(button);
}

// Başa dön butonu ekle
createScrollToTopButton();

// Tıklama efekti (ripple)
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' || e.target.closest('nav')) {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        e.target.appendChild(ripple);
    }
});

// Ripple animasyonu
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            width: 20px;
            height: 20px;
            opacity: 1;
            transform: translate(-50%, -50%);
        }
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
            transform: translate(-50%, -50%);
        }
    }
`;
document.head.appendChild(style);

console.log('Hoş geldiniz! Bu web sitesi Ziya Baran Utuğlu tarafından oluşturulmuştur.');
