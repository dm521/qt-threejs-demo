# QT Spirit App - 数字人社交平台

## 项目简介

QT Spirit App 是一个基于 Flutter 开发的创新数字人社交平台，专注于提供沉浸式的数字人社交体验。通过集成先进的大语言模型技术，为用户提供智能化的社交互动、剧本杀游戏和多人聊天功能。

## 核心功能

### 🤖 数字人社交
- **智能数字人**: 基于大语言模型驱动的数字人角色
- **个性化互动**: 每个数字人都具有独特的性格和对话风格
- **情感连接**: 支持深度对话和情感交流

### 🎭 剧本杀游戏
- **AI驱动剧情**: 大模型自动生成剧本杀故事情节
- **多人协作**: 支持多用户同时参与剧本杀游戏
- **实时互动**: 数字人NPC与玩家实时互动推进剧情
- **角色扮演**: 丰富的角色设定和剧情分支

### 💬 多人聊天
- **群组聊天**: 支持创建和管理聊天群组
- **数字人陪伴**: 数字人可参与群组聊天
- **智能回复**: AI辅助的智能对话建议
- **多媒体支持**: 支持文字、语音、图片等多种消息类型

## 技术架构

### 前端技术栈
- **Flutter**: 跨平台移动应用开发框架
- **Dart**: 编程语言
- **状态管理**: Provider/Riverpod
- **UI组件**: Material Design 3.0

### 后端技术栈
- **大语言模型**: 集成多种AI模型
- **实时通信**: WebSocket/WebRTC
- **数据存储**: 云端数据库
- **用户认证**: 安全的身份验证系统

## 项目结构

```
qt-spirit-app/
├── lib/                          # 应用源码
│   ├── main.dart                 # 应用入口
│   ├── features/                 # 功能模块
│   │   ├── auth/                 # 用户认证
│   │   ├── glb_test/             # 3D模型测试
│   │   ├── home/                 # 主页
│   │   ├── main/                 # 主导航
│   │   └── threejs_viewer/       # Three.js 3D查看器
│   └── shared/                   # 共享组件
│       └── themes/               # 主题配置
├── assets/                       # 静态资源
│   ├── models/                   # 3D模型文件
│   ├── html/                     # HTML资源文件
│   └── icons/                    # 应用图标
├── scripts/                      # 脚本工具
├── docs/                         # 文档
├── test/                         # 测试文件
├── android/                      # Android平台配置
├── ios/                          # iOS平台配置
├── web/                          # Web平台配置
└── pubspec.yaml                  # 依赖配置
```

## 支持平台

- 📱 **iOS**: iOS 12.0 或更高版本
- 🤖 **Android**: Android 5.0 (API 21) 或更高版本  
- 🌐 **Web**: 现代浏览器 (Chrome, Safari, Firefox, Edge)

## 开发环境要求

- **Flutter SDK**: 3.8.1 或更高版本
- **Dart SDK**: 3.2.0 或更高版本
- **Android Studio**: 2023.1.1 或更高版本
- **Xcode**: 15.0 或更高版本 (仅iOS开发需要)
- **Web服务器**: 用于Web平台调试

## 安装和运行

### 1. 克隆项目
```bash
git clone https://github.com/your-username/qt-spirit-app.git
cd qt-spirit-app
```

### 2. 安装依赖
```bash
flutter pub get
```

### 3. 配置环境
```bash
# 复制环境配置文件
cp .env.example .env
# 编辑 .env 文件，配置必要的API密钥和服务地址
```

### 4. 运行项目
```bash
# 运行在Android设备/模拟器上
flutter run

# 运行在iOS设备/模拟器上
flutter run -d ios

# 运行在Web浏览器上
flutter run -d chrome
```

## 功能特性

### 🎯 用户体验
- **流畅界面**: 现代化的Material Design 3.0界面设计
- **响应式布局**: 适配不同屏幕尺寸和设备
- **离线支持**: 部分功能支持离线使用
- **多语言**: 支持中英文切换

### 🔒 安全隐私
- **数据加密**: 端到端加密保护用户隐私
- **身份验证**: 多重身份验证机制
- **内容审核**: AI辅助的内容安全审核
- **隐私保护**: 严格的用户数据保护政策

### 🚀 性能优化
- **快速启动**: 优化的应用启动时间
- **内存管理**: 高效的内存使用和垃圾回收
- **网络优化**: 智能的网络请求和缓存策略
- **电池优化**: 低功耗设计

## 开发指南

### 代码规范
- 遵循 Dart 官方代码规范
- 使用 `flutter_lints` 进行代码检查
- 提交前运行 `flutter analyze` 和 `flutter test`

### 提交规范
```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建过程或辅助工具的变动
```

### 测试
```bash
# 运行单元测试
flutter test

# 运行集成测试
flutter test integration_test/

# 生成测试覆盖率报告
flutter test --coverage
```

## 部署

### Android
```bash
# 构建APK
flutter build apk --release

# 构建App Bundle
flutter build appbundle --release
```

### iOS
```bash
# 构建iOS应用
flutter build ios --release
```

### Web
```bash
# 构建Web应用
flutter build web --release
```

## 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系我们

- **项目主页**: [GitHub Repository](https://github.com/your-username/qt-spirit-app)
- **问题反馈**: [Issues](https://github.com/your-username/qt-spirit-app/issues)
- **邮箱**: your-email@example.com

## 更新日志

### v1.0.0 (计划中)
- 初始版本发布
- 基础数字人社交功能
- 剧本杀游戏框架
- 多人聊天系统

---


**QT Spirit App** - 让数字世界更有温度 🌟 
