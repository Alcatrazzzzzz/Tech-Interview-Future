import axios from "axios";
import { Dispatch } from "react";
import {
  BookAction,
  BookActionTypes,
  BookCategorie,
  BookFilter,
  FetchBooksParams,
  FetchMoreBooksParams,
  InfoPageBookData,
} from "../../types/Book";
import { apiKey } from "../../constants/apiConstants";
import { BOOKS_PER_FETCH } from "../../constants/bookListConstants";

export const fetchBooks = ({ search, categorie, filter }: FetchBooksParams) => {
  return async (dispatch: Dispatch<BookAction>) => {
    if (search === "") {
      dispatch({
        type: BookActionTypes.FETCH_BOOKS_ERROR,
        payload: "Enter something in search input first",
      });
    } else {
      try {
        dispatch({ type: BookActionTypes.FETCH_BOOKS });
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?key=${apiKey}&q=${search}${
            categorie === "all" ? "" : `+subject:${categorie}`
          }&orderBy=${filter}&maxResults=${BOOKS_PER_FETCH}`
        );
        dispatch({
          type: BookActionTypes.FETCH_BOOKS_SUCCESS,
          payload: response.data,
        });
      } catch (e) {
        dispatch({
          type: BookActionTypes.FETCH_BOOKS_ERROR,
          payload: "Произошла ошибка при загрузке книг",
        });
      }
    }
  };
};

export const fetchMoreBooks = ({
  search,
  categorie,
  filter,
  lastIndex,
}: FetchMoreBooksParams) => {
  return async (dispatch: Dispatch<BookAction>) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?key=${apiKey}&q=${search}${
          categorie === "all" ? "" : `+subject:${categorie}`
        }&orderBy=${filter}&maxResults=${BOOKS_PER_FETCH}&startIndex=${
          lastIndex + BOOKS_PER_FETCH
        }`
      );
      dispatch({
        type: BookActionTypes.FETCH_MORE_BOOKS,
        payload: { data: response.data, newIndex: lastIndex + BOOKS_PER_FETCH },
      });
    } catch (e) {
      dispatch({
        type: BookActionTypes.FETCH_BOOKS_ERROR,
        payload: "Произошла ошибка при загрузке книг",
      });
    }
  };
};

export const setSearch = (search: string) => {
  return (dispatch: Dispatch<BookAction>) => {
    dispatch({ type: BookActionTypes.SET_BOOK_SEARCH, payload: search });
  };
};

export const setFilter = (filter: BookFilter) => {
  return (dispatch: Dispatch<BookAction>) => {
    dispatch({ type: BookActionTypes.SET_BOOK_FILTER, payload: filter });
  };
};

export const setPaginationIndex = (index: number) => {
  return (dispatch: Dispatch<BookAction>) => {
    dispatch({
      type: BookActionTypes.SET_BOOK_PAGINATION_INDEX,
      payload: index,
    });
  };
};

export const setCategorie = (categorie: BookCategorie) => {
  return (dispatch: Dispatch<BookAction>) => {
    dispatch({ type: BookActionTypes.SET_BOOK_CATEGORIE, payload: categorie });
  };
};

export const setShowBookList = (show: boolean) => {
  return (dispatch: Dispatch<BookAction>) => {
    dispatch({ type: BookActionTypes.SET_SHOW_BOOK_LIST, payload: show });
  };
};

export const setBookPageData = (book: InfoPageBookData | null) => {
  return (dispatch: Dispatch<BookAction>) => {
    dispatch({
      type: BookActionTypes.SET_OPENED_BOOK_PAGE_DATA,
      payload: book,
    });
  };
};
