import Rx from 'rxjs';
import TweenMax from 'gsap';
import Mustache from 'mustache';

import { actionDispatcher, action} from "./actions";
import {loadData, getContinent, getVideo, getVideoIndex } from "./data";
import { navigate }  from "./utils/router";
import { Tracking } from "./utils/tracking";
import  Component  from "./components/component";
import Header from "./components/header";

class App {
  constructor() {
    this.container = document.querySelector("#app");
    this.store = action;
    this.el = null;
    this.data = null;
    this.consumeData();


  }


  consumeData() {
    loadData().subscribe(
      response => {
        console.log(response)
        this.data = response;
       this.build();
      },
      error => {
        console.error(error);
      }
    );
  }


  animateIn() {
    TweenMax.to(this.el, 0.5, {
      opacity: 1  ,
      onComplete: ()=>{
        this.build();
      }
    });
  }



  build() {


    this.render();

  }


  render(callback) {

    this.header = new Header(this.data.sections);
    this.container.innerHTML += this.header.el;

    // this.data.ui.forEach( ui  => {
    //   console.log(ui)
    //   let component = new Component(ui);
    //   this.el.innerHTML += component.el;
    // });




    if (typeof callback === "function") {
      callback();
    }

  }

  remove() {
  }
}

export default App;
