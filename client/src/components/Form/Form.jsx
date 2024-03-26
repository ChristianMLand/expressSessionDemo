import { useState, Children, Fragment, cloneElement } from 'react';
import axios from 'axios';
import styles from './Form.module.css';

const http = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true
});

export default function Form({ method, action, onSuccess, children }) {
  const [errors, setErrors] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    http({ method, data, url: action })
      .then(({ data }) => onSuccess(data))
      .catch(err => setErrors(err.response.data.errors));
  };

  return (
    <form
      className={styles.form}
      action={action}
      method={method}
      onSubmit={handleSubmit}
    >
      {Children.map(children, (child, idx) => (
        <Fragment key={idx}>
          {child.type.name === "Field" ? (
            cloneElement(child, { error: errors[child.props.name]?.message })
          ) : child}
        </Fragment>
      ))}
    </form>
  );
}

export function Field({ type, error, ...rest }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className={styles.field}>
        <input {...rest} type={visible ? "text" : type} />
        {type === "password" && (
          <button type="button" onClick={() => setVisible(prev => !prev)}>
            <i className={`fa-regular ${visible ? "fa-eye-slash" : "fa-eye"}`} />
          </button>
        )}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </>
  );
}