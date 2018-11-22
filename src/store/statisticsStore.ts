import { action, observable } from "mobx";
import _ = require("lodash");

export interface StatisticsStoreProps {
  statisticsStore?: StatisticsStore;
}

const getMillis = () => {
  return new Date().getMilliseconds();
};
export class StatisticsStore {
  constructor() {
    setInterval(() => {
      this.potatoesPlantedPerMinute;
      this.farmerPlotClearingCostPerMinute;
      const properties = [
        "potatoesPlantedPerMinute",
        "farmerPlotClearingCostPerMinute",
        "potatoesPlantedSinceLastInterval",
        "farmersSinceLastInterval"
      ];
      localStorage.setItem("statisticsStore", JSON.stringify(this));
      localStorage.setItem(
        "statisticsStoreProperties",
        JSON.stringify(properties)
      );
    }, 10000);

    //set interval to update statistics
    const interval = 10000;
    setInterval(() => {
      this.potatoesPlantedPerMinute =
        (this.potatoesPlantedSinceLastInterval / interval) * 60000;

      this.potatoesHarvestedPerMinute =
        (this.potatoesHarvestedSinceLastInterval / interval) * 60000;

      this.potatoesSoldPerMinute =
        (this.potatoesSoldSinceLastInterval / interval) * 60000;

      this.potatoesMoneySoldPerMinute =
        (this.potatoesMoneySoldSinceLastInterval / interval) * 60000;

      this.farmerPlotClearingCostPerMinute =
        (this.farmersCostSinceLastInterval / interval) * 60000;

      this.merchantCostPerMinute =
        (this.merchantCostSinceLastInterval / interval) * 60000;

      this.potatoesPlantedSinceLastInterval = 0;
      this.farmersCostSinceLastInterval = 0;
      this.potatoesHarvestedSinceLastInterval = 0;
      this.potatoesSoldSinceLastInterval = 0;
      this.potatoesMoneySoldSinceLastInterval = 0;
      this.merchantCostSinceLastInterval = 0;
    }, interval);
  }

  @observable potatoesPlantedPerMinute = 0;
  private potatoesPlantedSinceLastInterval = 0;

  @observable potatoesHarvestedPerMinute = 0;
  private potatoesHarvestedSinceLastInterval = 0;

  @observable potatoesSoldPerMinute = 0;
  private potatoesSoldSinceLastInterval = 0;

  @observable potatoesMoneySoldPerMinute = 0;
  private potatoesMoneySoldSinceLastInterval = 0;

  @observable farmerPlotClearingCostPerMinute = 0;
  private farmersCostSinceLastInterval = 0;

  @observable merchantCostPerMinute = 0;
  private merchantCostSinceLastInterval = 0;

  @action
  plantPotatoes = (n: number) => {
    this.potatoesPlantedSinceLastInterval += n;
  };

  @action
  sellPotatoes = (n: number) => {
    this.potatoesSoldSinceLastInterval += n;
  };

  @action
  sellPotatoesMoney = (n: number) => {
    this.potatoesMoneySoldSinceLastInterval += n;
  };

  @action
  farmersClearCost = (n: number) => {
    this.farmersCostSinceLastInterval += n;
  };

  @action
  harvestPotatoes = (n: number) => {
    this.potatoesHarvestedSinceLastInterval += n;
  };

  @action
  addMerchantCost = (n: number) => {
    this.merchantCostSinceLastInterval += n;
  };

  // getTotalValue = (arr: Array<number>) => {
  //   const maxArrElements = 60;
  //   const numElements = arr.length;
  //   const numerator = _.reduce(
  //     arr,
  //     (acc, val) => {
  //       return (acc += val);
  //     },
  //     0
  //   );

  //   return numerator / numElements;
  // };
}
