---
sidebar: auto
---


# 開發者文件

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-darkcyan.svg)](http://commitizen.github.io/cz-cli/)
[![Build Status](https://travis-ci.org/momocow/tukiyomi.svg?branch=deploy)](https://travis-ci.org/momocow/tukiyomi)
[![GitHub](https://img.shields.io/github/license/momocow/tukiyomi.svg)](https://github.com/momocow/tukiyomi/blob/master/LICENSE)
[![Github All Releases](https://img.shields.io/github/downloads/momocow/tukiyomi/total.svg)](https://github.com/momocow/tukiyomi/releases/latest)

## 慣例
### 語意化版本 2.0.0
首次釋出 `v1.0.0` 以後的版本號更新, 將遵循[語意化版本2.0.0](https://semver.org)。

`v0.x.x` 為**早期開發階段**之版本號，不完全支持語意化版本的規則。

### 語意化 Git Commit
本專案自 `v0.3.0` 開始, 使用了 [Commitizen](https://github.com/commitizen/cz-cli) 作為語意化 Git commit 格式化的工具。

使用 npm 腳本 `npm run commit` 取代 `git commit` 。

#### 格式
> 參考自 [Karma- Git Commit Msg](http://karma-runner.github.io/0.10/dev/git-commit-msg.html)

```
<種類>(<範圍>): <主旨>

<描述>

<頁尾>
```

#### 種類
```
  feat:     新功能
  fix:      錯誤修正
  docs:     文件撰寫
  style:    原始碼格式調整
  refactor: 結構重構 (非錯誤修正，也未新增新功能)
  perf:     效能提升
  test:     新增或修正測試
  build:    建置流程相關 (NPM 腳本，Electron-Webpack 配置，Electron-Builder 配置)
  ci:       CI 流程相關 (.travis.yml)
  chore:    雜項 (沒有更動到原始碼或測試)
  revert:   還原到前一次 commit
```

#### 範圍
```
  main:     主程序
  renderer: 渲染程序
```

## 常用腳本任務
- `npm run compile`

  Electron-Webpack 打包程式碼, 依照 `/src` 目錄下兩個起始點 (`/src/main` 和 `/src/renderer`), 分別生成在 `/dist/main` 和 `/dist/renderer` 目錄下。

- `npm run build [-- [--win] [--linux]]`

  Electron-Builder 打包程式碼, 生成壓縮檔 (`.7z`) 及指定系統的安裝包在 `/dist` 目錄下。

  未指定系統，則會依照執行此任務的機器環境設置。

- `npm run release [-- [--win] [--linux]]`

  依序執行 `npm run compile` 和 `npm run build` 。