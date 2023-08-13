import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store.jsx";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev/index.js";

document.title = import.meta.env.VITE_SITE_NAME

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Provider store={store}>
            <DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
            >
                <App/>
            </DevSupport>
        </Provider>
    </BrowserRouter>
);
