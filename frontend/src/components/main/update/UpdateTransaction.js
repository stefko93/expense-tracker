/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {useState, useContext, useEffect, useRef} from 'react';
import { useLocation, Redirect  } from 'react-router-dom';
// import { Link, useHistory } from "react-router-dom";

import { GlobalContext } from '../../../context/GlobalState';

import InputFieldSet from '../../utils/InputFieldSet';
import Select from '../../utils/Select'

const UpdateTransaction = ( ) => {
    const { updateTransaction, incomes, expenses, payments, getIncomes, getExpenses, getPayments } = useContext(GlobalContext);
    
    const {transaction} = useLocation();

    useEffect(() => {
      getIncomes();
      getExpenses();
      getPayments();
    }, [])
    
    const payment = payments.map(pay => pay.type)
    const incomeTypes = incomes.map(income => income.type);
    const expenseTypes = expenses.map(expense => expense.type);

    const [fieldValues, setFieldValues] = useState({
      type: transaction.type,
      category: transaction.category,
      payment: transaction.payment,
      detail: transaction.detail,
      amount: transaction.amount,
      date: new Date()
    });

    const [errors, setErrors] = useState({
      type:"",
      category: '',
      payment: "",
      detail: "",
      amount: "",
      date: ""
    });


    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);   
    const [formWasValidated, setFormWasValidated] = useState(false);
    const [formAlertText, setFormAlertText] = useState('');
    const [formAlertType, setFormAlertType] = useState('');

    const references = {
      type: useRef(),
      category: useRef(),
      payment: useRef(),
      detail: useRef(),
      amount: useRef(),
      date: useRef()
    };
  
    const errorTypes = {
      required: "Value is missing",
    };
  
    function isNotEmpty(value) {
      return value !== '';
    }
 
    const validators = {
      type: {
        required: isNotEmpty
      },
      category: {
        required: isNotEmpty
      },
      payment: {
        required: isNotEmpty
      },
      detail: {
        required: isNotEmpty,
      },
      amount: {
        required: isNotEmpty,
      }
    }

    function validateField(fieldName) {
      const value = fieldValues[fieldName];
      let isValid = true;
      setErrors((previousErrors) => ({
        ...previousErrors,
        [fieldName]: ''
      }));
      references[fieldName].current.setCustomValidity('');
  
      if (validators[fieldName] !== undefined) {
        // eslint-disable-next-line no-restricted-syntax
        for (const [validationType, validatorFn] of Object.entries(validators[fieldName])) {
          if (isValid !== false) {
            isValid = validatorFn(value);
            if (!isValid) {
              const errorText = errorTypes[validationType];
              setErrors((previousErrors) => ({
                ...previousErrors,
                [fieldName]: errorText
              }));
              references[fieldName].current.setCustomValidity(errorText);
            }
          }
        }
      }
      return isValid;
    }

    function isFormValid() {
      let isValid = true;
  
      for (const fieldName of Object.keys(fieldValues)) {
        const isFieldValid = validateField(fieldName);
        if (!isFieldValid) {
          isValid = false;
        }
      }
      return isValid;
    }


    const handleSubmit = e => {
      e.preventDefault();

      setFormAlertText('');
      setFormAlertType('');
      setFormWasValidated(false);
  
      const isValid = isFormValid();
  
      if (isValid) {
      const newTransaction = {
        type: fieldValues.type,
        category: fieldValues.category,
        payment: fieldValues.payment,
        detail: fieldValues.detail,
        amount: (fieldValues.type) === "Expense" ? -Math.abs(fieldValues.amount) :  Math.abs(fieldValues.amount) ,
        date: fieldValues.date,
      }

      updateTransaction(transaction._id, newTransaction);   
        setFormWasValidated(true);
        setFormAlertText('');
        setFormAlertType('');
        setIsUpdateSuccess(true);
        setFieldValues({
          type:"",
          category: '',
          payment: "",
          detail: "",
          amount: "",
          date: "",
        })
    } else {
      setFormWasValidated(false);
      setFormAlertText("unknown error");
      setFormAlertType('danger');
      setIsUpdateSuccess(false);
    }
}
  
    function handleInputChange(e) {
      const { value } = e.target;
      const fieldName = e.target.name;
      setFieldValues({
        ...fieldValues,
        [fieldName]: value
      });
      setErrors((previousErrors) => ({
        ...previousErrors,
        [fieldName]: ''
      }));
    }
  
    function handleInputBlur(e) {
      const { name } = e.target;
      validateField(name);
    }

    if(isUpdateSuccess){
      <Redirect to="/transactions" />
    }

    const options=["Expense", "Income"]
    const selectedCategories = fieldValues.type === 'Income' ? incomeTypes : expenseTypes;

    return (
      <div className="container mb-5 text-center">
      <h3>Update transaction</h3>
      <main className="d-flex justify-content-center">
      <form 
          onSubmit={handleSubmit} 
          noValidate
          className={`form-group w-50 text-center needs-validation ${formWasValidated ? 'was-validated' : ''} `}>

      <Select
        reference={references.type}
        name="type"
        labelText="Type"
        type="select"
        errors={errors}
        fieldValues={fieldValues}
        handleInputBlur={handleInputBlur}
        handleInputChange={handleInputChange}
        required
        options={options}
      /> 

      <Select
        reference={references.category}
        name="category"
        labelText="Category"
        type="select"
        errors={errors}
        fieldValues={fieldValues}
        handleInputBlur={handleInputBlur}
        handleInputChange={handleInputChange}
        required
        options={selectedCategories}
      />

      <Select
                  reference={references.payment}
                  name="payment"
                  labelText="Payment"
                  type="select"
                  errors={errors}
                  fieldValues={fieldValues}
                  handleInputBlur={handleInputBlur}
                  handleInputChange={handleInputChange}
                  required
                  options={payment}
                />

    <InputFieldSet
      reference={references.detail}
      name="detail"
      labelText="Detail"
      type="text"
      errors={errors}
      fieldValues={fieldValues}
      handleInputBlur={handleInputBlur}
      handleInputChange={handleInputChange}
      required
      placeholder="Enter detail..."
    />

    <InputFieldSet
      reference={references.amount}
      name="amount"
      labelText="Amount"
      type="number"
      errors={errors}
      fieldValues={fieldValues}
      handleInputBlur={handleInputBlur}
      handleInputChange={handleInputChange}
      required
      placeholder="Enter amount..."
    />

    <InputFieldSet
      reference={references.date}
      name="date"
      labelText="Date"
      type="date"
      errors={errors}
      fieldValues={fieldValues}
      handleInputBlur={handleInputBlur}
      handleInputChange={handleInputChange}
      required
    />

    <button type="submit" className="btn btn-dark">Save</button>

    {formAlertText &&
      <div className={`alert mt-3 alert-${formAlertType}`} role="alert">
        {formAlertText}
      </div>
    }

  </form>
  </main>
  </div>
    )
}

export default UpdateTransaction;