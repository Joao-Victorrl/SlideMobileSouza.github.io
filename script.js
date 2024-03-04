document.addEventListener("DOMContentLoaded", function() {
  let currentSlide = 0;
  let autoSlideInterval; // Variável para armazenar o intervalo da troca automática de slides
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  function showSlide(index) {
      slides.forEach((slide, i) => {
          slide.style.display = i === index ? 'block' : 'none';
      });
      // Se o slide atual for o último e for um vídeo, reproduza-o
      if (index === totalSlides - 1 && slides[index].querySelector('video')) {
          const video = slides[index].querySelector('video');
          video.play();
          clearInterval(autoSlideInterval); // Pausa o carrossel enquanto o vídeo está sendo reproduzido
          video.addEventListener('ended', function() {
              autoSlideInterval = setInterval(nextSlide, 5000); // Retoma o carrossel quando o vídeo termina
          });
      }
  }

  function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
  }

  // Adicionando evento de clique a cada botão de navegação manual
  document.querySelectorAll('.manual-btn').forEach((btn, index) => {
      btn.addEventListener('click', function() {
          showSlide(index);
      });
  });

  // Mostra a primeira imagem
  showSlide(currentSlide);

  // Intervalo para trocar de slide a cada 5 segundos (5000ms)
  autoSlideInterval = setInterval(nextSlide, 5000);
});
