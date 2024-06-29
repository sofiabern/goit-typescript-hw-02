import { Field, Form, Formik, FormikHelpers } from "formik";
import { CiSearch } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";

import css from "./SearchBar.module.css";

import { SearchBarProps } from "../../types";

function SearchBar({ onSearch }: SearchBarProps) {
  const handleSubmit = (
    values: { query: string },
    actions: FormikHelpers<{ query: string }>
  ) => {
    if (!values.query.trim()) {
      toast.error("Type something in!");
      actions.resetForm();
      return;
    }

    onSearch(values.query);
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={{ query: "" }}

      onSubmit={handleSubmit}>
      <Form className={css.bar}>
        <div className={css["search-container"]}>
          <button type="submit" className={css.button}>
            <CiSearch size={12} />
          </button>
          <Field
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
            className={css.input}
          />
        </div>
        <Toaster />
      </Form>
    </Formik>
  );
}

export default SearchBar;
