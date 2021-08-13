import { BookAction, BookActionTypes, BookState } from "../../types/Book";

const initialState: BookState = {
  books: { items: [], totalItems: 0 },
  loading: false,
  error: null,
  paginationIndex: 0,
  search: "",
  categorie: "all",
  filter: "relevance",
  showBookList: false,
  openedBookPageData: null,
};

export const bookReducer = (
  state: BookState = initialState,
  action: BookAction
): BookState => {
  switch (action.type) {
    case BookActionTypes.FETCH_BOOKS:
      return {
        ...state,
        loading: true,
        error: null,
        openedBookPageData: null,
      };
    case BookActionTypes.FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload,
        openedBookPageData: null,
      };
    case BookActionTypes.FETCH_BOOKS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        openedBookPageData: null,
      };
    case BookActionTypes.SET_BOOK_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case BookActionTypes.SET_BOOK_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case BookActionTypes.SET_BOOK_CATEGORIE:
      return {
        ...state,
        categorie: action.payload,
      };
    case BookActionTypes.SET_SHOW_BOOK_LIST:
      return {
        ...state,
        showBookList: action.payload,
      };
    case BookActionTypes.SET_BOOK_PAGINATION_INDEX:
      return {
        ...state,
        paginationIndex: action.payload,
      };
    case BookActionTypes.FETCH_MORE_BOOKS:
      return {
        ...state,
        paginationIndex: action.payload.newIndex,
        books: {
          totalItems: state.books.totalItems,
          items: [...state.books.items, ...action.payload.data.items],
        },
      };
    case BookActionTypes.SET_OPENED_BOOK_PAGE_DATA:
      return {
        ...state,
        openedBookPageData:
          action.payload === null
            ? null
            : {
                volumeInfo: {
                  title: action.payload.volumeInfo.title,
                  authors: action.payload.volumeInfo.authors,
                  categories: action.payload.volumeInfo.categories,
                  imageLinks: action.payload.volumeInfo.imageLinks,
                  description: action.payload.volumeInfo.description,
                },
              },
      };
    default:
      return state;
  }
};
