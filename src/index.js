import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import Calculator from "./Components/Calculator/Calculator";
// import Slider1 from "./Components/Slider1/Slider1";
import TodoList from "./Components/Todo List/TodoList";

ReactDOM.render(
    <div>

        <TodoList/>
        <App />
        {/*<Calculator/>*/}
        {/*<Slider1 images = {images1} index ={0}/>*/}
        {/*<Slider1 images = {images2} index ={1}/>*/}
    </div>
   , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

