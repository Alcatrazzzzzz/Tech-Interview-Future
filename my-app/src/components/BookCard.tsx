import React from "react";
import { useActions } from "../hooks/useActions";
import { InfoPageBookData } from "../types/Book";

interface BookCardProps {
  book: InfoPageBookData;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { setBookPageData } = useActions();

  return (
    <div
      className="single-book-container"
      onClick={() => {
        setBookPageData(book);
      }}
    >
      {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail ? (
        <img
          src={book.volumeInfo.imageLinks.thumbnail}
          alt={book.volumeInfo.title + " cover"}
        />
      ) : null}
      <div className="single-book-info-container">
        <p>{book.volumeInfo.categories ? book.volumeInfo.categories[0] : ""}</p>
        <h2>{book.volumeInfo.title ? book.volumeInfo.title : ""}</h2>
        <p>
          {book.volumeInfo.authors
            ? book.volumeInfo.authors.map((author, iter) => {
                return iter + 1 === book.volumeInfo.authors.length
                  ? `${author} `
                  : `${author}, `;
              })
            : ""}
        </p>
      </div>
    </div>
  );
};
