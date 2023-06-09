import React, { useReducer, useState } from 'react';
import './App.css';

const formReducer = (state, event) => {
  if(event.reset) {
    return {
      name: '',
      Environment: '',
      Management: ''
    }
  }
 return {
   ...state,
   [event.name]: event.value
 }
}

function App() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setFormData({
        reset: true
      })
    }, 3000)
  }

  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  }

  return(
    <div className="wrapper">
      <h1>BO Management</h1>
      {submitting &&
        <div>
         You are submitting the following:
         <ul>
           {Object.entries(formData).map(([name, value]) => (
             <li key={name}><strong>{name}</strong>:{value.toString()}</li>
           ))}
         </ul>
       </div>
      }
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Name</p>
            <input name="name" onChange={handleChange}/>
          </label>
        </fieldset>
        <fieldset>
         <label>
           <p>Environment</p>
           <select name="Environment" onChange={handleChange}>
               <option value="">--Please choose an option--</option>
               <option value="NXT">NXT</option>
               <option value="PRD">PRD</option>
           </select>
           <p>Activate/Deactivate</p>
           <select name="Management" onChange={handleChange}>
               <option value="">--Please choose an option--</option>
               <option value="Activate">Activate</option>
               <option value="Deactivate">Deactivate</option>
           </select>
         </label>
       </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App;