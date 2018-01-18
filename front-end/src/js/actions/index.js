import Rx from 'rxjs';
import { Tracking } from "../utils/tracking";

export const action = new Rx.Subject();

const actionDispatcher = (func) => (...args) =>  {
   const act = func.call(null, ...args);
   action.next(act);
   return act;
}

export const updateSection = (payload) => {
  action.next({
    type:"UPDATE_SECTION",
    payload
  })
}

export const updateVideo =  (payload) => {
   action.next({
      type: "UPDATE_VIDEO",
      payload
   });
}

 export const updateContinent = (payload) => {
    action.next({
      type: "UPDATE_CONTINENT",
      payload
    })

 }

 export const updateContinentFromPromo = (payload) => {
  action.next({
    type: "UPDATE_CONTINENT_FROM_PROMO",
    payload
  });
}

export const videoEnded = (payload)=> {
  action.next({
    type: "VIDEO_ENDED",
    payload: payload || {}
  })
}
