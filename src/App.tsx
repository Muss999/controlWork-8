import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import AddForm from "./components/AddForm/AddForm";

const App = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    {["/", "/quotes"].map((path) => (
                        <Route path={path} element={<Home />} />
                    ))}
                    <Route path={"/quotes/:category"} element={<Home />} />
                    <Route path={"/add-quote"} element={<AddForm />} />
                    <Route path={"/quotes/:id/edit"} element={<AddForm />} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
            </div>
        </>
    );
};
export default App;
