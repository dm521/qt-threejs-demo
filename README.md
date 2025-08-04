# Three.js 动画演示项目

这是一个使用 Three.js 创建的3D动画演示项目，展示了多种动画效果和交互功能。

## 功能特性

- 🎨 多种动画效果：旋转、波浪、弹跳
- 🎮 交互控制：鼠标拖拽旋转、滚轮缩放
- ✨ 粒子效果：彩色粒子系统
- 🌈 动态颜色变化
- 💡 专业灯光系统（基于JSON配置）
- 🏠 室内场景支持（GLB模型加载）
- 📱 响应式设计
- 🎭 电影级渲染效果

## 安装和运行

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 使用说明

1. **视角控制**
   - 鼠标左键拖拽：旋转视角
   - 鼠标滚轮：缩放
   - 右键拖拽：平移

2. **动画切换**
   - 点击"旋转动画"按钮：立方体持续旋转
   - 点击"波浪动画"按钮：立方体做波浪运动
   - 点击"弹跳动画"按钮：立方体弹跳效果

3. **重置功能**
   - 点击"重置视角"按钮：恢复初始视角

## 技术栈

- **Three.js**: 3D图形库
- **GLTFLoader**: GLB/GLTF模型加载器
- **DRACOLoader**: 几何体压缩解码器
- **Vite**: 构建工具
- **JavaScript ES6+**: 现代JavaScript语法

## 灯光配置

项目支持从JSON文件加载专业灯光配置，包括：
- 点光源位置、颜色、强度
- 阴影相机设置
- 衰减参数

## 模型支持

- 支持GLB/GLTF格式的3D模型
- DRACO几何体压缩支持（减少文件大小）
- 自动材质优化和阴影设置
- 占位符模型（当GLB文件不可用时）

## 项目结构

```
threejs-animation-demo/
├── index.html              # 主HTML文件
├── package.json            # 项目配置
├── vite.config.js          # Vite配置
├── background.glb          # 背景场景模型（需要您提供）
├── src/
│   ├── main.js             # 主JavaScript文件
│   ├── lightLoader.js      # 灯光配置加载器
│   └── modelLoader.js      # GLB模型加载器
├── models/
│   └── README.md           # 模型目录说明
└── README.md               # 项目说明
```

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 许可证

MIT License 