import { useEffect, useState } from "react";
import type { TypeQuote } from "../../helpers/types";
import axiosApi from "../../axiosApi";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { CATEGORIES } from "../../helpers/consts";

const AddForm = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [addQuote, setAddQuote] = useState<TypeQuote>({
        author: "",
        category: "",
        text: "",
    });

    useEffect(() => {
        if (params.id) {
            const fetchData = async () => {
                try {
                    const { data } = await axiosApi.get(
                        `/quotes/${params.id}.json`
                    );
                    if (data) {
                        setAddQuote(data);
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
        } else {
            setAddQuote({ author: "", category: "", text: "" });
            setError(false);
            setLoading(false);
        }
    }, [params.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(false);

        const newQuote = {
            author: addQuote.author.trim(),
            text: addQuote.text.trim(),
            category: addQuote.category,
        };

        if (
            newQuote.author.length === 0 ||
            newQuote.text.length === 0 ||
            newQuote.category.length === 0
        ) {
            alert("Some inputs are empty");
            return;
        }

        setLoading(true);
        try {
            if (params.id) {
                await axiosApi.put(`/quotes/${params.id}.json`, newQuote);
            } else {
                await axiosApi.post("/quotes.json", newQuote);
            }
            navigate("/quotes");
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spinner />;
    }
    if (error) {
        return <div className="alert alert-danger">Произошла ошибка.</div>;
    }

    return (
        <>
            <h2>Форма цитаты</h2>
            <form className="container mt-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="quoteAuthor" className="form-label">
                        Автор цитаты
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="quoteTitle"
                        placeholder="Введите имя автора"
                        value={addQuote.author}
                        onChange={(e) =>
                            setAddQuote({ ...addQuote, author: e.target.value })
                        }
                        required
                        autoFocus
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="quoteCategory" className="form-label">
                        Категория
                    </label>
                    <select
                        id="quoteCategory"
                        className="form-select"
                        value={addQuote.category}
                        onChange={(e) =>
                            setAddQuote({
                                ...addQuote,
                                category: e.target.value,
                            })
                        }
                        required
                    >
                        <option value="" disabled>
                            Выберите категорию
                        </option>
                        {CATEGORIES.map((category) => {
                            if (category.title === "All") {
                                return;
                            }
                            return (
                                <option key={category.id} value={category.id}>
                                    {category.title}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="quoteDescription" className="form-label">
                        Текст цитаты
                    </label>
                    <textarea
                        className="form-control"
                        id="quoteDescription"
                        placeholder="Введите текст"
                        value={addQuote.text}
                        onChange={(e) =>
                            setAddQuote({ ...addQuote, text: e.target.value })
                        }
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-success">
                    {params.id ? "Сохранить изменения" : "Добавить цитату"}
                </button>
            </form>
        </>
    );
};

export default AddForm;
