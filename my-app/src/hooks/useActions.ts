import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as BookActionCreators from "../store/action-creators/book";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(BookActionCreators, dispatch);
};
