"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const FreePotato_1 = require("./FreePotato");
const styles_1 = require("../styles/styles");
const PotatoPlot_1 = require("./PotatoPlot");
let PotatoFarm = class PotatoFarm extends React.Component {
    render() {
        return (React.createElement(styles_1.ColumnDiv, null,
            React.createElement(styles_1.RowDiv, null, "Potato Farm"),
            React.createElement(styles_1.ColumnDiv, null,
                React.createElement(styles_1.RowDiv, null, "Free Potatoes"),
                React.createElement(FreePotato_1.FreePotato, null)),
            React.createElement(styles_1.ColumnDiv, null,
                React.createElement(styles_1.RowDiv, null, "Potato Plots"),
                React.createElement(PotatoPlot_1.PotatoPlot, null))));
    }
};
PotatoFarm = __decorate([
    mobx_react_1.inject("potatoFarmStore"),
    mobx_react_1.observer
], PotatoFarm);
exports.PotatoFarm = PotatoFarm;
//# sourceMappingURL=PotatoFarm.js.map