'use strict';

self.addEventListener('push', function (event) {
    if (event.data) {
        var { payload } = event.data.json();

        return self.registration.showNotification(payload.title, {
            body: payload.body,
            icon: '/static/images/icon-192x192.png',
            data: payload,
        });
    }

    event.waitUntil(self.registration.showNotification(title, options));
});