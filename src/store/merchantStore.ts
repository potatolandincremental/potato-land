import { action, observable } from "mobx";
import _ = require("lodash");
import { MoneyStore } from "./moneyStore";

export interface MerchantStoreProps {
  merchantStore?: MerchantStore;
}
export class MerchantStore {
  constructor(private moneyStore: MoneyStore) {
    setInterval(() => {
      this.merchants;
      const properties = [
        "merchants",
        "merchantsPercentPotatoSalePocketed",
        "merchantSaleRate"
      ];
      localStorage.setItem("merchantStore", JSON.stringify(this));
      localStorage.setItem(
        "merchantStoreProperties",
        JSON.stringify(properties)
      );
    }, 10000);
  }

  @observable merchants = 0;

  @observable merchantCost = 100; //need to figure this out too...

  @observable merchantsPercentPotatoSalePocketed = 0.5; //need to figure out if this is good

  @observable merchantSaleRate = 2000; //2s to start, will be able to buy upgrades

  @action
  buyMerchants = (quantity: number) => {
    const merchantsToPurchase = Math.min(
      quantity,
      Math.floor(this.moneyStore.money / this.merchantCost)
    );
    this.merchants += merchantsToPurchase;
    this.moneyStore.removeMoney(this.merchantCost * merchantsToPurchase);
  };

  //   @action
  //   removeMerchants = (quantity: number) => this.addMerchants(-quantity);
}
