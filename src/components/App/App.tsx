import { Provider } from "mobx-react";
import * as React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { MoneyStore } from "../../store/moneyStore";
import { PotatoFarmStore } from "../../store/potatoFarmStore";
import { PotatoFarm } from "../potatoFarm/PotatoFarm";
import { Store } from "../store/Store";
import { FullWidthContainer } from "../styles/styles";
import Navigation from "./Navigation";
import InventoryAndStatistics from "../inventoryAndStats/InventoryAndStatistics";
import { StatisticsStore } from "../../store/statisticsStore";
import { MerchantStore } from "../../store/merchantStore";
import { StoreStore } from "../../store/storeStore";

const moneyStore = new MoneyStore();
const statisticsStore = new StatisticsStore();
const potatoFarmStore = new PotatoFarmStore(moneyStore, statisticsStore);
const merchantStore = new MerchantStore(
  moneyStore,
  potatoFarmStore,
  statisticsStore
);
const storeStore = new StoreStore();

const stores = {
  potatoFarmStore,
  moneyStore,
  statisticsStore,
  merchantStore,
  storeStore
};

const loadStore = (name: string) => {
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

export class App extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
    loadStore("potatoFarmStore");
    loadStore("moneyStore");
    loadStore("statisticsStore");
    loadStore("merchantStore");
    loadStore("storeStore");
  }
  render() {
    return (
      <HashRouter>
        <Provider {...stores}>
          <FullWidthContainer>
            <Navigation />
            <Switch>
              <Route path="/potatoFarm" component={PotatoFarm} />
              <Route path="/store" component={Store} />
              <Route
                path="/inventoryAndStatistics"
                component={InventoryAndStatistics}
              />

              <Redirect to={"/potatoFarm"} />
            </Switch>
          </FullWidthContainer>
        </Provider>
      </HashRouter>
    );
  }
}
