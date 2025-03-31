// ===== 1. Three.js 3D-анимация =====
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('threejs-bg').appendChild(renderer.domElement);

// Пример: вращающаяся сфера вместо куба
const geometry = new THREE.SphereGeometry(3, 32, 32);
const material = new THREE.MeshPhongMaterial({ 
    color: 0x00a8ff, 
    wireframe: true,
    shininess: 100 
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Добавим свет для лучшего эффекта
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

camera.position.z = 5;

// Анимация + скролл
function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.005;
    sphere.rotation.y += 0.005;
    renderer.render(scene, camera);
}
animate();

// Реакция на ресайз
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ===== 2. Ваши скрипты (без изменений) =====
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

// Модальное окно (оставляем как есть)
document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', () => {
        // ... ваш код модалки
    });
});
