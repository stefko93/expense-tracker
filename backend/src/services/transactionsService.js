// import Transaction from '../models/Transaction';

// export const transactionsService = {
//   async getTransactions() {
//     try {
//       const transactions = await Transaction.find();
//       return {
//         status: 200,
//         message: 'get transactions from database',
//         transactions,
//       };
//     } catch (err) {
//       return {
//         status: 500,
//         error: err,
//       };
//     }
//   },

//   async addTransaction(data) {
//     try {
//       const transaction = await new Transaction({
//         text: data.text,
//         amount: data.amount,
//       });
//       await transaction.save();

//       return {
//         status: 204,
//         message: 'Transaction created',
//       };
//     } catch (err) {
//       return {
//         status: 500,
//         error: err,
//       };
//     }
//   },
// };
