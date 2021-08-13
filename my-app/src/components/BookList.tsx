import React, { useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { useTypeSelector } from "../hooks/useTypeSelector";
import { BookCard } from "./BookCard";

interface BookListProps {}

export const BookList: React.FC<BookListProps> = () => {
  const { books, error, loading, search, filter, categorie, paginationIndex } =
    useTypeSelector((state) => state.book);
  const { fetchBooks, fetchMoreBooks } = useActions();

  useEffect(() => {
    fetchBooks({ search, categorie, filter });
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex" }}>
        <img
          className="loading-spinner"
          src="/img/spinner.gif"
          alt="loading-spinner"
        />
      </div>
    );
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return books.totalItems > 0 ? (
    <>
      <p className="books-found">{`Found ${books.totalItems} results`}</p>
      <div className="books-container">
        {books.items.map((book) => {
          return <BookCard key={book.id} book={book} />;
        })}
      </div>
      {books.items.length === books.totalItems ? null : (
        <button
          onClick={() => {
            fetchMoreBooks({
              categorie: categorie,
              filter: filter,
              search: search,
              lastIndex: paginationIndex,
            });
          }}
          className="load-more-books-button"
        >
          Load More
        </button>
      )}
    </>
  ) : (
    <h2>Nothing was found</h2>
  );
};
