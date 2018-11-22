import { action, observable, computed } from "mobx";
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
      this.farmerPlotClearingCostPerMinute =
        (this.farmersCostSinceLastInterval / interval) * 60000;

      this.potatoesPlantedSinceLastInterval = 0;
      this.farmersCostSinceLastInterval = 0;
      this.potatoesHarvestedSinceLastInterval = 0;
    }, interval);
  }

  @observable potatoesPlantedPerMinute = 0;
  private potatoesPlantedSinceLastInterval = 0;

  @observable potatoesHarvestedPerMinute = 0;
  private potatoesHarvestedSinceLastInterval = 0;

  @observable farmerPlotClearingCostPerMinute = 0;
  private farmersCostSinceLastInterval = 0;

  @action
  plantPotatoes = (n: number) => {
    this.potatoesPlantedSinceLastInterval += n;
  };

  @action
  farmersClearCost = (n: number) => {
    this.farmersCostSinceLastInterval += n;
  };

  @action
  harvestPotatoes = (n: number) => {
    this.potatoesHarvestedSinceLastInterval += n;
  };
}
