"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const react_router_dom_1 = require("react-router-dom");
const PotatoFarm_1 = require("../potatoFarm/PotatoFarm");
const potatoFarmStore_1 = require("../../store/potatoFarmStore");
const Navigation_1 = require("./Navigation");
const moneyStore_1 = require("../../store/moneyStore");
const Store_1 = require("../store/Store");
const moneyStore = new moneyStore_1.MoneyStore();
const potatoFarmStore = new potatoFarmStore_1.PotatoFarmStore(moneyStore);
const stores = {
    potatoFarmStore,
    moneyStore
};
const loadStore = (name) => {
    const persistedStore = JSON.parse(localStorage.getItem(name));
    const properties = JSON.parse(localStorage.getItem(`${name}Properties`));
    if (persistedStore) {
        for (let property of properties) {
            // console.log(property);
            // console.log(persistedStore[property]);
            stores[name][property] = persistedStore[property];
        }
    }
};
class App extends React.Component {
    constructor(props) {
        super(props);
        loadStore("potatoFarmStore");
        loadStore("moneyStore");
    }
    render() {
        return (React.createElement(react_router_dom_1.HashRouter, null,
            React.createElement(mobx_react_1.Provider, Object.assign({}, stores),
                React.createElement("div", null,
                    React.createElement(Navigation_1.Navigation, null),
                    React.createElement(react_router_dom_1.Switch, null,
                        React.createElement(react_router_dom_1.Route, { path: "/potatoFarm", component: PotatoFarm_1.PotatoFarm }),
                        React.createElement(react_router_dom_1.Route, { path: "/store", component: Store_1.Store }),
                        React.createElement(react_router_dom_1.Route, { component: PotatoFarm_1.PotatoFarm }))))));
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map