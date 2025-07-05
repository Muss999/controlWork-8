import { useEffect, useState } from "react";
import type { TypeQuoteMutation, TypeQuotesList } from "../../helpers/types";
import axiosApi from "../../axiosApi";
import Spinner from "../Spinner/Spinner";
import Quote from "../Quote/Quote";
import "./Home.css";
import { CATEGORIES } from "../../helpers/consts";
import { useParams } from "react-router-dom";
import HomeCategoriesBlock from "./HomeCategoriesBlock/HomeCategoriesBlock";

const Home = () => {
    const params = useParams();
    const [quotes, setQuotes] = useState<TypeQuotesList>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data: TypeQuotesList | undefined;
                if (params.categorie) {
                    setLoading(true);
                    const response = await axiosApi.get(
                        `/quotes.json?orderBy="category"&equalTo="${params.categorie}"`
                    );
                    data = response.data;
                } else {
                    setLoading(true);
                    const response = await axiosApi.get("/quotes.json");
                    data = response.data;
                }
                if (data) {
                    setQuotes(data);
                } else {
                    setError(true);
                }
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [params.categorie]);

    const quotesArr: TypeQuoteMutation[] = [];
    for (const quote in quotes) {
        const newQuote = { ...quotes[quote], id: quote };
        quotesArr.push(newQuote);
    }

    const currentCategorie = CATEGORIES.find(
        (categorie) => categorie.id === params.categorie
    );
    const categorieTitle = currentCategorie ? currentCategorie.title : "All";

    let quotesBlock = (
        <>
            {quotesArr.map((quote, index) => {
                return <Quote key={`${quote.id}-${index}`} quote={quote} />;
            })}
        </>
    );

    if (loading) {
        quotesBlock = <Spinner />;
    } else if (error) {
        quotesBlock = <p>Произошла ошибка</p>;
    } else if (quotesArr.length === 0) {
        quotesBlock = <p>Цитат нет</p>;
    }

    return (
        <div className="Home__main-block">
            <HomeCategoriesBlock />
            <div className="Home__quotes-list">
                <h2>{categorieTitle}</h2>
                {quotesBlock}
            </div>
        </div>
    );
};

export default Home;
