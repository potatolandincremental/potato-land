"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Type;
(function (Type) {
    Type["MED"] = "0";
    Type["REC"] = "1";
})(Type = exports.Type || (exports.Type = {}));
exports.typeValue = (type) => {
    return type == "0" ? "Medical" : "Recreational";
};
//# sourceMappingURL=utils.js.map