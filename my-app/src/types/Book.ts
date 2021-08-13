export interface BookState {
  books: BookData;
  loading: boolean;
  error: null | string;
  paginationIndex: number;
  search: string;
  categorie: BookCategorie;
  filter: BookFilter;
  showBookList: boolean;
  openedBookPageData: InfoPageBookData | null;
}

export enum BookActionTypes {
  FETCH_BOOKS = "FETCH_BOOKS",
  FETCH_BOOKS_ERROR = "FETCH_BOOKS_ERROR",
  FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS",
  FETCH_MORE_BOOKS = "FETCH_MORE_BOOKS",
  SET_BOOK_SEARCH = "SET_BOOK_SEARCH",
  SET_BOOK_CATEGORIE = "SET_BOOK_CATEGORIE",
  SET_BOOK_FILTER = "SET_BOOK_FILTER",
  SET_SHOW_BOOK_LIST = "SET_SHOW_BOOK_LIST",
  SET_BOOK_PAGINATION_INDEX = "SET_BOOK_PAGINATION_INDEX",
  SET_OPENED_BOOK_PAGE_DATA = "SET_OPENED_BOOK_PAGE_DATA",
}

interface FetchBooksAction {
  type: BookActionTypes.FETCH_BOOKS;
}
interface FetchBooksSuccessAction {
  type: BookActionTypes.FETCH_BOOKS_SUCCESS;
  payload: BookData;
}
interface FetchBooksErrorAction {
  type: BookActionTypes.FETCH_BOOKS_ERROR;
  payload: string;
}
interface SetBookSearchAction {
  type: BookActionTypes.SET_BOOK_SEARCH;
  payload: string;
}
interface SetBookCategorieAction {
  type: BookActionTypes.SET_BOOK_CATEGORIE;
  payload: BookCategorie;
}
interface SetBookFilterAction {
  type: BookActionTypes.SET_BOOK_FILTER;
  payload: BookFilter;
}
interface SetShowBookListAction {
  type: BookActionTypes.SET_SHOW_BOOK_LIST;
  payload: boolean;
}
interface FetchMoreBooksAction {
  type: BookActionTypes.FETCH_MORE_BOOKS;
  payload: { newIndex: number; data: BookData };
}
interface SetBookPaginationIndexAction {
  type: BookActionTypes.SET_BOOK_PAGINATION_INDEX;
  payload: number;
}
interface SetOpenedBookPageDataAction {
  type: BookActionTypes.SET_OPENED_BOOK_PAGE_DATA;
  payload: InfoPageBookData | null;
}

export interface InfoPageBookData {
  volumeInfo: {
    title: string;
    authors: string[];
    categories: string[];
    description?: string;
    imageLinks: {
      thumbnail: string;
    };
  };
}
export interface FetchBooksParams {
  search: string;
  filter: BookFilter;
  categorie: BookCategorie;
}

export interface FetchMoreBooksParams {
  search: string;
  filter: BookFilter;
  categorie: BookCategorie;
  lastIndex: number;
}
export type BookCategorie =
  | "all"
  | "art"
  | "biography"
  | "history"
  | "medical"
  | "poetry";

export type BookFilter = "relevance" | "newest";

interface BookData {
  items: any[];
  totalItems: number;
}
export type BookAction =
  | FetchBooksAction
  | FetchBooksErrorAction
  | FetchBooksSuccessAction
  | SetBookSearchAction
  | SetBookFilterAction
  | SetBookCategorieAction
  | SetShowBookListAction
  | FetchMoreBooksAction
  | SetBookPaginationIndexAction
  | SetOpenedBookPageDataAction;
