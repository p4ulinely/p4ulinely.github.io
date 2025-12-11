let currentLang = 'en';

function switchLanguage(lang) {
    currentLang = lang;

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`lang-${lang}`).classList.add('active');

    document.querySelectorAll('[data-en]').forEach(element => {
        if (element.hasAttribute('data-pt-only')) {
            element.style.display = lang === 'pt' ? 'block' : 'none';
        } else {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        }
    });

    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-br';

    localStorage.setItem('preferredLanguage', lang);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    if (savedLang !== 'en') {
        switchLanguage(savedLang);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    document.querySelector('.header').style.opacity = '1';
    document.querySelector('.header').style.transform = 'translateY(0)';
});
