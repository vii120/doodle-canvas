# Doodle Canvas 塗鴉畫布

![home](https://i.imgur.com/m1bp3Eo.png)

## Demo

https://vii120.github.io/doodle-canvas/

## Intro

使用 canvas 製作的塗鴉網站，且可儲存畫好的圖片

樣式參考了Yahoo!奇摩即時通的Doodle聊天情境

### Drawing Tools

* 顏色（color）：共有 13 種顏色可選擇，預設為黑色
* 粗細（size）：共有 3 種粗細可選擇，預設為最細

### Functions

* Erase Pages：清除畫布
* Save Canvas：將畫布儲存為png檔，圖片的背景為透明色

### On Mobile

因為希望保持畫布的空間，故設定了畫布最小寬度為 500px，樣式也有所調整

![mobile](https://i.imgur.com/w1fFr8s.png)


在使用行動裝置（螢幕寬度<500px）時，會自動縮放螢幕至適當的大小

為避免誤觸放大後無法還原，螢幕會**關閉觸控縮放**功能

並主動在行動裝置開啟網站時跳出**提醒視窗**告知

![alert](https://i.imgur.com/IcPt8Qk.png)

## Language

使用 **Pug** 及 **Sass** 撰寫 HTM 與 CSS

使用 **Gulp** 任務管理工具