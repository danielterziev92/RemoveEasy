import {BrowserRouter, Route, Routes} from "react-router-dom";

import Index from "@/presentation/pages/Index.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Index/>}/>
            </Routes>
        </BrowserRouter>
    )
}