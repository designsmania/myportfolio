export const devices = {

      Android : function() {
           return navigator.userAgent.match(/Android/i);
       },
       BlackBerry: function() {
           return navigator.userAgent.match(/BlackBerry/i);
       },
       iPad: function() {
        return navigator.userAgent.match(/iPad/i);

       },
       iPhone: function() {
           return navigator.userAgent.match(/iPhone|iPod/i);
       },
       Smartphone: function(){
          return (window.innerWidth <= 384 && window.innerHeight <= 640);
      },
       Tablet: function(){
          return (navigator.userAgent.match(/Tablet|Android|iPad/i) && window.innerWidth >= 768);
      },
       Landscape: function() {
          return window.innerWidth > window.innerHeight;
       },
       Opera: function() {
           return navigator.userAgent.match(/Opera Mini/i);
       },
       Windows: function() {
           return navigator.userAgent.match(/IEMobile/i);
       },
       any: function() {
           return devices.Android() || devices.BlackBerry() || devices.iPhone() || devices.Opera() || devices.Windows();
       },


  };


  export const browsers = {
      Safari: !!navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i) && typeof document.body.style.webkitFilter !== "undefined",
      IEEdge: navigator.userAgent.indexOf("Edge/"),
      IE11: !!window.MSInputMethodContext && !!document.documentMode || navigator.userAgent.match(/MSIE 10/)
  }
