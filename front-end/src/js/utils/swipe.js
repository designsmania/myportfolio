import Rx from "rxjs";

export class Swipe {

  constructor(dom, callback) {

    let xDown = null;
    let yDown = null;    

    const touchStart = Rx.Observable.fromEvent(dom, "touchstart");
    touchStart.subscribe( e => {
      xDown = e.touches[0].clientX;
      yDown = e.touches[0].clientY;
    });

    const touchMove = Rx.Observable.fromEvent(dom, "touchmove");
    
    touchMove
    .subscribe(e=> {
      e.stopImmediatePropagation();
      if (!xDown || !yDown) return;

      let xUp = e.touches[0].clientX;
      let yUp = e.touches[0].clientY;
      let xDiff = xDown - xUp;
      let yDiff = yDown - yUp;

      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */
          //  this.observer.onNext("swipe:left");
          callback("swipe:left");
        } else {
            /* right swipe */
          //  this.observer.onNext("swipe:right");
          callback("swipe:right");
        }
      } else {
          if ( yDiff > 0 ) {
              /* up swipe */

         //   console.log("swipe: up");

          } else {
              /* down swipe */
          //  console.log("swipe: down");

          }
      }

      /* reset values */
      xDown = null;
      yDown = null;

    });

  }

}
