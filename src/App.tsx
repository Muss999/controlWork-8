import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";

const App = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    {["/", "/quotes"].map((path) => (
                        <Route path={path} element={<Home />} />
                    ))}
                    <Route path={"/quotes/:categorie"} element={<Home />} />
                </Routes>
            </div>
        </>
    );
};
export default App;
