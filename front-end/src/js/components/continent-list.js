import Mustache from 'mustache';
import {updateContinent} from '../actions';
import {devices} from "../utils/devices";
import {Swipe} from "../utils/swipe";
import TweenMax from 'gsap';
import Draggable from 'gsap/Draggable';

class ContinentList {
  constructor(data) {
    this.data = data.map(it => ({id: it.id, title: it.title.replace("<br>", " "), description: it.description, thumb: it.thumb}));

    this.render();
  }
  render() {
    let template = require(`../../templates/continent.list.tmpl.html`);
    this.el = Mustache.render(template, this.data);
  }

  mounted() {

    const continentsWrapper = document.querySelector("#continents");
    let thumbs = document.querySelectorAll("#continents li .thumb_holder");
    thumbs = Array
      .prototype
      .slice
      .call(thumbs, 0);

    thumbs.forEach(it => {
      it.addEventListener("click", this.clickHandler.bind(this), false);
    });

    let infoH3s = document.querySelectorAll("#continents li .info_holder h3");
    infoH3s = Array
    .prototype
    .slice
    .call(infoH3s, 0);

    infoH3s.forEach(it => {
      it.addEventListener("click", this.clickHandler.bind(this), false);

    });

    

    let infoButtons = document.querySelectorAll("#continents li .info_holder .mobile_desc .info_button");
    infoButtons = Array
      .prototype
      .slice
      .call(infoButtons, 0);

    infoButtons.forEach(it => {
      it.addEventListener("click", this.infoClickHandler.bind(this), false);
    });
    let xButtons = document.querySelectorAll("#continents li .info_holder .x_button");

    xButtons = Array
      .prototype
      .slice
      .call(xButtons, 0);
    xButtons.forEach(it => {
      it.addEventListener("click", this.closeOverlay.bind(this), false);
    });

    this.leftControl = document.querySelector("#continents .left_control");
    this.rightControl = document.querySelector("#continents .right_control");

    [this.leftControl, this.rightControl].forEach(it => {
      it.addEventListener("click", this.controlsClickHandler.bind(this), false);
    });

    if (this.data.length > 3) {
      [this.leftControl, this.rightControl].forEach(it => {
        it
          .classList
          .add("show");
      });

      this.resize();

      const currentX = this.videoList.getBoundingClientRect().left;
      if (currentX <= this.maxOffset) {
        this.rightControl.classList.remove("show");
        this.leftControl.classList.add("show");
      }

      if (currentX >= this.minOffset) {
        this.leftControl.classList.remove("show");
        this.rightControl.classList.add("show");
      }

    }

    if (devices.any() || devices.Tablet()) {

      const gridWidth = this.itemWidth;
      let snapPoints = [];

      for (var i = 0; i < this.data.length; i++) {
        snapPoints.push(gridWidth * -i)
      }
      let snapping = false;
      let snapIndex = 0;

      this.draggable = Draggable.create(this.videoList, {
          type:"left",
          edgeResistance:0.65,
          bounds: { minX:this.minOffset - 16  , maxX: this.maxOffset - 32 },
          throwProps:true,
          maxDuration: 1,
          minimumMovement:6,
          force3D:true,
          // resistance: 10000,
          // onDrag: ()=> {
          //   console.log(this.draggable)
          // },
          // onDragEnd:()=> {
          //   snapping= false;
          //   console.log("end x ", this.draggable.endX)
          //   console.log("closest ",this.closest(snapPoints, this.draggable.endX))

          //   TweenMax.to(this.videoList, 0.5, {
          //     css: {
          //       x: this.closest(snapPoints, this.draggable.endX)
          //     },
          //     onComplete: () => {
          //       this.draggable.update();
          //     }
          //   });
          // }
          //         liveSnap: {
          //   x: snapPoints
          // }
          // liveSnap: {
          //   x: (endValue) => {

          //       return Math.round(endValue / gridWidth) * gridWidth;
          //   }
          // }
        })[0];

      }
      // const swipe = new Swipe(this.videoList, direction => {

      //   const currentX = this.videoList.getBoundingClientRect().left;

      //   if (direction === "swipe:left") {

      //     if (currentX <= this.maxOffset) return;

      //     this.scrollRight(this.rightControl)

      //   }

      //   if (direction ==="swipe:right") {

      //     if (currentX >= this.minOffset) return;

      //     this.scrollLeft(this.leftControl)

      //   }

      // });


  }
  closest (array,num) {

            let i=0;
            let minDiff=1000;
            let ans;
            for(i in array){
                let m=Math.abs(num-array[i]);
                if(m<minDiff){
                    minDiff=m;
                    ans=array[i];
                }
            }


            return ans;
  }

