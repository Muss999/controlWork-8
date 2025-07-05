import { NavLink } from "react-router-dom";
import { CATEGORIES } from "../../../helpers/consts";
import "./HomeCategoriesBlock.css";

const HomeCategoriesBlock = () => {
    return (
        <div className="Home__categories-block">
            {CATEGORIES.map((categorie, index) => {
                return (
                    <NavLink
                        to={
                            categorie.id ? `/quotes/${categorie.id}` : "/quotes"
                        }
                        end={categorie.id === ""}
                        className="Home__categorie"
                        key={`${categorie.id}-${index}`}
                    >
                        {categorie.title}
                    </NavLink>
                );
            })}
        </div>
    );
};

export default HomeCategoriesBlock;
