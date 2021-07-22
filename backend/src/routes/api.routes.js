import express from 'express';
import { userController } from '../controllers';

const cors = require('cors');

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// router.get('/users', userController.getUsers);
// router.get('/users/:id', userController.getUserById);
// router.post('/users/new', userController.registerUser);
// router.put('/users/:id', userController.updateUser);
// // router.delete('/users/:id', userController.deleteUser);

// router.get('/incomes', productController.getIncomes);
// router.get('/incomes/:id', productController.getIncomeById);
// router.post('/incomes/new', productController.createIncome);
// router.put('/incomes/:id', productController.updateIncome);
// // router.delete('/incomes/:id', productController.deleteIncome);

// router.get('/expenses', customerController.getExpenses);
// router.get('/expenses/:id', customerController.getExpenseById);
// router.post('/expenses/new', customerController.createExpense);
// router.put('/expenses/:id', customerController.updateExpense);
// // router.delete('/expenses/:id', customerController.deleteExpense);

// router.get('/transactions', orderController.getTransactions);
// router.get('/transactions/:id', orderController.getTransactionById);
// router.post('/transactions/new', orderController.createTransaction);
// router.put('/transactions/:id', orderController.updateTransaction);
// // router.delete(/customers/transactions/:id) => delete

export default router;
