const {
    getRecurringPaymentsByUser,
    createRecurringPayment,
    deleteRecurringPayment
  } = require('../models/recurringModel');
  
  // Get all recurring payments for a user
  exports.getRecurringPayments = async (req, res) => {
    const { userId } = req.params;
    try {
      const payments = await getRecurringPaymentsByUser(userId);
      res.status(200).json(payments);
    } catch (err) {
      console.error('Error fetching recurring payments:', err);
      res.status(500).json({ error: 'Failed to fetch recurring payments' });
    }
  };
  
  // Add a new recurring payment
  exports.addRecurringPayment = async (req, res) => {
    try {
      const newPayment = await createRecurringPayment(req.body);
      res.status(201).json({ message: 'Recurring payment added', id: newPayment.id });
    } catch (err) {
      console.error('Error adding recurring payment:', err);
      res.status(500).json({ error: 'Failed to add recurring payment' });
    }
  };
  
  // Delete a recurring payment
  exports.deleteRecurringPayment = async (req, res) => {
    try {
      await deleteRecurringPayment(req.params.id);
      res.status(204).send();
    } catch (err) {
      console.error('Error deleting recurring payment:', err);
      res.status(500).json({ error: 'Failed to delete recurring payment' });
    }
  };
  