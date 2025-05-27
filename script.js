document.addEventListener('DOMContentLoaded', function() {
    const alternadorMenu = document.querySelector('.alternador-menu-mobile');
    const navegacao = document.querySelector('.barra-topo .navegacao-principal');
    const barraTopo = document.querySelector('.barra-topo');

    // Menu Mobile
    if (alternadorMenu && navegacao) {
        alternadorMenu.addEventListener('click', function() {
            navegacao.classList.toggle('ativa');
            barraTopo.classList.toggle('menu-aberto'); 

            const estaExpandido = navegacao.classList.contains('ativa');
            alternadorMenu.setAttribute('aria-expanded', estaExpandido);
            if (estaExpandido) {
                alternadorMenu.innerHTML = '✕'; // Ícone de fechar
                alternadorMenu.setAttribute('aria-label', 'Fechar menu');
            } else {
                alternadorMenu.innerHTML = '☰'; // Ícone de abrir
                alternadorMenu.setAttribute('aria-label', 'Abrir menu');
            }
        });
    }

    // Mudar fundo do header ao rolar
    if (barraTopo) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 30) { // Limiar menor para efeito mais rápido
                barraTopo.classList.add('rolada');
            } else {
                barraTopo.classList.remove('rolada');
            }
        });
    }

    // Rolagem suave para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(ancora => {
        ancora.addEventListener('click', function (evento) {
            const idAlvo = this.getAttribute('href');
            if (idAlvo === "#") { // Evita erro se for só "#"
                evento.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            const elementoAlvo = document.querySelector(idAlvo);
            if (elementoAlvo) {
                evento.preventDefault();
                let alturaHeader = 0;
                if (barraTopo && getComputedStyle(barraTopo).position === 'fixed') {
                    alturaHeader = barraTopo.offsetHeight;
                }
                
                const posicaoElemento = elementoAlvo.getBoundingClientRect().top + window.pageYOffset;
                const posicaoFinal = posicaoElemento - alturaHeader;

                window.scrollTo({
                    top: posicaoFinal,
                    behavior: 'smooth'
                });

                // Fecha o menu mobile se estiver aberto após clicar em um link
                if (navegacao && navegacao.classList.contains('ativa')) {
                    navegacao.classList.remove('ativa');
                    barraTopo.classList.remove('menu-aberto');
                    alternadorMenu.innerHTML = '☰';
                    alternadorMenu.setAttribute('aria-expanded', 'false');
                    alternadorMenu.setAttribute('aria-label', 'Abrir menu');
                }
            }
        });
    });

    // Atualizar ano atual no rodapé
    const elementoAno = document.getElementById('ano-atual');
    if (elementoAno) {
        elementoAno.textContent = new Date().getFullYear();
    }

    // Scroll Reveal para animação de entrada
    const elementosParaAnimar = document.querySelectorAll('.elemento-animar');

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach((entry) => { 
            if (entry.isIntersecting) {
                let parentIsListOrGrid = entry.target.parentElement.classList.contains('lista-publico-alvo') ||
                                         entry.target.parentElement.classList.contains('grade-recursos') ||
                                         entry.target.parentElement.classList.contains('grade-beneficios') ||
                                         entry.target.parentElement.classList.contains('pontos-confianca');

                if (parentIsListOrGrid) {
                    let itemIndex = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.setProperty('--item-idx', itemIndex); 
                }
                
                entry.target.classList.add('animar-entrada-visivel');
                observerInstance.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }); 

    elementosParaAnimar.forEach(el => {
        observer.observe(el);
    });

    console.log("Script The Future Fit: Funcionalidades de UI aprimoradas e animações ativas.");
});