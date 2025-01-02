import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const BudgetUpdate = () => {
  const { id } = useParams();
  const history = useHistory();
  const [budgetName, setBudgetName] = useState('');
  const [amount, setAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await axios.get(`/api/budgets/${id}`);
        const { name, amount, startDate, endDate } = response.data;
        setBudgetName(name);
        setAmount(amount);
        setStartDate(startDate);
        setEndDate(endDate);
      } catch (error) {
        console.error('Error fetching budget:', error);
      }
    };

    fetchBudget();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/budgets/${id}`, {
        name: budgetName,
        amount,
        startDate,
        endDate
      });
      history.push('/budgets');
    } catch (error) {
      console.error('Error updating budget:', error);
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
      <button type="submit">Update Budget</button>
    </form>
  );
};

export default BudgetUpdate;
