import { action, observable } from "mobx";
import _ = require("lodash");

export interface merchantStoreProps {
  merchantStore?: merchantStore;
}
export class merchantStore {
  constructor() {
    setInterval(() => {
      this.merchants;
      const properties = ["merchants", "merchantsPercentPotatoSalePocketed"];
      localStorage.setItem("merchantStore", JSON.stringify(this));
      localStorage.setItem(
        "merchantStoreProperties",
        JSON.stringify(properties)
      );
    }, 10000);
  }

  @observable merchants = 0;

  @observable merchantsPercentPotatoSalePocketed = 0.5; //need to figure out if this is good

  @observable merchantSaleRate = 2000; //2s to start, will be able to buy upgrades

  @action
  addMerchants = (quantity: number) => {
    this.merchants += quantity;
  };

  //   @action
  //   removeMerchants = (quantity: number) => this.addMerchants(-quantity);
}
