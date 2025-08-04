import * as THREE from 'three';

// 专业电影级五点打光系统 - 让数字人更完美
const lightConfigs = [
    {
        "uuid": "c83c02a7-d553-4aa3-a477-4cb6a17f9ec4",
        "type": "PointLight",
        "name": "KeyLight", // 主光（头灯）
        "position": [0.6, 0.4, 0.3], // 数字人前方，更靠近
        "color": 16777215, // 0xFFFFFF - 纯白色，更清晰
        "intensity": 3.0, // 恢复强主光
        "distance": 0,
        "decay": 1.0 // 进一步减小衰减
    },
    {
        "uuid": "a716519d-2ba3-4a4b-8c74-78d0dff76c74",
        "type": "PointLight",
        "name": "FillLight", // 补光（侧灯）
        "position": [-0.6, 0.3, 0.4], // 数字人左侧，更靠近
        "color": 16777215, // 0xFFFFFF - 纯白色补光
        "intensity": 2.5, // 增强补光强度
        "distance": 0,
        "decay": 1.0 // 进一步减小衰减
    },
    {
        "uuid": "0aa5c0f7-4f82-4bba-963a-ed26c152eefd",
        "type": "PointLight",
        "name": "BackLight", // 背光（背灯）
        "position": [0.6, 0.5, 2.5], // 数字人后方，提供轮廓光
        "color": 13661814, // 0xD0A0D6 - 紫色调
        "intensity": 1.2, // 增强背光强度
        "distance": 0,
        "decay": 1.2 // 进一步减小衰减
    },
    // 添加额外的专业灯光
    {
        "uuid": "rim-light-1",
        "type": "PointLight",
        "name": "RimLight", // 轮廓光
        "position": [1.2, 0.3, 0.8], // 数字人右侧，壁炉方向
        "color": 12231073, // 0xBA8BA1 - 暖粉色，呼应壁炉
        "intensity": 1.0, // 适中的轮廓光
        "distance": 0,
        "decay": 1.2
    },
    {
        "uuid": "kicker-light",
        "type": "PointLight",
        "name": "KickerLight", // 踢光
        "position": [0.0, 0.8, 1.0], // 数字人上方，提供顶光
        "color": 16777215, // 0xFFFFFF - 纯白色
        "intensity": 0.8, // 柔和的顶光
        "distance": 0,
        "decay": 1.2
    }
];

export function createLightsFromConfig() {
    const lights = [];
    
    lightConfigs.forEach(config => {
        const light = new THREE.PointLight(
            config.color,
            config.intensity,
            config.distance,
            config.decay
        );
        
        light.position.set(...config.position);
        light.name = config.name;
        light.uuid = config.uuid;
        
        // 启用阴影
        light.castShadow = true;
        
        // 配置阴影相机 - 扩大照射范围
        light.shadow.camera.fov = 120; // 扩大视野角度
        light.shadow.camera.aspect = 1;
        light.shadow.camera.near = 0.1; // 减小近平面
        light.shadow.camera.far = 1000; // 增大远平面
        light.shadow.camera.focus = 5; // 调整焦点距离
        
        // 配置阴影贴图
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
        
        lights.push(light);
    });
    
    return lights;
}

// 创建环境光（模拟室内环境）
export function createAmbientLight() {
    return new THREE.AmbientLight(0x404040, 0.8); // 进一步增强环境光，消除暗部
} 