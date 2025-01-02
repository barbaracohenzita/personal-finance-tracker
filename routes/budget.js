const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new budget
router.post('/', authMiddleware, budgetController.createBudget);

// Get all budgets for a user
router.get('/', authMiddleware, budgetController.getBudgets);

// Get a specific budget by ID
router.get('/:id', authMiddleware, budgetController.getBudgetById);

// Update a budget by ID
router.put('/:id', authMiddleware, budgetController.updateBudget);

// Delete a budget by ID
router.delete('/:id', authMiddleware, budgetController.deleteBudget);

module.exports = router;
