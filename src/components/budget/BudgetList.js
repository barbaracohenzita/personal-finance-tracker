import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BudgetList = () => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axios.get('/api/budgets');
        setBudgets(response.data);
      } catch (error) {
        console.error('Error fetching budgets:', error);
      }
    };

    fetchBudgets();
  }, []);

  return (
    <div>
      <h2>Budgets</h2>
      <ul>
        {budgets.map((budget) => (
          <li key={budget._id}>
            <h3>{budget.name}</h3>
            <p>Amount: {budget.amount}</p>
            <p>Start Date: {new Date(budget.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(budget.endDate).toLocaleDateString()}</p>
            <Link to={`/budgets/view/${budget._id}`}>View</Link>
            <Link to={`/budgets/update/${budget._id}`}>Update</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetList;
