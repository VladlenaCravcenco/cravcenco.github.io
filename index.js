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
