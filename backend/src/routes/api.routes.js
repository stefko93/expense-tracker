import express from 'express';
import { userController } from '../controllers/userController';
import { transactionController } from '../controllers/transactionController';
import auth from '../middlewares/auth';

const cors = require('cors');

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
// router.post('/logout', userController.logoutUser);

router.get('/user', auth, userController.loadUser);
router.put('/users/:id', auth, userController.updateUser);

// router.get('/incomes', productController.getIncomes);
// router.post('/incomes', productController.createIncome);
// router.put('/incomes/:id', productController.updateIncome);
// router.delete('/incomes/:id', productController.deleteIncome);

// router.get('/expenses', customerController.getExpenses);
// router.post('/expenses', customerController.createExpense);
// router.put('/expenses/:id', customerController.updateExpense);
// router.delete('/expenses/:id', customerController.deleteExpense);

router.get('/transactions', auth, transactionController.getTransactions);
router.post('/transactions', auth, transactionController.addTransaction);
router.put(
  '/transactions/:id',
  auth,
  transactionController.updateTransactionById
);
router.delete(
  '/transactions/:id',
  auth,
  transactionController.deleteTransaction
);

export default router;
