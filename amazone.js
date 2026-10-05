  // Image data - replace with your own image URLs
            const images = [
                { src: 'col1pic.jpg', caption: 'Beautiful Mountain Landscape' },
                { src: 'COL1PIC2.jpg', caption: 'Ocean Sunset View' },
                { src: 'COL1PIC2.jpg', caption: 'Forest Path in Autumn' },
                { src: 'col1pic4.jpg', caption: 'City Skyline at Night' },
                { src: 'col1pic5.jpg', caption: 'Desert Dunes at Sunrise' }
            ];
            
            // DOM elements
        const carousel = document.querySelector('.carousel');
        const controlsContainer = document.querySelector('.carousel-controls');
        const currentSlideEl = document.getElementById('current-slide');
        const totalSlidesEl = document.getElementById('total-slides');
        const playPauseBtn = document.getElementById('play-pause-btn');
        const restartBtn = document.getElementById('restart-btn');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        // Carousel state
        let currentSlide = 0;
        let slideInterval;
        let isPlaying = true;
        const intervalTime = 4000; // Time between slides (4 seconds)
        
        // Initialize carousel
        function initCarousel() {
            // Create slides
            images.forEach((image, index) => {
                const slide = document.createElement('div');
                slide.classList.add('carousel-slide');
                if (index === 0) slide.classList.add('active');
                
                const img = document.createElement('img');
                img.src = image.src;
                img.alt = image.caption;
                
                slide.appendChild(img);
                carousel.appendChild(slide);
            });
            
            // Create dots
            images.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                
                dot.addEventListener('click', () => {
                    goToSlide(index);
                    resetInterval();
                });
                
                controlsContainer.appendChild(dot);
            });

            // Update total slides count
            totalSlidesEl.textContent = images.length;
            
            // Start auto-play
            startInterval();
        }

        // Go to specific slide
        function goToSlide(slideIndex) {
            // Update slide index
            currentSlide = slideIndex;
            
            // Handle wrap-around
            if (currentSlide < 0) currentSlide = images.length - 1;
            if (currentSlide >= images.length) currentSlide = 0;
            
            // Update slides
            const slides = document.querySelectorAll('.carousel-slide');
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentSlide);
            });
            
            // Update dots
            const dots = document.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
            
            // Update current slide counter
            currentSlideEl.textContent = currentSlide + 1;
        }

        // Go to next slide
        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        // Go to previous slide
        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        // Start auto-play interval
        function startInterval() {
            slideInterval = setInterval(nextSlide, intervalTime);
            isPlaying = true;
            playPauseBtn.textContent = 'Pause';
            playPauseBtn.classList.remove('pause');
        }
        
        // Reset interval
        function resetInterval() {
            clearInterval(slideInterval);
            if (isPlaying) startInterval();
        }

        // Toggle play/pause
        function togglePlayPause() {
            if (isPlaying) {
                clearInterval(slideInterval);
                isPlaying = false;
                playPauseBtn.textContent = 'Play';
                playPauseBtn.classList.add('pause');
            } else {
                startInterval();
            }
        }

        // Restart carousel
        function restartCarousel() {
            goToSlide(0);
            resetInterval();
        }
        
        // Event listeners
        playPauseBtn.addEventListener('click', togglePlayPause);
        restartBtn.addEventListener('click', restartCarousel);
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        // Initialize carousel when DOM is fully loaded
        document.addEventListener('DOMContentLoaded', initCarousel);