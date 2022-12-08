type Config = {
    onSuccess?: (registration: ServiceWorkerRegistration) => void;
    onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

export const unregister = () => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready
            .then((registration) => {
                registration.unregister();
            })
            .catch((error) => {
                console.error(error.message);
            });
    }
};

export const register = (config?: Config) => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
        // The URL constructor is available in all browsers that support SW.
        const publicUrl = new URL(
            process.env.PUBLIC_URL || "",
            window.location.href,
        );
        if (publicUrl.origin !== window.location.origin) {
            // Our service worker won't work if PUBLIC_URL is on a different origin
            // from what our page is served on. This might happen if a CDN is used to
            // serve assets; see https://github.com/facebook/create-react-app/issues/2374
            return;
        }

        window.addEventListener("load", () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

            registerValidSW(swUrl, config);
        });
    }
};

const registerValidSW = (swUrl: string, config?: Config) => {
    // Service worker is exist
    if (navigator.serviceWorker.controller) {
        return null;
    }

    // Register service worker
    navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                if (installingWorker === null) return;

                installingWorker.onstatechange = (e) => {
                    if (installingWorker.state === "installed") {
                        console.log(navigator.serviceWorker.controller);
                    }
                };
            };
        })
        .catch((error) => {
            console.error("Error during service worker registration:", error);
        });
};
