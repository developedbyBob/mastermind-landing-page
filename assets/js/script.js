// ===== Variáveis Globais =====
let currentSlide = 0;
const testimonialCards = 4; // Número total de depoimentos

// ===== Inicialização =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: false
    });
    
    // Inicializa todas as funcionalidades
    initHeader();
    initMobileMenu();
    initCounters();
    initFAQs();
    initTestimonialSlider();
    initBackToTop();
    initFormValidation();
    
    // Adiciona efeitos de hover nos botões
    addButtonEffects();
});

// ===== Header com efeito de scroll =====
function initHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Verifica já no carregamento da página
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
}

// ===== Menu Mobile =====
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuLinks = document.querySelectorAll('.mobile-menu-links a');
    
    // Toggle do menu
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Anima os spans do botão
        const spans = menuToggle.querySelectorAll('span');
        if (menuToggle.classList.contains('active')) {
            spans[0].style.transform = 'translateY(9px) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'translateY(-9px) rotate(-45deg)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Fecha o menu ao clicar em um link
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            
            // Reseta a animação dos spans
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ===== Animação de Contadores =====
function initCounters() {
    const counters = document.querySelectorAll('.counter-number');
    const speed = 200; // Quanto menor, mais rápido
    
    const startCounting = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let count = 0;
                
                const updateCount = () => {
                    const increment = target / speed;
                    
                    if (count < target) {
                        count += increment;
                        counter.textContent = Math.ceil(count);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCount();
                observer.unobserve(counter);
            }
        });
    };
    
    const observer = new IntersectionObserver(startCounting, {
        threshold: 0.4
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// ===== FAQ Accordion =====
function initFAQs() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle do item atual
            item.classList.toggle('active');
        });
    });
}

// ===== Slider de Depoimentos =====
function initTestimonialSlider() {
    const track = document.querySelector('.testimonials-track');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    
    // Clona os depoimentos para criar um efeito de carrossel infinito
    const testimonials = document.querySelectorAll('.testimonial-card');
    testimonials.forEach(testimonial => {
        const clone = testimonial.cloneNode(true);
        track.appendChild(clone);
    });
    
    function updateSlider() {
        // Calcula quanto devemos mover o slider
        const slideWidth = document.querySelector('.testimonial-card').offsetWidth;
        const gap = parseInt(getComputedStyle(track).gap);
        const offset = (slideWidth + gap) * currentSlide;
        
        track.style.transform = `translateX(-${offset}px)`;
    }
    
    // Botões de navegação
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = testimonialCards - 1;
        }
        updateSlider();
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentSlide < testimonialCards - 1) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        updateSlider();
    });
    
    // Auto play do slider
    let interval = setInterval(() => {
        if (currentSlide < testimonialCards - 1) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        updateSlider();
    }, 5000);
    
    // Pause no autoplay quando hover no slider
    track.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });
    
    track.addEventListener('mouseleave', () => {
        interval = setInterval(() => {
            if (currentSlide < testimonialCards - 1) {
                currentSlide++;
            } else {
                currentSlide = 0;
            }
            updateSlider();
        }, 5000);
    });
    
    // Ajusta o slider quando a janela é redimensionada
    window.addEventListener('resize', updateSlider);
    
    // Inicializa o slider
    updateSlider();
}

