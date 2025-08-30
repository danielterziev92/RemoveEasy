import {BrowserRouter, Route, Routes} from "react-router-dom";

import Index from "@/presentation/pages/Index.tsx";
import {useLocalizationInit} from "@/hooks/useLocalizationInit.ts";

export default function App() {
    useLocalizationInit();

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Index/>}/>
            </Routes>
        </BrowserRouter>
    )
}