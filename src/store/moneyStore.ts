import { action, observable } from "mobx";
import _ = require("lodash");

export interface MoneyStoreProps {
  moneyStore?: MoneyStore;
}
export class MoneyStore {
  constructor() {
    setInterval(() => {
      this.money;
      const properties = ["money"];
      localStorage.setItem("moneyStore", JSON.stringify(this));
      localStorage.setItem("moneyStoreProperties", JSON.stringify(properties));
    }, 10000);
  }

  @observable money = 0.0;

  @action
  addMoney = (quantity: number) => {
    this.money += quantity;
  };

  @action
  removeMoney = (quantity: number) => this.addMoney(-quantity);
}
