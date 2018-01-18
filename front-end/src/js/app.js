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
    this.root = document.querySelector("#app");
    this.store = action;
    this.section = {};
    this.el = null;
    this.data = null;
    this.consumeData();


  }


  consumeData() {
    loadData().subscribe(
      response => {
        this.data = response;

        this.deepLinkChecker();

        this.store
            .distinctUntilChanged()
            .subscribe( (state) => {
              if (state.type === "UPDATE_SECTION") {
                this.onSectionChanged(state.payload)
              }
            })
      },
      error => {
        console.error(error);
      }
    );
  }

  onSectionChanged(state) {
   // if (this.section )

    if (this.section.id === state.id) return;
    else this.section = state;

    this.el.innerHTML = "";
    let component = new Component(state);
    this.el.innerHTML += component.el;
    navigate(state)

   }

  deepLinkChecker() {
    if (window.location.hash) {
      const url = window.location.hash;
      const urls = url.substring(url.indexOf('#'))
                    .replace("#", "")
                    .split("/")
                    .filter(it => it.trim() != "");
      if (urls.length > 0) {
        // TODO : To refactor repetitive
        this.render();

      }
    }else {
      // TODO : To refactor repetitive
      this.continents = this.data.sections[0].id || "";
      this.render();

    }
  }

  animateIn() {
    TweenMax.to(this.el, 0.5, {
      opacity: 1  ,
      onComplete: ()=>{
        this.render();
      }
    });
  }



  render() {

    this.header = new Header(this.data.sections);
    this.root.innerHTML += this.header.el;

    this.el = document.createElement("div");
    this.el.setAttribute("class", "contentWrapper");
    this.root.appendChild(this.el);

    // this.data.ui.forEach( ui  => {
    //   console.log(ui)
    //   let component = new Component(ui);
    //   this.el.innerHTML += component.el;
    // });


    setTimeout(()=>{
      this.header.mounted();
    },1000);
  }

  remove() {
  }
}

export default App;
