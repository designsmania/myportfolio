import Rx from 'rxjs';
import TweenMax from 'gsap';
import Mustache from 'mustache';

import { actionDispatcher, action, updateSection} from "./actions";
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
        
        this.store
            .distinctUntilChanged()
            .subscribe( (state) => {
              if (state.type === "UPDATE_SECTION") {
                this.onSectionChanged(state.payload)
              }

              if (state.type === "VIEW_PROJECT") {
                
                this.onViewProject(
                  this.data.projects.filter( it => it.id === state.payload)[0]
                );
              }
            })

        this.deepLinkChecker();

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

    this.remove(()=>{
      let component = new Component(state);
      this.el.innerHTML += component.el;
      component.mounted();
      navigate(state);

      TweenMax.to(this.el, 0.3, {opacity: 1, y:0, force3D:true });
    })


   }

   onViewProject(project) {
     let component = new Component(project);
     this.el.innerHTML += component.el;
     component.mounted();
     const projectOverlay = document.querySelector("#project-overlay");
     TweenMax.set(projectOverlay, {opacity:0, y: 50});
     TweenMax.to(projectOverlay, 0.25, {opacity: 1, y:0, force3D:true });
    navigate(project)
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
        updateSection(
          this.data.sections.filter( it => it.id === urls[0])[0]
        )
      }
    }else {
      // TODO : To refactor repetitive
      this.render();
      updateSection(this.data.sections[0])

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
    TweenMax.set(this.el, {opacity:0, y: 50});


    // this.data.ui.forEach( ui  => {
    //   console.log(ui)
    //   let component = new Component(ui);
    //   this.el.innerHTML += component.el;
    // });


    setTimeout(()=>{
      this.header.mounted();

    },500);
  }

  remove(callback) {
    TweenMax.to(this.el, 0.5, {opacity: 0, y:50,force3D:true, onComplete: ()=>{
      this.el.innerHTML = "";

      if (typeof callback === "function") {
        callback();
      }
    }});
  }
}

export default App;
