"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styles_1 = require("../styles/styles");
const BuyPlots_1 = require("./BuyPlots");
const BuyFarmers_1 = require("./BuyFarmers");
class Store extends React.Component {
    render() {
        return (React.createElement(styles_1.ColumnDiv, null,
            React.createElement(styles_1.RowDiv, null, "Store"),
            React.createElement(styles_1.ColumnDiv, null,
                React.createElement(BuyPlots_1.BuyPlots, null)),
            React.createElement(styles_1.ColumnDiv, null,
                React.createElement(BuyFarmers_1.BuyFarmers, null))));
    }
}
exports.Store = Store;
//# sourceMappingURL=Store.js.map