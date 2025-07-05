import { NavLink } from "react-router-dom";
import { CATEGORIES } from "../../../helpers/consts";
import "./HomeCategoriesBlock.css";

const HomeCategoriesBlock = () => {
    return (
        <div className="HomeCategoriesBlock">
            {CATEGORIES.map((category, index) => {
                return (
                    <NavLink
                        to={category.id ? `/quotes/${category.id}` : "/quotes"}
                        end={category.id === ""}
                        className="HomeCategoriesBlock-link"
                        key={`${category.id}-${index}`}
                    >
                        {category.title}
                    </NavLink>
                );
            })}
        </div>
    );
};

export default HomeCategoriesBlock;
