import React, { useState } from 'react';
import axios from 'axios';

const BudgetCreation = () => {
  const [budgetName, setBudgetName] = useState('');
  const [amount, setAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/budgets', {
        name: budgetName,
        amount,
        startDate,
        endDate
      });
      // Reset form fields after successful submission
      setBudgetName('');
      setAmount('');
      setStartDate('');
      setEndDate('');
      setSuccessMessage('Budget created successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating budget:', error);
      setErrorMessage('Error creating budget. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="budgetName">Budget Name:</label>
        <input
          type="text"
          id="budgetName"
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Budget</button>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default BudgetCreation;
