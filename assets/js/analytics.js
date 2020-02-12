fetch("/analytics/increment_user", {
  "method": "POST",
  "body": window.location.pathname + window.location.hash
})
