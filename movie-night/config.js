// Movie night settings.
window.NOTEBOOK_CONFIG = {
  // Sign-in, using the same Firebase project as Media log.
  // If Media log is on the same GitHub account (…github.io/media-log/), leave this as null:
  // Movie night borrows Media log's settings automatically.
  // Otherwise replace null with the same six lines that are in Media log's config.js, e.g.
  //   firebase: { apiKey: "…", authDomain: "…", projectId: "…", storageBucket: "…", messagingSenderId: "…", appId: "…" },
  firebase: {
    apiKey: "AIzaSyDlBm9I4TgAx8f9Kd1VnGxzl88d-Q21Res",
    authDomain: "our-corner-dc362.firebaseapp.com",
    projectId: "our-corner-dc362",
    storageBucket: "our-corner-dc362.firebasestorage.app",
    messagingSenderId: "517501333291",
    appId: "1:517501333291:web:bef2436e708e69fe67df6e",
  },

  // true: only the two of you can use Movie night (it asks you to sign in first).
  // false: anyone with the link can use it; signing in is optional.
  requireSignIn: true,

  // The "← All our tools" link to the hub. "" hides it; put the hub's address here once the hub is online, e.g. "/".
  hubUrl: "/",
};
