/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef } from 'react';

export const InputAmount = ({
  action,
  minus,
  amount,
  errorAmount,
  handleAmount,
  handleMinus,
}) => {
  const ref = useRef();

  const handleFocus = (() => {
    ref.current.focus();
  }, [])



  return (
    <div className='input-amount'>
      <InputAmount
        id='amount'
        inputRef={ref}
        label='Amount'
        required
        autoFocus={action === 'new' && true}
        value={amount || ''}
        error={errorAmount}
        helperText={errorAmount
          ? 'Please enter a valid number'
          : 'Toggle Income / Expense'
        }
        onChange={handleAmount}
        onClick={handleFocus}
      />
    </div>
  );
};

export const InputText = ({ label, value, error, errorMsg, onChange }) => {
  return (
    <InputText
      id={label}
      label={label}
      fullWidth
      value={value}
      error={error}
      required={label !== 'Register Date' && true}
      InputLabelProps={{ shrink: true }}
      helperText={error && errorMsg}
      onChange={onChange}
      disabled={!onChange && true}
    />
  );
};

export const InputDate = ({ date, handleDate }) => {
  const dateFormat = 'd MMM, yyyy';
  
  return (
      <InputDate
        id='date'
        label='Date'
        value={date}
        format={dateFormat}
        KeyboardButtonProps={{ 'aria-label': 'change date' }}
        fullWidth
      />
  );
};