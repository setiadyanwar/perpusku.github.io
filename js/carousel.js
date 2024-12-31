let currentIndex = 0;

// Fungsi untuk memindahkan slide
function moveSlide(direction) {
    const contents = document.querySelectorAll('.carousel-content .content');
    const totalSlides = contents.length;

    // Hilangkan class "active" dari slide saat ini
    contents[currentIndex].classList.remove('active');

    // Perbarui indeks slide
    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;

    // Tambahkan class "active" ke slide berikutnya
    contents[currentIndex].classList.add('active');

    // Geser carousel menggunakan transform
    const carouselContent = document.querySelector('.carousel-content');
    carouselContent.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Tambahkan event listener ke tombol navigasi
document.querySelector('.prev').addEventListener('click', () => moveSlide(-1));
document.querySelector('.next').addEventListener('click', () => moveSlide(1));
