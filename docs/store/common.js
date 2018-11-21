"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
let firstRun = true;
function autoSave(store, name, exec) {
    // will run on change
    mobx_1.autorun(() => {
        exec();
        // on load check if there's an existing store on localStorage and extend the store
        if (firstRun) {
            const existingStore = localStorage.getItem(name);
            // console.log(JSON.stringify(toJS(existingStore)));
            if (existingStore) {
                mobx_1.extendObservable(store, existingStore);
            }
        }
        // from then on serialize and save to localStorage
        localStorage.setItem(name, mobx_1.toJS(store));
    });
    firstRun = false;
}
exports.autoSave = autoSave;
//# sourceMappingURL=common.js.map