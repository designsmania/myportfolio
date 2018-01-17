import "./sass/main.scss";
import App from "./js/app";

if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
   onReady();
 } else {
   document.addEventListener('DOMContentLoaded', onReady.bind(this));
 }

function onReady(){
   const app = new App();
 }
