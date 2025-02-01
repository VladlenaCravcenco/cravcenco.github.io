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

// Открытие деталей проекта
document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        const details = document.getElementById(`project-details-${projectId}`);
        details.classList.add('active');
    });
});

// Закрытие деталей проекта
document.querySelectorAll('.close-details').forEach(button => {
    button.addEventListener('click', () => {
        const details = button.closest('.project-details');
        details.classList.remove('active');
    });
});

// Закрытие при клике вне блока
document.querySelectorAll('.project-details').forEach(details => {
    details.addEventListener('click', (e) => {
        if (e.target === details) {
            details.classList.remove('active');
        }
    });
});