// Notebook settings.
//
// If Notebook sits next to Media log on GitHub (…github.io/media-log/ and
// …github.io/notebook/), leave firebase as null: it borrows Media log's
// settings automatically, so you use the same accounts and database.
//
// Only if you host it somewhere else: replace null with the same six lines
// that are in Media log's config.js, e.g.  firebase: { apiKey: "…", … },
window.NOTEBOOK_CONFIG = {
  firebase: null,
  // where the "Media log" link in the sidebar goes ("" hides it)
  mediaLogUrl: "../media-log/",

  // Video calls: only needed if calls say "Couldn't connect". A relay (TURN)
  // server passes the call along when your networks block a direct line.
  // Paste the details your TURN provider gives you, for example:
  // turn: [{ urls: ["turn:relay.example.com:3478", "turns:relay.example.com:443?transport=tcp"], username: "…", credential: "…" }],
  turn: null,
};
