import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import MediaLibrary from "./MediaLibrary/MediaLibrary";
import ProductSection from "./ProductSection/ProductSection";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<ProductSection />}>
                <Route path="/media-library" element={<MediaLibrary />} />
            </Route>
        )
    );

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
