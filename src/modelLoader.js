import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export class ModelLoader {
    constructor() {
        this.loader = new GLTFLoader();
        this.loadingManager = new THREE.LoadingManager();
        this.setupLoadingManager();
        this.setupDRACOLoader();
    }
    
    setupLoadingManager() {
        this.loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
            console.log(`开始加载: ${url} (${itemsLoaded}/${itemsTotal})`);
        };
        
        this.loadingManager.onLoad = () => {
            console.log('所有资源加载完成');
        };
        
        this.loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
            console.log(`加载进度: ${url} (${itemsLoaded}/${itemsTotal})`);
        };
        
        this.loadingManager.onError = (url) => {
            console.error(`加载失败: ${url}`);
        };
        
        this.loader.manager = this.loadingManager;
    }
    
    setupDRACOLoader() {
        // 创建DRACO加载器
        const dracoLoader = new DRACOLoader();
        
        // 设置DRACO解码器路径（从CDN加载）
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
        
        // 将DRACO加载器设置到GLTF加载器中
        this.loader.setDRACOLoader(dracoLoader);
        
        console.log('DRACO加载器已配置');
    }
    
    loadGLBModel(url) {
        return new Promise((resolve, reject) => {
            this.loader.load(
                url,
                (gltf) => {
                    console.log('GLB模型加载成功:', gltf);
                    
                    // 处理模型
                    const model = this.processModel(gltf);
                    resolve(model);
                },
                (progress) => {
                    console.log('加载进度:', (progress.loaded / progress.total * 100) + '%');
                },
                (error) => {
                    console.error('GLB模型加载失败:', error);
                    reject(error);
                }
            );
        });
    }
    
    processModel(gltf) {
        const model = gltf.scene;
        
        // 遍历模型中的所有对象
        model.traverse((child) => {
            if (child.isMesh) {
                // 启用阴影
                child.castShadow = true;
                child.receiveShadow = true;
                
                // 优化材质
                if (child.material) {
                    // 确保材质支持阴影
                    if (child.material.map) {
                        child.material.map.anisotropy = 16;
                    }
                    
                    // 如果是透明材质，确保正确设置
                    if (child.material.transparent) {
                        child.material.alphaTest = 0.1;
                        child.material.side = THREE.DoubleSide;
                    }
                }
            }
        });
        
        return model;
    }
    
    // 创建占位符模型（当GLB文件不可用时）
    createPlaceholderModel() {
        const group = new THREE.Group();
        
        // 创建房间的基本结构
        const roomGeometry = new THREE.BoxGeometry(10, 6, 8);
        const roomMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xf5f5dc,
            transparent: true,
            opacity: 0.1,
            side: THREE.BackSide
        });
        const room = new THREE.Mesh(roomGeometry, roomMaterial);
        group.add(room);
        
        // 创建地板
        const floorGeometry = new THREE.PlaneGeometry(10, 8);
        const floorMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x8b7355,
            side: THREE.DoubleSide
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -3;
        floor.receiveShadow = true;
        group.add(floor);
        
        // 创建一些装饰物
        this.createDecorations(group);
        
        return group;
    }
    
    createDecorations(group) {
        // 创建书架
        const bookshelfGeometry = new THREE.BoxGeometry(2, 4, 0.3);
        const bookshelfMaterial = new THREE.MeshLambertMaterial({ color: 0x4a4a4a });
        const bookshelf = new THREE.Mesh(bookshelfGeometry, bookshelfMaterial);
        bookshelf.position.set(3, 0, -3);
        bookshelf.castShadow = true;
        bookshelf.receiveShadow = true;
        group.add(bookshelf);
        
        // 创建装饰品
        const vaseGeometry = new THREE.CylinderGeometry(0.2, 0.3, 0.8, 8);
        const vaseMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
        const vase = new THREE.Mesh(vaseGeometry, vaseMaterial);
        vase.position.set(-2, -1, -2);
        vase.castShadow = true;
        group.add(vase);
        
        // 创建植物
        const plantGeometry = new THREE.SphereGeometry(0.5, 8, 6);
        const plantMaterial = new THREE.MeshLambertMaterial({ color: 0x228b22 });
        const plant = new THREE.Mesh(plantGeometry, plantMaterial);
        plant.position.set(-2, -0.5, -2);
        plant.castShadow = true;
        group.add(plant);
    }
} 