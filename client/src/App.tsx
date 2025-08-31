import {BrowserRouter, Route, Routes} from "react-router-dom";

import {useLocalizationInit} from "@/hooks/useLocalizationInit.ts";

import Index from "@/presentation/pages/Index.tsx";
import NotFound from "@/presentation/pages/NotFound.tsx";

export default function App() {
    useLocalizationInit();

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Index/>}/>

                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}