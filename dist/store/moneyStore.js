"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
class MoneyStore {
    constructor() {
        this.money = 0.0;
        this.addMoney = (quantity) => {
            this.money += quantity;
        };
        this.removeMoney = (quantity) => this.addMoney(-quantity);
        setInterval(() => {
            this.money;
            const properties = ["money"];
            localStorage.setItem("moneyStore", JSON.stringify(this));
            localStorage.setItem("moneyStoreProperties", JSON.stringify(properties));
        }, 10000);
    }
}
__decorate([
    mobx_1.observable
], MoneyStore.prototype, "money", void 0);
__decorate([
    mobx_1.action
], MoneyStore.prototype, "addMoney", void 0);
__decorate([
    mobx_1.action
], MoneyStore.prototype, "removeMoney", void 0);
exports.MoneyStore = MoneyStore;
//# sourceMappingURL=moneyStore.js.map