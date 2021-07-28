/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {useState, useContext, useEffect, useRef } from 'react';
import InputFieldSet from '../../utils/InputFieldSet';
// import validator from 'validator';
import Select from '../../utils/Select'

import { GlobalContext } from '../../../context/GlobalState';

// import { incomeCategories, expenseCategories } from './categories';

const AddTransaction = () => {
const { addTransaction, incomes, expenses, getIncomes, getExpenses } = useContext(GlobalContext);
  
useEffect(() => {
  getIncomes();
  getExpenses();
}, [])

const incomeTypes = incomes.map(income => income.type);
const expenseTypes = expenses.map(expense => expense.type);


/// ////////////////////////////////////////////////////////////////

// const initialState = {
//     type: 'Income', 
//     category: '',
//     detail: '',
//     amount: '',
//     date: new Date(),
//   };

//   const [formData, setFormData] = useState(initialState);  

//   const onSubmit = e => {
//     e.preventDefault();

//     const newTransaction = {
//       ...formData, 
//       amount: Number(formData.amount)
//     }

//     addTransaction(newTransaction);
//     setFormData(initialState);
//   }

//   const selectedCategories = formData.type === 'Income' ? incomeTypes : expenseTypes;

//   return (
//     <>
//       <h3>Add new transaction</h3>
//       <form onSubmit={onSubmit} className="form-group w-75 needs-validation">
//       <div>
           
//           <div className="mb-3" >
//             <label className="form-label" htmlFor="type">Type</label> 
//             <select className="form-select" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} > 
//               <option value="Income" selected>Income</option>
//               <option value="Expense">Expense</option>
//             </select>
//           </div>

        
//         <div className="mb-3" >
//           <label className="form-label" htmlFor="category">Category</label> 
//           <select className="form-select form-control" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required  > 
//               { selectedCategories && selectedCategories.map((c, i) => <option key={i} value={c} selected>{c}</option>)}
//           </select>
//         </div>

//         <div className="mb-3">
//           <label className="form-label" htmlFor="detail" >Detail</label>
//           <input className="form-control" type="text" value={formData.detail} onChange={(e) => setFormData({ ...formData, detail: e.target.value })} placeholder="Enter detail..." required  />
//         </div>

//         <div className="mb-3">
//           <label className="form-label" htmlFor="amount" >Amount</label>
//           <input className="form-control" type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} placeholder="Enter amount..." required />
//         </div>

//         <div className="mb-3">
//           <label className="form-label" htmlFor="date">Date</label>
//           <input className="form-control" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })}  />
//         </div>

//         <button className="btn btn-dark">Add transaction</button>
//       </div>
//       </form>
//     </>
//   )
// }

// export default AddTransaction;
/// /////////////////////////////////////////////////////////////////////////////////////////////


    const [fieldValues, setFieldValues] = useState({
        type:"",
        category: '',
        detail: "",
        amount: "",
        date: new Date()
      });
    
      const [errors, setErrors] = useState({
        type:"",
        category: '',
        text: "",
        amount: "",
      });
    
      const [formWasValidated, setFormWasValidated] = useState(false);
    
      const [formAlertText, setFormAlertText] = useState('');
      const [formAlertType, setFormAlertType] = useState('');
    
      const references = {
        type: useRef(),
        category: useRef(),
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

      function handleSubmit(e) {
        e.preventDefault();
    
        setFormAlertText('');
        setFormAlertType('');
        setFormWasValidated(false);
    
        const isValid = isFormValid();
    
        if (isValid) {
            const newTransaction = {
              ...fieldValues, 
              amount: Number(fieldValues.amount)
            }

            addTransaction(newTransaction);
                setFormWasValidated(true);
                setFormAlertText('');
                setFormAlertType('');

         } else {
                setFormWasValidated(false);
                setFormAlertText("unknown error");
                setFormAlertType('danger');
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

    const options=["Expense", "Income"]
    const selectedCategories = fieldValues.type === 'Income' ? incomeTypes : expenseTypes;

    return (
        <div className="container mb-5 text-center">
            <h3>Add new transaction</h3>
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
  
          <button type="submit" className="btn btn-dark">Add</button>
  
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
export default AddTransaction;