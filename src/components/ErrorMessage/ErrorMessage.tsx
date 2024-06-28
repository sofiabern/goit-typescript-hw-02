
import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string
}


function ErrorMessage({ message }: ErrorMessageProps) {

  return (
    <p className={css.error}>{message}</p>
  )
}

export default ErrorMessage;
