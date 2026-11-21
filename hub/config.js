// Our corner (the hub) settings. The hub lives at /hub/; the bare address forwards there.
window.HUB_CONFIG = {
  // Which apps are open. Their cards open the app; every other card leads to an "Under construction" page.
  // Names: "movie", "notebook", "call", "mediaLog". To open everything, delete this line.
  live: ["movie"],

  // Her name on the second clock until she has signed in (after that, the name she picked is used).
  partnerName: "Kar",

  // Where each app lives (these are the defaults; change only if you move an app).
  urls: { movie: "/movie-night/", notebook: "/notebook/", call: "/notebook/call.html", mediaLog: "/media-log/" },
};
