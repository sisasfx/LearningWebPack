import Template from './templates/Template.js';
import './styles/main.css' //npm install mini-css-extract-plugin css-loader -D
//Then we import styles on our index.js and delete style.css link from html 
// as we did with script
import './styles/vars.styl'
(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
