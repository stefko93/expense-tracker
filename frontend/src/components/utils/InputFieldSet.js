/* eslint-disable react/prop-types */
import React from 'react';

export default function InputFieldSet({
  errors,
  fieldValues,
  handleInputChange,
  handleInputBlur,
  type,
  name,
  labelText,
  required,
  reference,
  placeholder
}) {
  return (
    <div className={`mb-3 ${errors[name] !== '' ? 'was-validated' : ''} col-md-12`}>
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <input
        type={type}
        className="form-control"
        id={name}
        name={name}
        value={fieldValues[name]}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        required={required}
        ref={reference}
        placeholder={placeholder}
      />
      <div className="invalid-feedback">{errors[name]}</div>
    </div>
  );
}