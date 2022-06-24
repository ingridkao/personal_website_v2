---
title: 'personal website v2'
disqus: hackmd
---
# personal_website_v2
[Website](https://ingridkao.github.io/personal_website_v2/)

![Version](https://img.shields.io/github/package-json/v/ingridkao/personal_website_v2)
![Commit activity](https://img.shields.io/github/commit-activity/m/ingridkao/personal_website_v2?style=plastic)

# Table of Contents
* [Site Map](#site-map)
* [踩雷紀錄](#踩雷紀錄)
   * [Nuxt toggle dark mode](#nuxt-toggle-dark-mode)
   * [@tailwindcss/typography + @tailwindcss/color-mode](#tailwindcsstypography--tailwindcsscolor-mode)
* [Tool](#tool)
   * [1. TOC](#1-toc)


# Site Map
目前規劃的網站地圖，但現在完成度還極低...

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


# 踩雷紀錄
在這邊紀錄一些建置過程中花比較多時間的問題：

## Nuxt toggle dark mode
這個踩了快六小時快吐血氣死，用了所有官方範例都不行切換，一直找不到`this.$color-mode`!!

直到翻到一個github範例，發現他的`@nuxtjs/color-mode`版本和官方不大一樣，clone下來後把nuxt等的版本都用和專案一樣，發現就是`@nuxtjs/color-mode`版本問題!!

最大的問題就是2.x以後的`@nuxtjs/color-mode`不會在`.nuxt`目錄下建立`color-mode`，退到**v1.1.1**就會建立，測試後也不用寫全域nuxt去切換，裡面已補localStorage。

另外記得加import tailwindcss，不然build出來的版本沒有tailwindcss，可以參考`assets/css/tailwind.css`

## @tailwindcss/typography + @tailwindcss/color-mode
因為安裝`@nuxt/content`後想要順利使用`@tailwindcss/typography`來減少開發時間，但tailwindcss社群變動真的太大了，文件要看清楚，可以的話找別的案例來做應該會比較不會採太多坑。
> 參考[這個案例](https://github.com/kissu/nuxt-tailwind-typography-darkmode-boilerplate)

碰到的問題是，安裝typography後之前的dark mode就不能使用了，Debug後猜測應該是他的class suffix問題，切換的時候呈現`dark-mode`只要改成`dark`就可以使用，查了一下在`nuxt.config.js`中加入下面這一段就可以正常運作
```bash
...
  colorMode: {
    classSuffix: '',
  },
...
```
Nuxt2.x只能用`@nuxtjs/color-mode`2.X的版本，這時升級到2.1.1(最後一個修正版)也正常運作，之前的問題1根本不是問題...眼神死...



# Tool
## 1. TOC
> 讓github支援TOC(Table of Contents)
> 使用[ekalinin/github-markdown-toc](https://github.com/ekalinin/github-markdown-toc)

紀錄一下使用方法
1. 使用`ekalinin/github-markdown-toc`的安裝方式，在專案父層執行會產生一個資料夾`gh-md-toc`
    資料夾如下：
    └─ <Project>
    └─ <gh-md-toc>
2. 在父層下指令，意思大概是透過gh-md-toc來抓出專案README.md裡的title來製作TOC
    ```bash
    ./gh-md-toc personal_website_v2/README.md
    ```
3. 下完指令會出現抓出來的TOC，把他再貼到README.md就好了

tags: `Vue` `Nuxt`
