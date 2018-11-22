import { action, observable } from "mobx";
import { MoneyStore } from "./moneyStore";
import _ = require("lodash");

export interface PotatoFarmStoreProps {
  potatoFarmStore?: PotatoFarmStore;
}
export class PotatoFarmStore {
  constructor(private moneyStore: MoneyStore) {
    this.setPlotTimeout();
    setInterval(() => {
      this.freePotatoes;
      this.plots;
      this.timeElapsed;
      const properties = [
        "freePotatoes",
        "plantedPotatoes",
        "plots",
        "growthFactor",
        "plotsReady",
        "plotsTime",
        "timeElapsed",
        "potatoCost",
        "plotCost",
        "farmers",
        "farmerFieldClearCost"
      ];
      localStorage.setItem("potatoFarmStore", JSON.stringify(this));
      localStorage.setItem(
        "potatoFarmStoreProperties",
        JSON.stringify(properties)
      );
      console.log("Saved");
    }, 10000);
  }

  @observable freePotatoes = 1;

  //potatoes planted currently <= plots
  @observable plantedPotatoes = 0;

  //each plot accepts 1 potato and grows `growthFactor` potatoes
  @observable plots = 1;

  //initially 1 potato grows 3 potatoes, which can be updated
  @observable growthFactor = 3;

  //are the plots ready to harvest? restarts when anything is farmed
  @observable plotsReady = false;

  @observable plotsTime = 2000; //2 seconds initially

  @observable timeElapsed = 0;

  @observable potatoCost = 0.1; //can vary throughout...

  @observable plotCost = 0.5;

  @observable farmerFieldClearCost = 0.1; //need to adjust after testing... $0.10 per field to clear

  @observable farmerCost = 5.0; //cost to purchase a farmer in general

  @observable farmers = 0;

  //should farmers charge to plant potatoes too?
  @action
  farmerPlant = () => {
    //each farmer will plant in only one plot
    const availablePlots = this.plots - this.plantedPotatoes;
    const potatoesToPlant = Math.min(
      availablePlots,
      this.freePotatoes,
      this.farmers
    );

    if (potatoesToPlant == 0) {
      return;
    }

    this.freePotatoes -= potatoesToPlant;
    this.plantedPotatoes += potatoesToPlant;
    this.plotsReady = false;
    this.timeElapsed = 0;
    this.setPlotTimeout();
  };

  @action
  buyFarmers = (n: number) => {
    // console.log("farmers", this.farmers);
    if (this.moneyStore.money == 0) {
      return;
    }

    const currentFarmers = this.farmers; //if 0, we need to tell them to plant for the first time

    const cost = n * this.farmerCost;
    const currentMoney = this.moneyStore.money;

    //n is more than the number of plots available, just use the max plots...
    if (cost > currentMoney) {
      const maxCanBuy = Math.floor(currentMoney / this.farmerCost);
      const realCost = maxCanBuy * this.farmerCost;
      this.moneyStore.removeMoney(realCost);
      this.farmers += maxCanBuy;
      this.farmerPlant();
      return;
    }

    this.moneyStore.removeMoney(cost);
    this.farmers += n;
    this.farmerPlant();
    return;
  };

  @action
  buyPlots = (n: number) => {
    if (this.moneyStore.money == 0) {
      return;
    }

    const cost = n * this.plotCost;
    const currentMoney = this.moneyStore.money;

    //n is more than the number of plots available, just use the max plots...
    if (cost > currentMoney) {
      const maxCanBuy = Math.floor(currentMoney / this.plotCost);
      const realCost = maxCanBuy * this.plotCost;
      this.moneyStore.removeMoney(realCost);
      this.plots += maxCanBuy;
      return;
    }

    this.moneyStore.removeMoney(cost);
    this.plots += n;
    return;
  };

  @action
  sellPotatoes = (n: number) => {
    if (this.freePotatoes == 0) {
      return;
    }

    this.farmerPlant();

    const currentPlantedPotatoes = this.plantedPotatoes;
    //n is more than the number of plots available, just use the max plots...
    if (n > this.freePotatoes) {
      this.freePotatoes -= this.freePotatoes;
      this.moneyStore.addMoney(this.potatoCost * this.freePotatoes);
      return;
    }

    this.freePotatoes -= n;
    this.moneyStore.addMoney(this.potatoCost * n);
    return;
  };

  @action
  harvestPlots = (n: number) => {
    if (!this.plotsReady) {
      return;
    }

    const currentPlantedPotatoes = this.plantedPotatoes;
    //n is more than the number of plots available, just use the max plots...
    if (n > this.plantedPotatoes) {
      const quantity = -this.growthFactor * this.plantedPotatoes;
      this.mutateFarmState(quantity);
      this.plantedPotatoes = currentPlantedPotatoes - quantity;
      return;
    }

    //there are more plots than there are being harvested

    const quantity = -this.growthFactor * n;
    this.mutateFarmState(quantity);
    this.plantedPotatoes = currentPlantedPotatoes - n;
    return;
  };

  @action
  setPlotTimeout = () => {
    const plotTimeout = () => {
      const nextTime = this.timeElapsed + 1000;
      if (nextTime >= this.plotsTime) {
        this.plotsReady = true;
        if (this.farmers == 0 || this.moneyStore.money == 0) {
          return;
        }
        //if there are farmers, let them harvest if we have enough money
        const maxPlotsCanHarvest = Math.min(
          Math.floor(this.moneyStore.money / this.farmerFieldClearCost),
          this.plantedPotatoes,
          this.farmers
        );
        const costToHarvest = maxPlotsCanHarvest * this.farmerFieldClearCost;

        this.moneyStore.removeMoney(costToHarvest);
        this.freePotatoes += maxPlotsCanHarvest * this.growthFactor;
        this.plantedPotatoes -= maxPlotsCanHarvest;

        if (this.plantedPotatoes == 0) {
          setTimeout(this.farmerPlant, 2000);
          return;
        }
      }

      this.timeElapsed = nextTime;
      setTimeout(plotTimeout, 1000);
    };

    setTimeout(plotTimeout, 1000);
  };

  mutateFarmState = (amount: number) => {
    this.freePotatoes -= amount;
    this.plantedPotatoes += amount;
    this.plotsReady = false;
    this.timeElapsed = 0;
    this.setPlotTimeout();
  };

  @action
  plantPotatoes = (n: number) => {
    if (n == 0 || this.freePotatoes == 0) {
      return;
    }
    const freePlots = this.plots - this.plantedPotatoes;
    //n is more than the number of potatoes available, just use the max...
    if (n > this.freePotatoes) {
      //there are more potatoes than plots
      if (freePlots < this.freePotatoes) {
        this.mutateFarmState(freePlots);
        return;
      }
      //there are more plots than potatoes
      this.mutateFarmState(this.freePotatoes);
      return;
    }

    //n is less than or equal to the number of potatoes available
    if (freePlots < n) {
      this.mutateFarmState(freePlots);
      return;
    }
    //there are more plots than potatoes
    this.mutateFarmState(n);
    return;
  };

  // @computed
  // get listMed() {
  //   return this.deals.filter(deal => deal.type == Type.MED);
  // }
}
