// ===== Recursos Avançados e Efeitos Visuais =====
// Incluir este arquivo após o script.js principal

// ===== Configuração do Carregador de Página =====
function setupPageLoader() {
    // Cria o loader para a página
    const loaderContainer = document.createElement('div');
    loaderContainer.className = 'page-loader';
    
    const loader = document.createElement('div');
    loader.className = 'loader';
    
    loaderContainer.appendChild(loader);
    document.body.prepend(loaderContainer);
    
    // Adiciona a classe de carregamento ao body
    document.body.classList.add('loading');
    
    // Remove a classe loading após o carregamento completo
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
        }, 500); // Pequeno delay para garantir que tudo foi carregado
    });
}

// ===== Progresso de Scroll =====
function setupScrollProgress() {
    // Cria o indicador de progresso
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);
    
    // Atualiza a barra de progresso durante o scroll
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollPosition = window.scrollY;
        const progress = (scrollPosition / documentHeight) * 100;
        
        progressBar.style.width = `${progress}%`;
    });
}

// ===== Navegação Lateral =====
function setupSideNavigation() {
    // Identifica todas as seções da página
    const sections = document.querySelectorAll('section[id]');
    
    // Cria a navegação lateral
    const sideNav = document.createElement('div');
    sideNav.className = 'side-nav';
    
    // Adiciona um ponto de navegação para cada seção
    sections.forEach(section => {
        const dot = document.createElement('div');
        dot.className = 'nav-dot';
        dot.setAttribute('data-target', section.id);
        
        const tooltip = document.createElement('span');
        tooltip.textContent = section.id.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        dot.appendChild(tooltip);
        sideNav.appendChild(dot);
        
        // Adiciona o evento de clique para rolagem suave
        dot.addEventListener('click', function() {
            document.getElementById(section.id).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    document.body.appendChild(sideNav);
    
    // Atualiza a navegação durante o scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.id;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`.nav-dot[data-target="${sectionId}"]`).classList.add('active');
            } else {
                document.querySelector(`.nav-dot[data-target="${sectionId}"]`).classList.remove('active');
            }
        });
    });
}

// ===== Animação de Texto por Caractere =====
function setupTextAnimation() {
    const animatedTexts = document.querySelectorAll('.animated-text');
    
    animatedTexts.forEach(text => {
        let content = text.textContent;
        text.textContent = '';
        
        for (let i = 0; i < content.length; i++) {
            const char = document.createElement('span');
            char.className = 'chars';
            char.textContent = content[i];
            char.style.setProperty('--char-index', i);
            text.appendChild(char);
        }
    });
}

// ===== Cursor Personalizado =====
function setupCustomCursor() {
    // Cria os elementos do cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    
    // Atualiza a posição do cursor
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    // Atualiza o estilo em elementos interativos
    const interactiveElements = document.querySelectorAll('a, button, .btn, input, select, .faq-item, .nav-dot');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });
}

// ===== Efeitos de Entrada =====
function setupIntersectionAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const scaleElements = document.querySelectorAll('.scale-in');
    const slideLeftElements = document.querySelectorAll('.slide-in-left');
    const slideRightElements = document.querySelectorAll('.slide-in-right');
    
    const allElements = [...fadeElements, ...scaleElements, ...slideLeftElements, ...slideRightElements];
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    allElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== Partículas de Fundo =====
function setupParticles() {
    // Cria o container para as partículas
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.prepend(particlesContainer);
    
    // Cria as partículas
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Tamanho aleatório
    const size = Math.random() * 10 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Posição inicial aleatória
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    
    // Movimento aleatório
    const endX = (Math.random() - 0.5) * 200;
    const endY = (Math.random() - 0.5) * 200;
    particle.style.setProperty('--end-x', `${endX}px`);
    particle.style.setProperty('--end-y', `${endY}px`);
    
    // Duração e atraso aleatórios
    const duration = Math.random() * 30 + 10;
    const delay = Math.random() * 5;
    particle.style.animation = `particleAnimation ${duration}s ${delay}s infinite alternate`;
    
    // Opacidade aleatória
    const opacity = Math.random() * 0.3 + 0.1;
    particle.style.opacity = opacity;
    
    container.appendChild(particle);
}

// ===== Ondas no Footer =====
function setupFooterWaves() {
    const footer = document.querySelector('footer');
    
    // Verifica se o footer existe
    if (footer) {
        // Cria o elemento de ondas
        const waves = document.createElement('div');
        waves.className = 'footer-waves';
        
        // Adiciona as ondas
        const wave1 = document.createElement('div');
        wave1.className = 'waves';
        
        const wave2 = document.createElement('div');
        wave2.className = 'waves';
        
        waves.appendChild(wave1);
        waves.appendChild(wave2);
        
        // Insere as ondas antes do footer
        footer.parentNode.insertBefore(waves, footer);
    }
}