  clickHandler(e) {
    let id = e.currentTarget.id;
    let payload = this
      .data
      .filter(it => it.id === id)[0];
    updateContinent(payload);
  }
  infoClickHandler(e) {
    const infoEl = e.currentTarget.nextElementSibling;
    infoEl
      .classList
      .add("show")
  }

  controlsClickHandler(e)
  {
    const target = e.currentTarget;
    const offsetX = this
      .videoList
      .getBoundingClientRect()
      .left;

    if (target.classList.contains("left_control")) {

      if (offsetX >= this.minOffset) return;

      this.scrollLeft(target);

    }


    if (target.classList.contains("right_control")) {

      if (offsetX <= this.maxOffset) return;

      this.scrollRight(target);
    }

  }

  scrollLeft(target) {
    TweenMax.to(this.videoList, 0.5, {
      css: {
        x: `+=${this.itemWidth}px`
      },
      onStart: () => {
        target
          .classList
          .add("disable");
      },
      onComplete: () => {
        const currentX = this.videoList.getBoundingClientRect().left;

        if (currentX >= this.minOffset) {
          target.classList.remove("show");
        }

        if (currentX > this.maxOffset) {
          this.rightControl.classList.add("show");

        }

        target
          .classList
          .remove("disable");
      }
    });
  }

  scrollRight(target) {
    TweenMax.to(this.videoList, 0.5, {
      css: {
        x: `-=${this.itemWidth}px`
      },
      onStart: () => {
        target
          .classList
          .add("disable");
      },
      onComplete: (x) => {
        const currentX = this.videoList.getBoundingClientRect().left;

        if (currentX <= this.maxOffset) {
          target.classList.remove("show");
        }
        if (currentX < this.minOffset) {
          this.leftControl.classList.add("show");
        }


        target
          .classList
          .remove("disable");
      }
    });
  }

  closeOverlay(e) {
    e
      .currentTarget
      .parentElement
      .classList
      .remove("show");
  }

  resize() {

    this.videoList = document.querySelector("#continents .video_list_wrapper .video_list");
    this.itemWidth = document
      .querySelector(".video_list > li")
      .offsetWidth;
    this.videoListWidth = this.itemWidth * this.data.length;

    this.visibleItems = Math.floor(this.videoList.offsetWidth / this.itemWidth);

    this.minOffset = this
      .videoList
      .getBoundingClientRect()
      .left;
    this.maxOffset = this.minOffset - (Math.abs(this.data.length - this.visibleItems) * this.itemWidth);
  }

  remove() {
    
    if(this.draggable !== "undefined" && (devices.any() || devices.Tablet())) {
      this.draggable.kill();
      
    }

    let thumbs = document.querySelectorAll("#continents li .thumb_holder");    
    thumbs = Array
      .prototype
      .slice
      .call(thumbs, 0);
    thumbs.forEach(it => {
      it.removeEventListener("click", this.clickHandler.bind(this), false);
    });

    let infoH3s = document.querySelectorAll("#continents li .info_holder h3");
    infoH3s = Array
    .prototype
    .slice
    .call(infoH3s, 0);
    infoH3s.forEach(it => {
    it.removeEventListener("click", this.clickHandler.bind(this));
  });

    let infoButtons = document.querySelectorAll("#continents li .info_holder .mobile_desc .info_button");
    infoButtons = Array
      .prototype
      .slice
      .call(infoButtons, 0);

    infoButtons.forEach(it => {
      it.removeEventListener("click", this.infoClickHandler.bind(this), false);
    });

    let xButtons = document.querySelectorAll("#continents li .info_holder .x_button");

    xButtons = Array
      .prototype
      .slice
      .call(xButtons, 0);
    xButtons.forEach(it => {
      it.removeEventListener("click", this.closeOverlay.bind(this), false);
    });


  }
}

export default ContinentList;
