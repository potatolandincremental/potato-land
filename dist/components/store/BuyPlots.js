"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styles_1 = require("../styles/styles");
const mobx_react_1 = require("mobx-react");
const potatoImg = require("../../images/potato.jpg");
let BuyPlots = class BuyPlots extends React.Component {
    constructor() {
        super(...arguments);
        this.changeText = (e) => {
            this.setState({ quantity: parseInt(e.currentTarget.value) });
        };
    }
    componentWillMount() {
        this.setState({ quantity: 1 });
    }
    render() {
        return (React.createElement(styles_1.ColumnDiv, null,
            React.createElement(styles_1.RowDiv, null, "Potato Plots"),
            React.createElement("button", { onClick: () => {
                    this.props.potatoFarmStore.buyPlots(this.state.quantity);
                } },
                "Buy ",
                this.state.quantity,
                " Plots (",
                this.props.potatoFarmStore.plotCost.toFixed(2),
                "/ea)"),
            "Number to buy:",
            React.createElement("input", { type: "text", onChange: this.changeText })));
    }
};
BuyPlots = __decorate([
    mobx_react_1.inject("potatoFarmStore"),
    mobx_react_1.observer
], BuyPlots);
exports.BuyPlots = BuyPlots;
//# sourceMappingURL=BuyPlots.js.map