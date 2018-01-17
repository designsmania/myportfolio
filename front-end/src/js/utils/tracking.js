

const EVENT_CATEGORY = "creative-studios";
const NETWORK_ID = "dsc";
const TYPE = "web";
const BRAND_PROPERTY = "dsc-web";
export const videoActionLabels = {
   short_form_start: "short-form-start",
   short_form_complete: "short-form-complete",
   watch_vr_start: "watch-vr-start",
   watch_vr_complete: "watch-vr-complete",
   clip_start: "clip-start",
   clip_quarter: "clip-25",
   clip_half: "clip-50",
   clip_three_quarters: "clip-75",
   clip_complete: "clip-complete"
}

export const Tracking = {

  logClick: (label) => {
    

    ga("send", "event", EVENT_CATEGORY, "click", label, {
      "dimension27": NETWORK_ID,
      "dimension28": TYPE,
      "dimension29": BRAND_PROPERTY
    })
  },

  logPageView: (url) => {
      ga('send', 'pageview', "/" + url, {
      "dimension27": NETWORK_ID,
      "dimension28": TYPE,
      "dimension29": BRAND_PROPERTY
    });
  },

  logOutboundLink: (url, label) => {
      ga('send', 'event', 'outbound', 'click', url, label, {
         "dimension27" : NETWORK_ID,
         "dimension28" : TYPE,
         "dimension29" : BRAND_PROPERTY
   });
  },

  logVideoEvent: (action, label) => {
    
   ga('send', 'event', 'video-events', action , label, {
      "dimension27" : NETWORK_ID,
      "dimension28" : TYPE,
      "dimension29" : BRAND_PROPERTY
   });
  },

  logNextVideo(label) {
    
    ga('send', 'event', EVENT_CATEGORY, "next-video" , label, {
      "dimension27" : NETWORK_ID,
      "dimension28" : TYPE,
      "dimension29" : BRAND_PROPERTY
   });
  }

}

/*
export const Tracking = {

  logClick: (label) => {


    ga("send", "event", EVENT_CATEGORY, "click", label, {
      "dimension27": NETWORK_ID,
      "dimension28": TYPE,
      "dimension29": BRAND_PROPERTY
    })

    // window.dataLayer.push({
    //   action: "next-video",
    //   category: EVENT_CATEGORY,
    //   event: "click",
    // });


  },

  logPageView: (url, pathname, page_title) => {
    //   ga('send', 'pageview', url, {
    //   "dimension27": NETWORK_ID,
    //   "dimension28": TYPE,
    //   "dimension29": BRAND_PROPERTY
    // });
    if (window.dataLayer === "undefined")  return;
    window.dataLayer.push({
      category: EVENT_CATEGORY,
      event: "pageView",
      page_pathname: pathname,
      page_url: url,
      page_title,
      post_type: "show",
      screen_type: "show",
      show_id: undefined,
      show_name: undefined

    })
  },

  logOutboundLink: (url, label) => {
   if (!gaIsLoaded) return;
    ga('send', 'event', 'outbound', 'click', url, label, {
      "dimension27" : NETWORK_ID,
      "dimension28" : TYPE,
      "dimension29" : BRAND_PROPERTY
   });
  },

  logVideoEvent: (action, label, duration) => {
   ga('send', 'event', 'video-events', action , label, {
      "dimension27" : NETWORK_ID,
      "dimension28" : TYPE,
      "dimension29" : BRAND_PROPERTY
   });
    // window.dataLayer.push({
    //   action,
    //   event: "video-event",
    //   video_duration: duration,
    //   video_category: "TRVLR",
    //   video_requires_authentication: "non authenticated content",
    //   video_network: "dsc",
    //   video_segment: 1,
    //   video_referring_location: null,
    //   video_show_title: "TRVLR",
    //   video_title: label,      
    //   video_type: "shortform"
    // });
  },

  logNextVideo(label) {
    ga('send', 'event', EVENT_CATEGORY, "next-video" , label, {
      "dimension27" : NETWORK_ID,
      "dimension28" : TYPE,
      "dimension29" : BRAND_PROPERTY
   });

    // window.dataLayer.push({
    //   action: "next-video",
    //   event: "video-event",
    //   category: EVENT_CATEGORY,
    //   video_title: label          
    // });
  }

}
*/
