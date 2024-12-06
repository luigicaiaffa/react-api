import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import placeHolder from "./assets/img/600x400.svg";

const defaultFormValue = {
  title: "",
  author: "",
  content: "",
  image: "",
  category: "",
  pubblished: false,
};

function App() {
  const [articleFormInput, setArticleFormInput] = useState(defaultFormValue);
  const [articlesData, setArticlesData] = useState([]);

  // # GET
  const fetchArticlesData = () => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => {
        setArticlesData(data);
      });
  };

  // # POST
  const createArticle = (data) => {
    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => fetchArticlesData());
  };

  // # DELETE
  const deleteArticle = (id) => {
    fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setArticlesData(data);
      });
  };

  // PUT & PATCH
  // const modifyArticle = (id) => {
  //   const updatedList = [...articlesData];
  //   articleFormInput
  //     ? (updatedList[id] = articleFormInput)
  //     : alert("Nessun valore inserito");

  //   setArticlesData(updatedList);
  //   setArticleFormInput(defaultFormValue);
  // };

  // # Form
  const handleInputChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setArticleFormInput({
      ...articleFormInput,
      [e.target.name]: value,
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(articleFormInput);
    createArticle(articleFormInput);
  };

  useEffect(() => {
    fetchArticlesData();
  }, [articleFormInput]);

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
                        <option value={"Snack"}>Snack</option>
                        <option value={"Antipasti"}>Antipasti</option>
                        <option value={"Pizze"}>Pizze</option>
                        <option value={"Primi"}>Primi</option>
                        <option value={"Secondi"}>Secondi</option>
                        <option value={"Dolci"}>Dolci</option>
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

                    {/* NB to modify */}
                    {articlesData.length > 0 && (
                      <div className="form-text mt-2">
                        &#45; modificare un articolo: inserire i nuovi dati nel
                        form e cliccare sul bottone di modifica dell'articolo
                        interessato
                      </div>
                    )}

                    <div className="col-12 d-flex">
                      {/* Submit Button */}
                      <div>
                        <button type="submit" className="btn btn-success">
                          <i className="fa-solid fa-plus fa-xl"></i>
                        </button>
                      </div>

                      {/* Published Check */}
                      <div className="form-check mx-3">
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
                  articlesData.map((article) => {
                    return (
                      <div key={article.id} className="col-md-6 col-lg-4">
                        <div className="card card-main">
                          {/* Card img */}
                          <img
                            src={article.image || placeHolder}
                            className="card-img-top"
                            alt="img"
                          />

                          {/* Card body */}
                          <div className="card-body card-main-body">
                            <div className="d-flex justify-content-between">
                              {/* category */}
                              <span className="form-text">
                                {article.category}
                              </span>

                              {/* pubblished */}
                              <span>
                                {article.pubblished ? (
                                  <i className="fa-solid fa-square-check text-success"></i>
                                ) : (
                                  <i className="fa-solid fa-square-xmark text-danger"></i>
                                )}
                              </span>
                            </div>

                            {/* title */}
                            <h5 className="card-title">{article.title}</h5>

                            {/* author */}
                            <span>
                              <i>&#45; {article.author}</i>
                            </span>

                            {/* content */}
                            <p className="card-text pb-2">{article.content}</p>

                            <div className="d-flex justify-content-end">
                              {/* tags */}
                              <div className="d-none">
                                {/* {article.tags.map((tag, i) => (
                                  <span
                                    key={i}
                                    className="me-1 badge rounded-pill text-bg-success"
                                  >
                                    {tag}
                                  </span>
                                ))} */}
                              </div>

                              {/* buttons */}
                              <div>
                                {/* modify */}
                                <button
                                  className="btn btn-warning mx-1 d-none"
                                  onClick={() => modifyArticle(article.id)}
                                >
                                  <i className="fa-solid fa-pencil"></i>
                                </button>

                                {/* delete */}
                                <button
                                  className="btn btn-danger mx-1"
                                  onClick={() => deleteArticle(article.id)}
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
