import React from "react";
import { FaSearch } from "react-icons/fa";
import "./App.css";
import { BookList } from "./components/BookList";
import {
  bookCategories,
  boookSortingFilters,
} from "./constants/bookListConstants";
import { useActions } from "./hooks/useActions";
import { useTypeSelector } from "./hooks/useTypeSelector";
import { BookCategorie, BookFilter } from "./types/Book";
import { enumKeys } from "./utils/typeScriptUtils";
import { BookInfoPage } from "./components/BookInfoPage";

function App() {
  const { search, filter, categorie, showBookList, openedBookPageData } =
    useTypeSelector((state) => state.book);
  const { setSearch, setCategorie, setFilter, fetchBooks, setShowBookList } =
    useActions();

  let categories = [];
  let sortFilters = [];

  for (let item of enumKeys(bookCategories)) {
    categories.push(<option key={item}>{bookCategories[item]}</option>);
  }

  for (let item of enumKeys(boookSortingFilters)) {
    sortFilters.push(<option key={item}>{boookSortingFilters[item]}</option>);
  }

  return (
    <>
      <div
        style={{
          background:
            "linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(/img/bg.jpg)",
        }}
      >
        <div className="head-container container">
          <h1>Find your dream book here</h1>
          <div className="search-container">
            <input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.code === "Enter" && search.length) {
                  setShowBookList(true);
                  fetchBooks({ search, categorie, filter });
                }
              }}
              value={search}
              className="search-input"
              placeholder="Search books..."
            />
            <button
              onClick={() => {
                setShowBookList(true);
                fetchBooks({ search, categorie, filter });
              }}
              disabled={search.length === 0}
              className="search-btn"
            >
              <FaSearch color="white" />
            </button>
          </div>
          <div className="all-filters-container">
            <div className="filter-container">
              <p>Categorie:</p>
              <select
                onChange={(e) => {
                  setCategorie(e.target.value as BookCategorie);
                }}
              >
                {categories}
              </select>
            </div>
            <div style={{ marginLeft: "auto" }} className="filter-container">
              <p>Sort by:</p>
              <select
                onChange={(e) => {
                  setFilter(e.target.value as BookFilter);
                }}
              >
                {sortFilters}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div style={{ paddingBottom: "20px" }} className="container">
        {openedBookPageData ? (
          <BookInfoPage book={openedBookPageData} />
        ) : showBookList ? (
          <BookList />
        ) : null}
      </div>
    </>
  );
}

export default App;
