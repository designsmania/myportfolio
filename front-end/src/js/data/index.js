import Rx from 'rxjs';

let cdnURL = "../";

if (PRODUCTION || STAGING)  {
  cdnURL = CDN;
}

const url = cdnURL +  "/data/app.json";
// const url = "http://localhost:9000/wp-json/wp/v2/shows";
export const loadData = () => {
   return Rx.Observable.create( observer => {
      const req = new XMLHttpRequest();
      req.open("GET", url );
      req.onload = () => {
         if(req.status === 200) {
            const response = JSON.parse(req.response);
            const data = {
              "projects": response.projects,
              "sections": response.sections
            }
            

            observer.next(data);
            observer.complete();
         }else {
            observer.error(new Error("An Error occured downling app.json"));
         }
      }
      req.send();
   })
}


export function getContinent(data, id) {
   return data.filter (it => it.id === id);
}

export function getVideo(data, id) {
  return data.filter (it => it.id === id);
}

export function getVideoIndex(data, videoId) {
 return data.findIndex( it => it.id === videoId);

}

export function getVideoCount(data) {
  return data.length;
}
