import { action, observable } from "mobx";
import { MoneyStore } from "./moneyStore";
import { PotatoFarmStore } from "./potatoFarmStore";
import { StatisticsStore } from "./statisticsStore";
import _ = require("lodash");

export interface MerchantStoreProps {
  merchantStore?: MerchantStore;
}
export class MerchantStore {
  constructor(
    private moneyStore: MoneyStore,
    private potatoFarmStore: PotatoFarmStore,
    private statisticsStore: StatisticsStore
  ) {
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

    setInterval(() => {
      const potatoesToSell = Math.min(
        this.potatoFarmStore.freePotatoes - 2,
        this.potatoesSoldPerMerchant * this.merchants
      );
      this.potatoFarmStore.freePotatoes -= potatoesToSell;
      this.statisticsStore.sellPotatoes(potatoesToSell);
      const profit =
        this.potatoFarmStore.potatoCost *
        potatoesToSell *
        (1 - this.merchantsPercentPotatoSalePocketed);

      const merchantCost =
        this.potatoFarmStore.potatoCost *
        potatoesToSell *
        this.merchantsPercentPotatoSalePocketed;

      this.statisticsStore.sellPotatoesMoney(profit);
      this.statisticsStore.addMerchantCost(merchantCost);
      this.moneyStore.addMoney(profit);
    }, this.merchantSaleRate);
  }

  @observable merchants = 0;

  @observable merchantCost = 100; //need to figure this out too...

  @observable merchantsPercentPotatoSalePocketed = 0.5; //need to figure out if this is good

  @observable potatoesSoldPerMerchant = 5;

  @observable merchantSaleRate = 1000; //1s to start, will be able to buy upgrades

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
