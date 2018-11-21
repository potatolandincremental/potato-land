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
let PotatoPlot = class PotatoPlot extends React.Component {
    constructor() {
        super(...arguments);
        this.plots = () => {
            // console.log(this.props.potatoFarmStore.plantedPotatoes);
            return [...Array(this.props.potatoFarmStore.plots).keys()].map(i => {
                return this.props.potatoFarmStore.plantedPotatoes > i ? (this.props.potatoFarmStore.plotsReady ? (React.createElement(FilledPlotReady, { key: i, onClick: () => this.props.potatoFarmStore.harvestPlots(this.props.potatoFarmStore.plantedPotatoes) })) : (React.createElement(FilledPlot, { key: i }))) : (React.createElement(EmptyPlot, { key: i }));
            });
        };
    }
    render() {
        return React.createElement(styles_1.Div, null, this.plots());
    }
};
PotatoPlot = __decorate([
    mobx_react_1.inject("potatoFarmStore"),
    mobx_react_1.observer
], PotatoPlot);
exports.PotatoPlot = PotatoPlot;
const PlotPiece = styled_components_1.default.div `
  width: 100px;
  height: 100px;
`;
const FilledPlot = styled_components_1.default(PlotPiece) `
  border: 1px solid rgb(188, 100, 0);
  background: repeating-linear-gradient(
    45deg,
    rgb(188, 100, 0),
    rgb(188, 100, 0) 10px,
    white 10px,
    white 20px
  );
`;
const FilledPlotReady = styled_components_1.default(PlotPiece) `
  border: 1px solid green;
  background: repeating-linear-gradient(
    45deg,
    green,
    green 10px,
    white 10px,
    white 20px
  );
  cursor: pointer;
`;
const EmptyPlot = styled_components_1.default(PlotPiece) `
  border: 1px solid #000000;
`;
const CountDiv = styled_components_1.default(styles_1.Div) `
  background-color: white;
  opacity: 0.7;
  border-radius: 6px;
  padding: 5px;
`;
//# sourceMappingURL=PotatoPlot.js.map