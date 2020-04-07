// This just increments a visitor counter for the page, no other data is transmitted.
fetch("/analytics/increment_user", {
  "method": "POST",
  "body": window.location.pathname
})
