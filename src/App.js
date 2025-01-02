import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BudgetCreation, BudgetList, BudgetUpdate, BudgetView } from './components/budget';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Personal Finance Tracker</h1>
        <Switch>
          <Route path="/budgets/create" component={BudgetCreation} />
          <Route path="/budgets" exact component={BudgetList} />
          <Route path="/budgets/update/:id" component={BudgetUpdate} />
          <Route path="/budgets/view/:id" component={BudgetView} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
