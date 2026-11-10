import { forwardRef, useEffect, useState } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(function Input(
  { type = 'text', placeholder, error, name, value, defaultValue, onChange, ...rest },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const [hasValue, setHasValue] = useState(Boolean(value ?? defaultValue));

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  useEffect(() => {
    if (value !== undefined) {
      setHasValue(Boolean(value));
    }
  }, [value]);

  const handleChange = (event) => {
    setHasValue(Boolean(event.target.value));
    onChange?.(event);
  };

  return (
    <div className={styles.wrapper}>
      <input
        ref={ref}
        name={name}
        type={inputType}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        onChange={handleChange}
        {...rest}
      />

      {isPassword && hasValue && (
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setShowPassword((v) => !v)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          <svg width="18" height="18" aria-hidden="true">
            <use href={`/sprite.svg#${showPassword ? 'icon-eye-off' : 'icon-eye'}`} />
          </svg>
        </button>
      )}
    </div>
  );
});

export default Input;
