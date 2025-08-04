import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createLightsFromConfig, createAmbientLight } from './lightLoader.js';
import { ModelLoader } from './modelLoader.js';

// 全局变量
let scene, camera, renderer, controls;
let modelLoader;
let backgroundModel;
let characterModel;

// 初始化场景
async function init() {
    // 创建场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // 纯黑背景，让模型更突出
    
    // 创建相机
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(2, 0, 7); // 调整相机位置，向右偏移以更好地展示壁炉
    
    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3; // 增加曝光度，让数字人更亮
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    document.getElementById('container').appendChild(renderer.domElement);
    
    // 创建控制器
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false; // 禁用平移
    controls.minDistance = 2; // 最小距离，允许更近的缩放
    controls.maxDistance = 12; // 最大距离
    
    // 初始化模型加载器
    modelLoader = new ModelLoader();
    
    // 加载背景模型
    await loadBackgroundModel();
    
    // 加载数字人模型
    await loadCharacterModel();
    
    // 添加光源（使用JSON配置的灯光）
    addLightsFromConfig();
    
    // 开始渲染循环
    animate();
    
    // 监听窗口大小变化
    window.addEventListener('resize', onWindowResize);
}

// 加载背景模型
async function loadBackgroundModel() {
    try {
        // 尝试加载根目录下的GLB模型
        backgroundModel = await modelLoader.loadGLBModel('/background.glb');
        
            // 调整模型以适应屏幕
    adjustModelToFit(backgroundModel);
    
    // 确保背景模型能够接收阴影
    backgroundModel.traverse((child) => {
        if (child.isMesh) {
            child.receiveShadow = true;
        }
    });
    
    scene.add(backgroundModel);
        console.log('背景模型加载成功');
    } catch (error) {
        console.warn('GLB模型加载失败，使用占位符模型:', error);
        // 如果GLB加载失败，使用占位符模型
        backgroundModel = modelLoader.createPlaceholderModel();
        adjustModelToFit(backgroundModel);
        scene.add(backgroundModel);
    }
}

// 调整模型以适应屏幕
function adjustModelToFit(model) {
    // 计算模型的包围盒
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    
    // 计算缩放比例，使模型适应屏幕
    const maxDimension = Math.max(size.x, size.y, size.z);
    const scale = 8 / maxDimension; // 增大缩放比例，让模型更大一些
    
    // 应用缩放
    model.scale.setScalar(scale);
    
    // 重新计算包围盒（因为缩放改变了大小）
    box.setFromObject(model);
    box.getCenter(center);
    
    // 将模型居中，稍微向后调整以确保壁炉完全可见
    model.position.sub(center);
    model.position.z += 1; // 向后移动一点，确保壁炉完全显示
    model.position.x -= 1; // 向左移动一点，配合相机向右偏移
    
    console.log('模型调整完成:', {
        originalSize: size,
        scale: scale,
        center: center,
        finalPosition: model.position
    });
}

// 加载数字人模型
async function loadCharacterModel() {
    try {
        // 加载数字人GLB模型
        characterModel = await modelLoader.loadGLBModel('/2D_Girl_Glb_Full.glb');
        
            // 调整数字人模型
    adjustCharacterModel(characterModel);
    
    // 确保数字人能够接收和投射阴影
    characterModel.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    
    scene.add(characterModel);
        console.log('数字人模型加载成功');
    } catch (error) {
        console.warn('数字人模型加载失败:', error);
    }
}

// 调整数字人模型
function adjustCharacterModel(model) {
    // 计算模型的包围盒
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    
    // 计算缩放比例，使数字人大小合适
    const maxDimension = Math.max(size.x, size.y, size.z);
    const scale = 1 / maxDimension; // 调整这个值来控制数字人大小
    
    // 应用缩放
    model.scale.setScalar(scale);
    
    // 重新计算包围盒
    box.setFromObject(model);
    box.getCenter(center);
    
    // 将数字人放置在壁炉前面，更合适的位置
    model.position.sub(center);
    model.position.set(0.6, -2.5, 1.5); // 向右移动1.5个单位，向前移动到1个单位，站在壁炉前面
    
    // 旋转数字人，让她面向壁炉方向
    model.rotation.y = Math.PI / 12; // 旋转90度，面向右侧的壁炉
    
    console.log('数字人模型调整完成:', {
        originalSize: size,
        scale: scale,
        center: center,
        finalPosition: model.position
    });
}

// 添加光源（使用JSON配置）
function addLightsFromConfig() {
    // 环境光
    const ambientLight = createAmbientLight();
    scene.add(ambientLight);
    
    // 从JSON配置创建点光源
    const lights = createLightsFromConfig();
    lights.forEach(light => {
        scene.add(light);
        console.log(`添加灯光: ${light.name} 位置:`, light.position);
    });
}





// 渲染循环
function animate() {
    requestAnimationFrame(animate);
    
    controls.update();
    renderer.render(scene, camera);
}

// 窗口大小变化处理
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}



// 重置相机
window.resetCamera = function() {
    camera.position.set(2, 0, 7);
    controls.reset();
};

// 移动数字人
window.moveCharacter = function(direction) {
    if (!characterModel) return;
    
    const step = 0.5; // 移动步长
    
    switch (direction) {
        case 'forward':
            characterModel.position.z -= step;
            break;
        case 'backward':
            characterModel.position.z += step;
            break;
        case 'left':
            characterModel.position.x -= step;
            break;
        case 'right':
            characterModel.position.x += step;
            break;
    }
    
    console.log(`数字人移动到:`, characterModel.position);
};

// 启动应用
init(); 