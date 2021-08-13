import React from "react";
import { InfoPageBookData } from "../types/Book";
import { IoIosArrowBack } from "react-icons/io";
import { useActions } from "../hooks/useActions";
interface BookInfoPageProps {
  book: InfoPageBookData;
}

export const BookInfoPage: React.FC<BookInfoPageProps> = ({ book }) => {
  const { setBookPageData } = useActions();

  return (
    <div className="book-info-page-container">
      <div className="container">
        <div className="book-info-page-content">
          <div className="book-info-page-image-container">
            {book.volumeInfo.imageLinks &&
            book.volumeInfo.imageLinks.thumbnail ? (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title + " cover"}
              />
            ) : null}
          </div>
          <div className="book-info-page-short-info">
            <p>
              {book.volumeInfo.categories
                ? book.volumeInfo.categories.map((categorie, iter) => {
                    return iter + 1 === book.volumeInfo.categories.length
                      ? `${categorie} `
                      : `${categorie}, `;
                  })
                : ""}
            </p>
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
        <div
          onClick={() => {
            setBookPageData(null);
          }}
          className="book-info-back-btn"
        >
          <IoIosArrowBack
            style={{ marginBottom: "-3px" }}
            color="rgb(151, 151, 151)"
            size={20}
          />
          <p>Back to books</p>
        </div>
      </div>
      <div
        className="container"
        style={{ marginTop: "20px", fontSize: "18px", lineHeight: "30px" }}
      >
        <p>{book.volumeInfo.description ? book.volumeInfo.description : ""}</p>
      </div>
    </div>
  );
};
