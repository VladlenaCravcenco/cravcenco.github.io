// Анимация при скролле
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

document.querySelectorAll('.bento-item').forEach((el) => {
    observer.observe(el);
});

// Эффект наведения на кнопки
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        btn.style.setProperty('--x', `${x}px`);
        btn.style.setProperty('--y', `${y}px`);
    });
});

// Анимация для 3D-карточек
document.querySelectorAll('.blender-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Открытие модального окна
document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector('.project-details');
        const title = button.getAttribute('data-title');
        const description = button.getAttribute('data-description');
        const images = JSON.parse(button.getAttribute('data-images'));
        const video = button.getAttribute('data-video');
        const social = JSON.parse(button.getAttribute('data-social'));

        // Заполняем модальное окно данными
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-description').textContent = description;

        // Галерея изображений
        const gallery = document.getElementById('modal-gallery');
        gallery.innerHTML = images.map(img => `<img src="${img}" alt="${title}">`).join('');

        // Видео
        const videoContainer = document.getElementById('modal-video');
        videoContainer.innerHTML = `<iframe src="${video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

        // Социальные сети
        const socialLinks = document.getElementById('modal-social');
        socialLinks.innerHTML = Object.entries(social)
            .map(([platform, link]) => `<a href="${link}" target="_blank"><i class="fab fa-${platform}"></i></a>`)
            .join('');

        // Показываем модальное окно
        modal.classList.add('active');
    });
});

// Закрытие модального окна
document.querySelectorAll('.close-details').forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.project-details');
        modal.classList.remove('active');
    });
});

// Закрытие при клике вне блока
document.querySelector('.project-details').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        e.currentTarget.classList.remove('active');
    }
});