// ===== Adiciona classes especiais a elementos para ativar efeitos =====
function enhanceElements() {
    // Adiciona classe hover-card aos cards
    document.querySelectorAll('.audience-card, .pricing-card, .testimonial-card, .counter-item, .feature-image')
        .forEach(el => el.classList.add('hover-card'));
    
    // Adiciona classe btn-glow aos botões
    document.querySelectorAll('.btn-primary')
        .forEach(el => el.classList.add('btn-glow'));
    
    // Adiciona classe float aos elementos flutuantes
    document.querySelectorAll('.floating-card, .hero-image')
        .forEach(el => el.classList.add('float'));
    
    // Adiciona classe pulse aos elementos de destaque
    document.querySelectorAll('.badge, .pricing-badge')
        .forEach(el => el.classList.add('pulse'));
    
    // Adiciona classe image-effect aos containers de imagem
    document.querySelectorAll('.hero-image, .feature-image, .testimonial-avatar')
        .forEach(el => el.classList.add('image-effect'));
    
    // Adiciona classes de animação de entrada
    document.querySelectorAll('.hero-content h1, .hero-content p, .section-tag').forEach(el => {
        el.classList.add('fade-in');
    });
    
    document.querySelectorAll('.audience-card, .counter-item, .pricing-card').forEach(el => {
        el.classList.add('scale-in');
    });
    
    document.querySelectorAll('.feature-content').forEach((el, index) => {
        if (index % 2 === 0) {
            el.classList.add('slide-in-left');
        } else {
            el.classList.add('slide-in-right');
        }
    });
    
    // Adiciona classe animated-text aos títulos
    document.querySelectorAll('h1, h2').forEach(el => {
        if (!el.classList.contains('animated-text')) {
            el.classList.add('animated-text');
        }
    });
}

// ===== Melhora no formulário =====
function enhanceForm() {
    const form = document.getElementById('signup-form');
    
    if (form) {
        // Anima labels quando o campo está em foco
        const formGroups = form.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, select');
            const label = group.querySelector('label');
            
            if (input && label) {
                // Adiciona classes para estilização
                group.classList.add('form-group-animated');
                label.classList.add('form-label-animated');
                
                // Verifica estado inicial
                if (input.value) {
                    label.classList.add('active');
                }
                
                // Eventos de foco e blur
                input.addEventListener('focus', () => {
                    label.classList.add('active');
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        label.classList.remove('active');
                    }
                });
            }
        });
        
        // Adiciona estilos para os campos de formulário animados
        const style = document.createElement('style');
        style.textContent = `
            .form-group-animated {
                position: relative;
            }
            
            .form-label-animated {
                position: absolute;
                top: 50%;
                left: 16px;
                transform: translateY(-50%);
                transition: all 0.3s ease;
                pointer-events: none;
                color: var(--light-gray);
                background: transparent;
            }
            
            .form-label-animated.active {
                top: 0;
                left: 10px;
                transform: translateY(-50%);
                font-size: 12px;
                padding: 0 6px;
                color: var(--primary-light);
                background: var(--dark-gray);
            }
            
            .form-group-animated input:focus,
            .form-group-animated select:focus {
                border-color: var(--primary);
                box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.2);
            }
        `;
        
        document.head.appendChild(style);
    }
}

// ===== Easter Egg: Modo Konami =====
function setupKonamiCode() {
    // Sequência do Código Konami
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        // Verifica a tecla pressionada
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            // Se completou a sequência
            if (konamiIndex === konamiCode.length) {
                // Ativa o easter egg
                activateSpecialMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateSpecialMode() {
    // Cria um elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'konami-notification';
    notification.textContent = '🎮 Modo Especial Ativado! 🎮';
    
    document.body.appendChild(notification);
    
    // Adiciona estilos para a notificação
    const style = document.createElement('style');
    style.textContent = `
        .konami-notification {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            padding: 15px 25px;
            border-radius: 50px;
            font-weight: bold;
            z-index: 9999;
            animation: konami-notification 3s forwards;
            box-shadow: 0 10px 20px rgba(124, 58, 237, 0.3);
        }
        
        @keyframes konami-notification {
            0% {
                transform: translateX(-50%) translateY(-100px);
                opacity: 0;
            }
            20% {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
            80% {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
            100% {
                transform: translateX(-50%) translateY(-100px);
                opacity: 0;
            }
        }
        
        body.konami-mode * {
            animation: rainbow-text 4s infinite !important;
        }
        
        @keyframes rainbow-text {
            0% { color: #ff0000; }
            14% { color: #ff7f00; }
            28% { color: #ffff00; }
            42% { color: #00ff00; }
            57% { color: #0000ff; }
            71% { color: #4b0082; }
            85% { color: #8f00ff; }
            100% { color: #ff0000; }
        }
    `;
    
    document.head.appendChild(style);
    
    // Remove a notificação após a animação
    setTimeout(() => {
        document.body.removeChild(notification);
        document.body.classList.toggle('konami-mode');
    }, 3000);
}

// ===== Inicialização de todos os recursos avançados =====
document.addEventListener('DOMContentLoaded', function() {
    // Configura o carregador de página
    setupPageLoader();
    
    // Configura a barra de progresso de scroll
    setupScrollProgress();
    
    // Configura a navegação lateral
    setupSideNavigation();
    
    // Configura animações de texto
    setupTextAnimation();
    
    // Configura cursor personalizado (opcional - descomente se quiser usar)
    // setupCustomCursor();
    
    // Configura animações de interseção
    setupIntersectionAnimations();
    
    // Configura partículas de fundo
    setupParticles();
    
    // Configura ondas no footer
    setupFooterWaves();
    
    // Melhora elementos com classes especiais
    enhanceElements();
    
    // Melhora o formulário com animações
    enhanceForm();
    
    // Configura o Easter Egg do Código Konami
    setupKonamiCode();
});

// ===== Inicialização pós-carregamento para otimização =====
window.addEventListener('load', function() {
    // Recalcula animações baseadas em scroll
    AOS.refresh();
});