/* eslint-disable no-unused-vars */
export default class Transaction {

    constructor(id, { text = '', amount = 0 ,  date = new Date() } = {}) {
      if (id) this.id = id;
      this.text = text;
      this.amount = amount;
      this.date = date;
    }
  }