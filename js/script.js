document.addEventListener("DOMContentLoaded", () => {
    const images = [
        { src: '20220226_185308_IMG_0243.png', tags: ['sea', 'boat'] },
        { src: '20220226_185328_IMG_0245.png', tags: ['sea', 'boat'] },
        { src: '20220226_185330_IMG_0246.png', tags: ['sea', 'boat'] },
        { src: '20220226_185609_IMG_0248.png', tags: ['sea', 'boat'] },
        { src: '20220226_190555_IMG_0249.png', tags: ['sea', 'boat'] },
        { src: '20220226_190601_IMG_0250.png', tags: ['sea', 'boat', 'sunset'] },
        { src: '20220227_101134_IMG_0252.png', tags: ['house'] },
        { src: '20220227_112923_IMG_0253.png', tags: ['beach'] },
        { src: '20220227_112931_IMG_0254.png', tags: ['beach'] },
        { src: '20220227_112933_IMG_0255.png', tags: ['beach'] },
        { src: '20221030_114944_IMG_1560.png', tags: ['river'] },
        { src: '20221030_115058_IMG_1561.png', tags: ['river'] },
        { src: '20240324_130110_IMG_5575.png', tags: ['beach'] },
        { src: '20240324_130124_IMG_5576.png', tags: ['beach'] },
        { src: '20240324_132943_IMG_5577.png', tags: ['beach'] },
        { src: '20240324_132946_IMG_5578.png', tags: ['beach'] }
    ];

    const galleryContainer = document.querySelector('.gallery-container');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const searchInput = document.getElementById('search');
    const captionContainer = document.getElementById('caption'); // Elemento para el caption

    let currentIndex = 0;

    // Función para cargar la galería
    function loadGallery() {
        galleryContainer.innerHTML = ''; // Limpia la galería antes de cargar
        images.forEach((image, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = `images/${image.src}`;
            imgElement.alt = image.tags.join(', ');
            imgElement.loading = 'lazy';
            imgElement.dataset.tags = image.tags.join(' ');

            // Crear y añadir la etiqueta de ubicación
            const locationTag = document.createElement('div');
            locationTag.className = 'image-location';
            locationTag.textContent = 'República Dominicana';
            imgElement.parentElement?.appendChild(locationTag);

            galleryContainer.appendChild(imgElement);

            // Abrir el lightbox al hacer clic en la imagen
            imgElement.addEventListener('click', () => {
                currentIndex = index;
                openLightbox();
            });

            // Accesibilidad: añadir navegación con teclado
            imgElement.tabIndex = 0;
            imgElement.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    currentIndex = index;
                    openLightbox();
                }
            });
        });
    }

    // Función para abrir el lightbox
    function openLightbox() {
        lightbox.style.display = 'flex';
        updateLightboxContent();
        lightbox.focus();
    }

    // Función para actualizar el contenido del lightbox
    function updateLightboxContent() {
        lightboxImg.src = `images/${images[currentIndex].src}`;
        const fileName = images[currentIndex].src.split('/').pop();
        const tags = images[currentIndex].tags.join(', ');
        captionContainer.innerHTML = `${fileName}: ${tags}`;
    }

    // Función para cerrar el lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Navegación con teclado en el lightbox
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowLeft') prevBtn.click();
            if (e.key === 'ArrowRight') nextBtn.click();
            if (e.key === 'Escape') closeBtn.click();
        }
    });

    // Función para imagen anterior
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        updateLightboxContent();
    });

    // Función para siguiente imagen
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        updateLightboxContent();
    });

    // Filtrar galería por término de búsqueda
    function filterGallery() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredImages = images.filter(image =>
            image.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );

        // Recargar la galería con las imágenes filtradas
        galleryContainer.innerHTML = '';
        filteredImages.forEach((image, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = `images/${image.src}`;
            imgElement.alt = image.tags.join(', ');
            imgElement.loading = 'lazy';
            galleryContainer.appendChild(imgElement);

            imgElement.addEventListener('click', () => {
                currentIndex = index;
                openLightbox();
            });
        });
    }

    searchInput.addEventListener('input', filterGallery);

    loadGallery();
});
