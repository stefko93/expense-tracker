import express from 'express';
import { userController } from '../controllers/userController';
import { expenseController } from '../controllers/expenseController';
import { incomeController } from '../controllers/incomeController';
import { transactionController } from '../controllers/transactionController';
import { paymentController } from '../controllers/paymentController';
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

router.get('/payments', auth, paymentController.getPayments);
router.post('/payments', auth, paymentController.addPayment);

router.get('/incomes', auth, incomeController.getIncomes);
router.post('/incomes', incomeController.getIncomes);
// router.put('/incomes/:id', productController.updateIncome);
// router.delete('/incomes/:id', productController.deleteIncome);

router.get('/expenses', auth, expenseController.getExpenses);
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
