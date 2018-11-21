"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
class PotatoFarmStore {
    constructor(moneyStore) {
        this.moneyStore = moneyStore;
        this.freePotatoes = 1;
        //potatoes planted currently <= plots
        this.plantedPotatoes = 0;
        //each plot accepts 1 potato and grows `growthFactor` potatoes
        this.plots = 1;
        //initially 1 potato grows 3 potatoes, which can be updated
        this.growthFactor = 3;
        //are the plots ready to harvest? restarts when anything is farmed
        this.plotsReady = false;
        this.plotsTime = 2000; //2 seconds initially
        this.timeElapsed = 0;
        this.potatoCost = 0.1; //can vary throughout...
        this.plotCost = 0.5;
        this.farmerFieldClearCost = 0.1; //need to adjust after testing... $0.10 per field to clear
        this.farmerCost = 5.0; //cost to purchase a farmer in general
        this.farmers = 0;
        //should farmers charge to plant potatoes too?
        this.farmerPlant = () => {
            //each farmer will plant in only one plot
            const availablePlots = this.plots - this.plantedPotatoes;
            const potatoesToPlant = Math.min(availablePlots, this.freePotatoes, this.farmers);
            if (potatoesToPlant == 0) {
                return;
            }
            this.freePotatoes -= potatoesToPlant;
            this.plantedPotatoes += potatoesToPlant;
            this.plotsReady = false;
            this.timeElapsed = 0;
            setTimeout(this.setPlotTimeout, 00);
        };
        this.buyFarmers = (n) => {
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
        this.buyPlots = (n) => {
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
        this.sellPotatoes = (n) => {
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
        this.harvestPlots = (n) => {
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
        this.setPlotTimeout = () => {
            const plotTimeout = () => {
                const nextTime = this.timeElapsed + 1000;
                if (nextTime >= this.plotsTime) {
                    this.plotsReady = true;
                    if (this.farmers == 0 || this.moneyStore.money == 0) {
                        return;
                    }
                    //if there are farmers, let them harvest if we have enough money
                    const maxPlotsCanHarvest = Math.min(Math.floor(this.moneyStore.money / this.farmerFieldClearCost), this.plantedPotatoes, this.farmers);
                    const costToHarvest = maxPlotsCanHarvest * this.farmerFieldClearCost;
                    this.moneyStore.removeMoney(costToHarvest);
                    this.freePotatoes += maxPlotsCanHarvest * this.growthFactor;
                    this.plantedPotatoes -= maxPlotsCanHarvest;
                    if (this.plantedPotatoes == 0) {
                        setTimeout(this.farmerPlant, 2000);
                    }
                    else {
                        setTimeout(plotTimeout, 2000);
                    }
                    return;
                }
                this.timeElapsed = nextTime;
                this.setPlotTimeout();
            };
            setTimeout(plotTimeout, 1000);
        };
        this.mutateFarmState = (amount) => {
            this.freePotatoes -= amount;
            this.plantedPotatoes += amount;
            this.plotsReady = false;
            this.timeElapsed = 0;
            this.setPlotTimeout();
        };
        this.plantPotatoes = (n) => {
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
            localStorage.setItem("potatoFarmStoreProperties", JSON.stringify(properties));
            console.log("Saved");
        }, 10000);
    }
}
__decorate([
    mobx_1.observable
], PotatoFarmStore.prototype, "freePotatoes", void 0);
__decorate([
    mobx_1.observable
], PotatoFarmStore.prototype, "plantedPotatoes", void 0);
__decorate([
    mobx_1.observable
], PotatoFarmStore.prototype, "plots", void 0);
__decorate([
    mobx_1.observable
], PotatoFarmStore.prototype, "growthFactor", void 0);
__decorate([
    mobx_1.observable
], PotatoFarmStore.prototype, "plotsReady", void 0);
__decorate([
    mobx_1.observable
], PotatoFarmStore.prototype, "plotsTime", void 0);
__decorate([
    mobx_1.observable
], PotatoFarmStore.prototype, "timeElapsed", void 0);
__decorate([
    mobx_1.observable
], PotatoFarmStore.prototype, "potatoCost", void 0);
__decorate([
    mobx_1.observable
], PotatoFarmStore.prototype, "plotCost", void 0);
__decorate([
    mobx_1.observable
], PotatoFarmStore.prototype, "farmerFieldClearCost", void 0);
__decorate([
    mobx_1.observable
], PotatoFarmStore.prototype, "farmerCost", void 0);
__decorate([
    mobx_1.observable
], PotatoFarmStore.prototype, "farmers", void 0);
__decorate([
    mobx_1.action
], PotatoFarmStore.prototype, "farmerPlant", void 0);
__decorate([
    mobx_1.action
], PotatoFarmStore.prototype, "buyFarmers", void 0);
__decorate([
    mobx_1.action
], PotatoFarmStore.prototype, "buyPlots", void 0);
__decorate([
    mobx_1.action
], PotatoFarmStore.prototype, "sellPotatoes", void 0);
__decorate([
    mobx_1.action
], PotatoFarmStore.prototype, "harvestPlots", void 0);
__decorate([
    mobx_1.action
], PotatoFarmStore.prototype, "setPlotTimeout", void 0);
__decorate([
    mobx_1.action
], PotatoFarmStore.prototype, "plantPotatoes", void 0);
exports.PotatoFarmStore = PotatoFarmStore;
//# sourceMappingURL=potatoFarmStore.js.map