import { autorun, extendObservable, toJS } from "mobx";

let firstRun = true;
export function autoSave(store, name: string, exec: () => void) {
  // will run on change
  autorun(() => {
    exec();
    // on load check if there's an existing store on localStorage and extend the store
    if (firstRun) {
      const existingStore = localStorage.getItem(name);
      // console.log(JSON.stringify(toJS(existingStore)));

      if (existingStore) {
        extendObservable(store, existingStore);
      }
    }

    // from then on serialize and save to localStorage
    localStorage.setItem(name, toJS(store));
  });

  firstRun = false;
}
