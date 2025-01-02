let currentIndex = 0;
let autoPlayInterval;
const intervalTime = 3000; 

function moveSlide(direction) {
    const contents = document.querySelectorAll('.carousel-content .content');
    const totalSlides = contents.length;

    contents[currentIndex].classList.remove('active');

    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;

    contents[currentIndex].classList.add('active');

    const carouselContent = document.querySelector('.carousel-content');
    carouselContent.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        moveSlide(1); 
    }, intervalTime);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

startAutoPlay();


document.querySelector('.prev').addEventListener('click', () => {
    stopAutoPlay();  
    moveSlide(-1);
    startAutoPlay(); 
});

document.querySelector('.next').addEventListener('click', () => {
    stopAutoPlay(); 
    moveSlide(1);
    startAutoPlay(); 
});

const carousel = document.querySelector('.carousel');

carousel.addEventListener('mouseenter', stopAutoPlay);  
carousel.addEventListener('mouseleave', startAutoPlay); 
