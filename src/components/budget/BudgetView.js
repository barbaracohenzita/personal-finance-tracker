import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BudgetView = () => {
  const { id } = useParams();
  const [budget, setBudget] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await axios.get(`/api/budgets/${id}`);
        setBudget(response.data);
      } catch (error) {
        console.error('Error fetching budget:', error);
        setErrorMessage('Error fetching budget. Please try again.');
      }
    };

    fetchBudget();
  }, [id]);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!budget) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{budget.name}</h2>
      <p>Amount: {budget.amount}</p>
      <p>Start Date: {new Date(budget.startDate).toLocaleDateString()}</p>
      <p>End Date: {new Date(budget.endDate).toLocaleDateString()}</p>
      <p>User ID: {budget.userId}</p>
    </div>
  );
};

export default BudgetView;
