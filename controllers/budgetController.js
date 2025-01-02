const Budget = require('../models/budget');

// Create a new budget
exports.createBudget = async (req, res) => {
  try {
    const { name, amount, startDate, endDate } = req.body;
    const userId = req.user.id;

    const newBudget = new Budget({
      name,
      amount,
      startDate,
      endDate,
      userId
    });

    const savedBudget = await newBudget.save();
    res.status(201).json(savedBudget);
  } catch (error) {
    res.status(500).json({ message: 'Error creating budget', error });
  }
};

// Get all budgets for a user
exports.getBudgets = async (req, res) => {
  try {
    const userId = req.user.id;
    const budgets = await Budget.find({ userId });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving budgets', error });
  }
};

// Get a specific budget by ID
exports.getBudgetById = async (req, res) => {
  try {
    const { id } = req.params;
    const budget = await Budget.findById(id);

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving budget', error });
  }
};

// Update a budget by ID
exports.updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, amount, startDate, endDate } = req.body;

    const updatedBudget = await Budget.findByIdAndUpdate(
      id,
      { name, amount, startDate, endDate },
      { new: true }
    );

    if (!updatedBudget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.status(200).json(updatedBudget);
  } catch (error) {
    res.status(500).json({ message: 'Error updating budget', error });
  }
};

// Delete a budget by ID
exports.deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBudget = await Budget.findByIdAndDelete(id);

    if (!deletedBudget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.status(200).json({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting budget', error });
  }
};
