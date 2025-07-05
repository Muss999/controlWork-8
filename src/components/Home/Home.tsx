import { useEffect, useState } from "react";
import type { TypeQuoteMutation, TypeQuotesList } from "../../helpers/types";
import axiosApi from "../../axiosApi";
import Spinner from "../Spinner/Spinner";
import Quote from "../Quote/Quote";
import "./Home.css";
import { CATEGORIES } from "../../helpers/consts";
import { NavLink } from "react-router-dom";

const Home = () => {
    const [quotes, setQuotes] = useState<TypeQuotesList>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosApi.get("/quotes.json");
                setQuotes(data);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <Spinner />;
    }
    if (error) {
        return <p>Произошла ошибка</p>;
    }
    if (!quotes) {
        return <p>Цитат нет</p>;
    }

    const quotesArr: TypeQuoteMutation[] = [];
    for (const quote in quotes) {
        const newQuote = { ...quotes[quote], id: quote };
        quotesArr.push(newQuote);
    }

    return (
        <div className="Home__main-block">
            <div className="Home__categories-block">
                {CATEGORIES.map((categorie) => {
                    return (
                        <NavLink
                            to={`/quotes/${categorie.id}`}
                            className="Home__categorie"
                        >
                            {categorie.title}
                        </NavLink>
                    );
                })}
            </div>
            <div className="Home__quotes-list">
                {quotesArr.map((quote, index) => {
                    return <Quote key={`${quote.id}-${index}`} quote={quote} />;
                })}
            </div>
        </div>
    );
};

export default Home;
