---
title: 'personal website v2'
disqus: hackmd
---
# personal_website_v2
[DEMO](https://ingridkao.github.io/personal_website_v2/)

![Version](https://img.shields.io/github/package-json/v/ingridkao/personal_website_v2)
![Commit activity](https://img.shields.io/github/commit-activity/m/ingridkao/personal_website_v2?style=plastic)

## Table of Contents

[TOC]

## Site Map

``` bash
ingridkao
│   resume
│   contact
│
└───投資理財 | Investment
│   │   資產配置:PieChart
│   │   操作記錄
│   │
│   └───公司研究 | Research
│       │   MMM.txt
│       │   APPLE.txt
│       │   ...
│
└───Coding | F2E
│   │   List
│   │
│   └───Vue踩雷紀錄
│   |   |   Basic.txt
│   |   |   i18n.txt
│   |   |   Nuxt.txt
│   |   |   ...
│   |
│   └───部署筆記
│   |   |   Docker.txt
│   |   |   GCP.txt
│   |   |   SSL.txt
│   |   |   ...
│   |
│   └───SideProject
│   |   |   Taxi.txt
│   |   |   Mapbox.txt
│   |   |   ...
│   |
│   └───工具
│       |   ...
│
└───旅行 | Travel
│   │   Map&List
│   │
│   └───台灣
│   |   |   機車環西半部.txt
│   |   |   綠島.txt
│   |   |   花東.txt
│   |   |   ...
│   |
│   └───日本
│       |   大地藝術季.txt
│       |   瀨戶內海.txt
│       |   北海道.txt
│       |   ...
│
└───日常 | Commonplace
    │   List
    │
    └───閱讀摘要
    |   |   機車環西半部.txt
    |   |   綠島.txt
    |   |   ...
    |
    └───小記
        |   慢慢美.txt
        |   按摩地圖.txt
        |   轉職紀錄.txt
        |   ...
```


## 大踩雷紀錄

### 1. Nuxt toggle dark mode
這個踩了快六小時快吐血氣死，用了所有官方範例都不行切換，一直找不到`this.$color-mode`!!

直到翻到一個github範例，發現他的`@nuxtjs/color-mode`版本和官方不大一樣，clone下來後把nuxt等的版本都用和專案一樣，發現就是`@nuxtjs/color-mode`版本問題!!

最大的問題就是2.x以後的`@nuxtjs/color-mode`不會在`.nuxt`目錄下建立`color-mode`，退到**v1.1.1**就會建立，測試後也不用寫全域nuxt去切換，裡面已補localStorage。

另外記得加import tailwindcss，不然build出來的版本沒有tailwindcss，可以參考`assets/css/tailwind.css`



## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
###### tags: `Vue` `Nuxt`
