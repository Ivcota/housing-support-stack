import "./bootstrap";
import "../css/app.css";
import "primeicons/primeicons.css";

import { createRoot, hydrateRoot } from "react-dom/client";

import { PrimeReactProvider } from "primereact/api";
import { Toaster } from "react-hot-toast";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        if (import.meta.env.DEV) {
            createRoot(el).render(
                <>
                    <PrimeReactProvider>
                        <App {...props} />
                        <Toaster />
                    </PrimeReactProvider>
                </>
            );
            return;
        }

        hydrateRoot(
            el,
            <>
                <PrimeReactProvider value={{ unstyled: true, pt: {} }}>
                    <App {...props} />
                    <Toaster />
                </PrimeReactProvider>
            </>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
