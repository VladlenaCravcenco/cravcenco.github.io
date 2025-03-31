// ===== 1. Настройка Three.js =====
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('threejs-bg').appendChild(renderer.domElement);

// Создаем 3D-объект (например, тор)
const geometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
const material = new THREE.MeshPhongMaterial({ 
    color: 0x00a8ff,
    wireframe: true,
    shininess: 50
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Добавляем свет
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

camera.position.z = 5;

// ===== 2. Вращение при скролле =====
let scrollY = 0;
let targetRotation = 0;

// Захватываем скролл
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    // Меняем targetRotation в зависимости от скролла
    targetRotation = scrollY * 0.001;
});

// Анимация: плавное вращение к targetRotation
function animate() {
    requestAnimationFrame(animate);
    
    // Плавное приближение к targetRotation
    torus.rotation.y += (targetRotation - torus.rotation.y) * 0.05;
    
    renderer.render(scene, camera);
}
animate();

// Ресайз
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ===== 3. Ваши скрипты (оставляем без изменений) =====
// ... (ваш код с IntersectionObserver, кнопками, модалками)
// ===== Модальное окно =====
document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector('.project-details');
        const title = button.getAttribute('data-title');
        const description = button.getAttribute('data-description');
        const images = JSON.parse(button.getAttribute('data-images') || '[]');
        const video = button.getAttribute('data-video') || '';
        const social = JSON.parse(button.getAttribute('data-social') || {};

        // Заполняем модалку данными
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-description').textContent = description;

        // Галерея изображений
        const gallery = document.getElementById('modal-gallery');
        gallery.innerHTML = images.map(img => 
            `<img src="${img}" alt="${title}">`
        ).join('');

        // Видео (если есть)
        const videoContainer = document.getElementById('modal-video');
        videoContainer.innerHTML = video ? 
            `<iframe src="${video}" allowfullscreen></iframe>` : 
            '';

        // Соцсети (иконки Font Awesome)
        const socialLinks = document.getElementById('modal-social');
        socialLinks.innerHTML = Object.entries(social)
            .map(([platform, link]) => 
                `<a href="${link}" target="_blank"><i class="fab fa-${platform}"></i></a>`
            ).join('');

        // Показываем модалку
        modal.classList.add('active');
    });
});

// Закрытие модалки
document.querySelectorAll('.close-details').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.project-details').classList.remove('active');
    });
});

// Закрытие при клике вне модалки
document.querySelector('.project-details').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        e.currentTarget.classList.remove('active');
    }
});
