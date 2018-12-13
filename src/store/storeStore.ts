import { action, observable } from "mobx";
import _ = require("lodash");

export interface StoreStoreProps {
  storeStore?: StoreStore;
}

interface Quantities {
  merchants: number;
  plots: number;
  farmers: number;
  buckets: number;
}
export class StoreStore {
  constructor() {
    setInterval(() => {
      this.quantities;

      const properties = ["merchants", "plots", "farmers", "buckets"];
      localStorage.setItem("storeStore", JSON.stringify(this));
      localStorage.setItem("storeStoreProperties", JSON.stringify(properties));
    }, 10000);
  }

  @observable quantities: Quantities = {
    merchants: 0,
    plots: 0,
    farmers: 0,
    buckets: 0
  };

  @action
  setString = <T extends keyof Quantities>(
    key: T,
    quantity: string
  ): Quantities[T] => {
    let num: number;

    if (quantity == "") {
      num = 0;
    } else if (parseInt(quantity) < 0) {
      num = 0;
    } else {
      num = parseInt(quantity);
    }

    this.quantities[key] = num;
    return this.quantities[key];
  };

  @action
  setNum = <T extends keyof Quantities>(
    key: T,
    quantity: number
  ): Quantities[T] => {
    let num: number;

    if (quantity < 0) {
      num = 0;
    } else {
      num = quantity;
    }

    this.quantities[key] = num;
    return this.quantities[key];
  };
}
