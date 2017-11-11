self.addEventListener("push", function(event) {
  event.waitUntil(
    self.registration.showNotification("BRELLA", {
      body: event.data.text(),
    })
  );
});
