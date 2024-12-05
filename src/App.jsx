import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import placeHolder from "./assets/img/placeholder-600x400.png";

const defaultFormValue = {
  title: "",
  author: "",
  image: "",
  category: "",
  content: "",
  pubblished: false,
};

function App() {
  const [articleFormInput, setArticleFormInput] = useState(defaultFormValue);

  const [articlesData, setArticlesData] = useState([]);

  const handleInputChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setArticleFormInput({
      ...articleFormInput,
      [e.target.name]: value,
    });

    console.log(articleFormInput);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const articleList = [...articlesData];
    articleFormInput
      ? articleList.push(articleFormInput)
      : alert("Nessun valore inserito");

    setArticlesData(articleList);
    setArticleFormInput(defaultFormValue);
  };

  const deleteArticle = (id) => {
    const updatedList = articlesData.filter((article, i) => i !== id);
    setArticlesData(updatedList);
  };

  const modifyArticle = (id) => {
    const updatedList = [...articlesData];
    articleFormInput
      ? (updatedList[id] = articleFormInput)
      : alert("Nessun valore inserito");

    setArticlesData(updatedList);
    setArticleFormInput(defaultFormValue);
  };

  return (
    <>
      <div className="wrapper">
        <main>
          <div className="container">
            {/* Form Section */}
            <section className="py-5">
              <div className="card">
                <div className="card-header">
                  <h1 className="fw-bold fs-4">
                    Inserisci i dati dell'articolo
                  </h1>
                </div>
                <div className="card-body">
                  <form className="row g-3" onSubmit={handleFormSubmit}>
                    {/* Title Input */}
                    <div className="col-md-6">
                      <input
                        required
                        name="title"
                        type="text"
                        className="form-control"
                        placeholder="Titolo"
                        value={articleFormInput.title}
                        onChange={handleInputChange}
                      />
                    </div>

                    {/* Author Input */}
                    <div className="col-md-6">
                      <input
                        required
                        name="author"
                        type="text"
                        className="form-control"
                        placeholder="Autore"
                        value={articleFormInput.author}
                        onChange={handleInputChange}
                      />
                    </div>

                    {/* Img Input */}
                    <div className="col-md-8">
                      <input
                        name="image"
                        type="text"
                        className="form-control"
                        placeholder="Immagine"
                        value={articleFormInput.image}
                        onChange={handleInputChange}
                      />
                    </div>

                    {/* Category Select */}
                    <div className="col-md-4">
                      <select
                        required
                        name="category"
                        className="form-select"
                        value={articleFormInput.category}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>
                          Categoria
                        </option>
                        <option value={"Uno"}>Uno</option>
                        <option value={"Due"}>Due</option>
                        <option value={"Tre"}>Tre</option>
                        <option value={"Quattro"}>Quattro</option>
                        <option value={"Cinque"}>Cinque</option>
                      </select>
                    </div>

                    {/* Content Input */}
                    <div className="col-12">
                      <textarea
                        name="content"
                        type="text"
                        className="form-control"
                        placeholder="Contenuto"
                        value={articleFormInput.content}
                        onChange={handleInputChange}
                      />
                    </div>

                    {articlesData.length > 0 && (
                      <div className="form-text mt-2">
                        &#45; modificare un articolo: inserire i nuovi dati nel
                        form e cliccare sul bottone di modifica dell'articolo
                        interessato
                      </div>
                    )}

                    <div className="col-12 d-flex">
                      <div>
                        {/* Submit Button */}
                        <button type="submit" className="btn btn-success">
                          <i className="fa-solid fa-plus fa-xl"></i>
                        </button>
                      </div>

                      <div className="form-check mx-3">
                        {/* Published Check */}
                        <label className="form-check-label">
                          <input
                            name="pubblished"
                            className="form-check-input me-2"
                            type="checkbox"
                            checked={articleFormInput.pubblished}
                            onChange={handleInputChange}
                          />
                          Pubblicato
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </section>

            {/* Articles Section */}
            <section>
              <div className="row g-5 justify-content-around pb-5">
                {articleFormInput &&
                  articlesData.map((article, i) => {
                    return (
                      <div key={i} className="col-md-6 col-lg-4">
                        <div className="card card-main">
                          <img
                            src={article.image || placeHolder}
                            className="card-img-top"
                            alt="img"
                          />
                          <div className="card-body">
                            <div>
                              <span className="form-text">
                                {article.category}
                              </span>
                              <h5 className="card-title">{article.title}</h5>
                              <span>
                                <i>&#45; {article.author}</i>
                              </span>
                              <p className="card-text pb-2">
                                {article.content}
                              </p>
                            </div>
                            <div className="d-flex justify-content-between">
                              <div>
                                <span>
                                  {article.pubblished ? (
                                    <i className="fa-solid fa-square-check pubblished-status"></i>
                                  ) : (
                                    <i className="fa-solid fa-square-xmark pubblished-status"></i>
                                  )}
                                </span>
                              </div>
                              <div>
                                <button
                                  className="btn btn-warning mx-1"
                                  onClick={() => modifyArticle(i)}
                                >
                                  <i className="fa-solid fa-pencil"></i>
                                </button>
                                <button
                                  className="btn btn-danger mx-1"
                                  onClick={() => deleteArticle(i)}
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
