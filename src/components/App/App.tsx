import * as React from "react";
import { Provider } from "mobx-react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import { PotatoFarm } from "../potatoFarm/PotatoFarm";
import { PotatoFarmStore } from "../../store/potatoFarmStore";
import Navigation from "./Navigation";
import { MoneyStore } from "../../store/moneyStore";
import { Store } from "../store/Store";

const moneyStore = new MoneyStore();
const potatoFarmStore = new PotatoFarmStore(moneyStore);

const stores = {
  potatoFarmStore,
  moneyStore
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
  }
  render() {
    return (
      <HashRouter>
        <Provider {...stores}>
          <div>
            <Navigation />
            <Switch>
              <Route path="/potatoFarm" component={PotatoFarm} />
              <Route path="/store" component={Store} />

              <Route component={PotatoFarm} />
            </Switch>
          </div>
        </Provider>
      </HashRouter>
    );
  }
}
