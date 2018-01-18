import { Tracking } from "./tracking";

export function navigate(obj) {
   if (obj === null) return;

   let url = "";
   if (obj.type && obj.type === "project") {
    url = window.location.hash.substr(1).replace("/", "") + "/" + obj.id;
   }else {
    url =  obj.id;

   }


   if (window.history && window.history.pushState) {
      window.history.pushState("", obj.title, "#/" + url);
   }else {
      window.location.hash = '#!' + url;
   }
    Tracking.logPageView(url);

  //Tracking.logPageView(obj.continent + "/" + obj.url , "/" + url, obj.title);
}
