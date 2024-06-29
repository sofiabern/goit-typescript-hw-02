import css from "./LoadMoreBtn.module.css";

import { LoadMoreBtnProps } from "../../types";

function LoadMoreBtn({ onClick }: LoadMoreBtnProps) {
  return <button onClick={onClick} className={css.button}>Load more</button>;
}

export default LoadMoreBtn;
