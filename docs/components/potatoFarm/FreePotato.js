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
const styled_components_1 = require("styled-components");
const mobx_react_1 = require("mobx-react");
const potatoImg = require("../../images/potato.jpg");
let FreePotato = class FreePotato extends React.Component {
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
            React.createElement(ImgDiv, null,
                React.createElement(CountDiv, null, this.props.potatoFarmStore.freePotatoes)),
            React.createElement("button", null, "Eat"),
            React.createElement("button", { onClick: () => this.props.potatoFarmStore.plantPotatoes(this.state.quantity) },
                "Plant ",
                this.state.quantity),
            React.createElement("button", { onClick: () => {
                    this.props.potatoFarmStore.sellPotatoes(this.state.quantity);
                } },
                "Sell ",
                this.state.quantity,
                " ($",
                this.props.potatoFarmStore.potatoCost.toFixed(2),
                "/ea)",
                " "),
            "Number:",
            React.createElement("input", { type: "text", onChange: this.changeText })));
    }
};
FreePotato = __decorate([
    mobx_react_1.inject("potatoFarmStore"),
    mobx_react_1.observer
], FreePotato);
exports.FreePotato = FreePotato;
const ImgDiv = styled_components_1.default(styles_1.Div) `
  width: 100px;
  height:100px;
  background: url("${potatoImg}") no-repeat center;
  background-size: 100%;
`;
const CountDiv = styled_components_1.default(styles_1.Div) `
  background-color: white;
  opacity: 0.7;
  border-radius: 6px;
  padding: 5px;
`;
//# sourceMappingURL=FreePotato.js.map