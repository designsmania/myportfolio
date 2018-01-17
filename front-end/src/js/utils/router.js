import { Tracking } from "./tracking";

export function navigate(obj) {
   if (obj === null) return;

   const url = obj.continent + "/" + obj.id;


   if (window.history && window.history.pushState) {
      window.history.pushState("", obj.title, "#/" + url);
   }else {
      window.location.hash = '#!' + url;
   }
    Tracking.logPageView(url);

  //Tracking.logPageView(obj.continent + "/" + obj.url , "/" + url, obj.title);
}