// ===== Botão Back to Top =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Validação de Formulário =====
function initFormValidation() {
    const form = document.getElementById('signup-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validações básicas
            let valid = true;
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const level = document.getElementById('level').value;
            const terms = document.getElementById('terms').checked;
            
            // Validação de nome
            if (name.trim().length < 3) {
                showError('name', 'O nome deve ter pelo menos 3 caracteres');
                valid = false;
            } else {
                removeError('name');
            }
            
            // Validação de e-mail
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('email', 'Insira um e-mail válido');
                valid = false;
            } else {
                removeError('email');
            }
            
            // Validação de telefone
            const phoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
            if (!phoneRegex.test(phone)) {
                showError('phone', 'Insira um telefone no formato (00) 00000-0000');
                valid = false;
            } else {
                removeError('phone');
            }
            
            // Validação de nível
            if (!level) {
                showError('level', 'Selecione seu nível de experiência');
                valid = false;
            } else {
                removeError('level');
            }
            
            // Validação dos termos
            if (!terms) {
                showError('terms', 'Você precisa aceitar os termos para continuar');
                valid = false;
            } else {
                removeError('terms');
            }
            
            // Se tudo estiver válido, exibe uma mensagem de sucesso
            if (valid) {
                // Normalmente, aqui você enviaria os dados para o servidor
                // Mas para este exemplo, vamos apenas mostrar uma mensagem de sucesso
                form.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Inscrição realizada com sucesso!</h3>
                        <p>Enviamos um e-mail para ${email} com instruções para acessar o programa.</p>
                        <button class="btn btn-primary" onclick="window.location.reload()">Voltar</button>
                    </div>
                `;
                
                // Rola a página para mostrar a mensagem
                form.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Máscara para o campo de telefone
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito
                
                if (value.length > 0) {
                    value = '(' + value;
                }
                
                if (value.length > 3) {
                    value = value.substring(0, 3) + ') ' + value.substring(3);
                }
                
                if (value.length > 10) {
                    value = value.substring(0, 10) + '-' + value.substring(10, 14);
                }
                
                e.target.value = value;
            });
        }
    }
    
    // Função para mostrar erro nos campos
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        
        // Remove erro existente, se houver
        removeError(fieldId);
        
        // Adiciona classe de erro
        field.classList.add('error');
        
        // Cria mensagem de erro
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        // Adiciona mensagem após o campo
        if (fieldId === 'terms') {
            // Para o checkbox, adicionamos após o label
            field.parentElement.appendChild(errorElement);
        } else {
            field.parentElement.appendChild(errorElement);
        }
    }
    
    // Função para remover erro
    function removeError(fieldId) {
        const field = document.getElementById(fieldId);
        
        // Remove classe de erro
        field.classList.remove('error');
        
        // Remove mensagem de erro, se existir
        const parent = fieldId === 'terms' ? field.parentElement : field.parentElement;
        const errorElement = parent.querySelector('.error-message');
        
        if (errorElement) {
            parent.removeChild(errorElement);
        }
    }
}

// ===== Efeitos de Hover nos Botões =====
function addButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            // Cria um efeito de ripple
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            
            // Posiciona o ripple onde o mouse entrou
            const rect = button.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;
            
            ripple.style.left = `${offsetX}px`;
            ripple.style.top = `${offsetY}px`;
            
            // Adiciona o ripple ao botão
            button.appendChild(ripple);
            
            // Remove o ripple após a animação
            setTimeout(() => {
                button.removeChild(ripple);
            }, 600);
        });
    });
    
    // Adiciona estilos CSS para o efeito ripple
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple-effect {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            width: 100px;
            height: 100px;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s linear;
        }
        
        @keyframes ripple {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(4);
                opacity: 0;
            }
        }
        
        .error {
            border-color: var(--error) !important;
        }
        
        .error-message {
            color: var(--error);
            font-size: 12px;
            margin-top: 5px;
        }
        
        .success-message {
            text-align: center;
            padding: 30px;
        }
        
        .success-message i {
            font-size: 60px;
            color: var(--success);
            margin-bottom: 20px;
        }
        
        .success-message h3 {
            margin-bottom: 15px;
        }
        
        .success-message p {
            margin-bottom: 25px;
        }
    `;
    
    document.head.appendChild(style);
}

// ===== Animações adicionais para elementos =====
// Animação de digitação para o título principal
function initTypeWriter() {
    const titles = document.querySelectorAll('.typing-effect');
    
    titles.forEach(title => {
        const text = title.textContent;
        title.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        typeWriter();
    });
}

// ===== Animações de Parallax =====
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== Adicionar efeitos de luz em movimento =====
function addLightEffects() {
    const hero = document.querySelector('.hero');
    
    // Cria elementos de luz
    for (let i = 0; i < 5; i++) {
        const light = document.createElement('div');
        light.classList.add('floating-light');
        light.style.left = `${Math.random() * 100}%`;
        light.style.top = `${Math.random() * 100}%`;
        light.style.animationDelay = `${Math.random() * 5}s`;
        
        hero.appendChild(light);
    }
    
    // Adiciona estilos CSS para as luzes
    const style = document.createElement('style');
    style.textContent = `
        .floating-light {
            position: absolute;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(124, 58, 237, 0.2), transparent 70%);
            pointer-events: none;
            z-index: 0;
            filter: blur(20px);
            animation: floatLight 15s infinite ease-in-out;
        }
        
        @keyframes floatLight {
            0%, 100% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(100px, 50px);
            }
            50% {
                transform: translate(50px, 100px);
            }
            75% {
                transform: translate(-50px, 50px);
            }
        }
    `;
    
    document.head.appendChild(style);
}

// ===== Iniciar efeitos extras =====
window.addEventListener('load', function() {
    // Adiciona efeito de digitação se houver elementos com a classe typing-effect
    if (document.querySelector('.typing-effect')) {
        initTypeWriter();
    }
    
    // Adiciona efeito de parallax se houver elementos com a classe parallax
    if (document.querySelector('.parallax')) {
        initParallax();
    }
    
    // Adiciona efeitos de luz na seção hero
    addLightEffects();
    
    // Remove a classe de "carregando" para iniciar animações
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
});