# 專案說明

以 Vue 3 + Pug + Tailwind CSS + Random User Generator API 開發，模擬可查看使用者資料的平台。  
**佈署網址**: https://radom-user-platform.netlify.app/

## 環境設定
- IDE: 推薦使用 [VSCode](https://code.visualstudio.com/) 搭配 [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)(VSCode extension)。  
- [Node.js](https://nodejs.org/en/download/): version >= 12.2.0，專案建置時使用的版本為 v16.13.1。  
- [Git](https://git-scm.com/downloads)

## 下載專案
1. 開啟終端機(Terminal) cd 到欲存放專案的本機位置  
  例如: `cd C:\Users\Public`
2. 輸入 git clone 指令下載專案  
    ```
    git clone https://github.com/Armogo/random-user-platform-vue3.git
    ```
    
3. 下載 node_modules  
    ```
    cd random-user-platform-vue3 
    npm install
    ```

## 執行專案
1. 使用終端機(Terminal) cd 到專案資料夾
  例如: 
    ```
    cd C:\Users\Public\random-user-platform-vue3
    ```
2. 執行程式
  `npm run dev`
3. 終端機(Terminal)顯示以下訊息時，表示成功
    ```
    > random-user-list@0.0.0 dev
    > vite

    vite v2.9.0 dev server running at:

    > Local: http://localhost:3000/
    > Network: use `--host` to expose

    ready in 496ms.
    ```
4. 開啟瀏覽器，在網址列輸入 http://localhost:3000/

## 結束執行專案
  將視窗切換到終端機(Terminal)，鍵盤同時按下 `ctrl` 以及 `c`

---

## 開發時遇到的困難與處理方式  

### **建置專案環境**
- 閱讀官方文件了解 [Vite](https://vitejs.dev/guide/) 以及如何建立 vue project。

- 閱讀官方文件了解 [Vue3](https://vuejs.org/guide/extras/composition-api-faq.html#what-is-composition-api) 寫法。

- 閱讀官方文件了解 Tailwind CSS 設定步驟 [Install Tailwind CSS with Vue 3 and Vite](https://tailwindcss.com/docs/guides/vite)。

- 閱讀官方文件了解 [Pug](https://pugjs.org/language/attributes.html) 寫法。   

### **Pagination 狀態變化**
因為分頁會受到多個狀態變動影響，在這一塊花了較多時間調整，最後整理出以下關注點:

1. 根據原始設計稿，思考在總頁數較少時如何呈現分頁:

    - 總頁數 < 10 : 1 ~ 9

    - 總頁數 ≥ 10 : 1 ... 4, 5, 6 ... 10

2. 分析造成變動的因素
    - data:  
    頁面初始化時透過 API 拿到的**資料總筆數**，除以**單頁顯示數量**後得到**初始總頁數**。

    - currentPage:  
    **目前所在頁面**，初始值為 1，但會隨著 user 點擊不同頁面而改變數值以及下次載入頁面時的初始值(存放在 local storage)，重新整理頁面後便會套用 local storage 內的值。

    - dataPerPage:  
    **單頁顯示資料數**，初始值為 30，但會隨著 user 切換**單頁顯示資料數**而改變數值以及下次載入頁面時的初始值(存放在 local storage)，重新整理頁面後便會套用 local storage 內的值。  
    另外，當 user 切換**單頁顯示資料數**時，**總頁數**會改變(**總頁數 = 資料總筆數 / 單頁顯示數量**)，這時也應根據新的**總頁數**調整**目前所在頁面**(改變單頁顯示資料數 -> 改變總頁數 -> 改變目前所在頁面)。

    - 簡易情境範例:

      1. currentPage: 1 → 6  
      應變數 pagination: [1, 2, ..., 10] -> [1, ..., 5, 6, 7, ..., 10]

      2. dataPerPage: 10 → 30  
      應變數 currentPage: 2 → 1  
      應變數 pagination: [1, 2, 3, ..., 20] -> [1, 2, ..., 7]


3. 根據第2點整理出的關注點，設定監聽行為，達成目標
    - 監聽 currentPage 變化: 改變 pagination。  
    - 監聽 dataPerPage 變化: 條件允許時，僅改變 currentPage 數值，藉此觸發 currentPage 監聽事件來改變 pagination。
    - 例外狀況: currentPage 值為 1 時，若改變 dataPerPage，新的 currentPage 值仍應為 1，但此時無法觸發 currentPage 監聽事件(需新舊數值不同才會觸發)，造成 pagination 無法正確改變，因此在 dataPerPage 監聽事件針對此狀況增設處理方式，直接改變 pagination。

