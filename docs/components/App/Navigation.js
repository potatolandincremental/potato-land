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
const react_router_dom_1 = require("react-router-dom");
let Navigation = class Navigation extends React.Component {
    constructor() {
        super(...arguments);
        this.getMoney = () => {
            const money = this.props.moneyStore.money;
            if (money == null) {
                return 0.0;
            }
            return money;
        };
    }
    render() {
        return (React.createElement(styles_1.ColumnDiv, null,
            React.createElement(styles_1.RowDiv, null,
                "Money: $",
                this.getMoney().toFixed(2)),
            React.createElement(styles_1.RowDiv, null,
                React.createElement(styles_1.RowDiv, null,
                    React.createElement(react_router_dom_1.Link, { to: '/potatoFarm' }, "Potato Farm")),
                React.createElement(styles_1.RowDiv, null,
                    React.createElement(react_router_dom_1.Link, { to: '/store' }, "Store")))));
    }
};
Navigation = __decorate([
    mobx_react_1.inject("moneyStore"),
    mobx_react_1.observer
], Navigation);
exports.Navigation = Navigation;
//# sourceMappingURL=Navigation.js.map