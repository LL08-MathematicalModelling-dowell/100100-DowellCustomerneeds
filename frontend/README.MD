# src

* [assets/](.\src\assets)
  * [2.jpg](.\src\assets\2.jpg)
  * [react.svg](.\src\assets\react.svg)
* [client/](.\src\client)
  * [postClient.js](.\src\client\postClient.js)
  * [status.js](.\src\client\status.js)
* [components/](.\src\components)

classification refactor
  * [permutation/](.\src\components\permutation)
    * [AllBasket.jsx](.\src\components\permutation\AllBasket.jsx)
    * [ClassificationResult.jsx](.\src\components\permutation\ClassificationResult.jsx)
    * [DisplayClassificationResult.jsx](.\src\components\permutation\DisplayClassificationResult.jsx)
    * [FinalizeSelectedItem.jsx](.\src\components\permutation\FinalizeSelectedItem.jsx)
    * [SaveFinalBasketOrder.jsx](.\src\components\permutation\SaveFinalBasketOrder.jsx)
    * [SavePermutation.jsx](.\src\components\permutation\SavePermutation.jsx)
    * [SelectBasket2.jsx](.\src\components\permutation\SelectBasket2.jsx)
    * [SelectItem.jsx](.\src\components\permutation\SelectItem.jsx)
  * [AutoCompleter.jsx](.\src\components\AutoCompleter.jsx)
  * [ComboBox.jsx](.\src\components\ComboBox.jsx)
  * [DataCalculation.jsx](.\src\components\DataCalculation.jsx)
  * [NavBar.jsx](.\src\components\NavBar.jsx)
  * [QuestionsSelection.jsx](.\src\components\QuestionsSelection.jsx)
  * [SpreadSheet.jsx](.\src\components\SpreadSheet.jsx)
* [data/](.\src\data)
  * [classificationData.js](.\src\data\classificationData.js)
* [utils/](.\src\utils)
  * [json/](.\src\utils\json)
    * [allBaskets.json](.\src\utils\json\allBaskets.json)
* [App.css](.\src\App.css)
* [App.jsx](.\src\App.jsx)
* [index.css](.\src\index.css)
* [main.jsx](.\src\main.jsx)

____

**Note**

According new document of [ReactJS](https://react.dev/learn/start-a-new-react-project) they recomended: 

> if you are building a new app or a site fully with React, we recommend using a framework.

That means [nextjs](https://nextjs.org/), it's now full-stack framework.

Though I have to use `react` so I am using [vite](https://vitejs.dev/guide/) to install it as per the [ReactJS](https://react.dev/learn/start-a-new-react-project) documentation
___
## How to use it:
* For the the first time you need to install `vite` globally.

**NPM**
```bash script
npm create vite@latest
```

**yarn**
```bash script
yarn create vite
```
## Run the project
```bash script
git clone -b frontend https://github.com/LL08-MathematicalModelling-dowell/100100-DowellCustomerneeds.git
```
```bash script
cd frontend

npm install
npm run dev
```