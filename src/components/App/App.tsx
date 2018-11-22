import { Provider } from "mobx-react";
import * as React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { MoneyStore } from "../../store/moneyStore";
import { PotatoFarmStore } from "../../store/potatoFarmStore";
import { PotatoFarm } from "../potatoFarm/PotatoFarm";
import { Store } from "../store/Store";
import Navigation from "./Navigation";

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
