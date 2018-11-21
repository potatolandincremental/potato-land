"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
exports.Div = styled_components_1.default.div `
  font-family: "Roboto";
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  flex-wrap: wrap;
`;
exports.FullWidthContainer = styled_components_1.default.div `
  position: fixed;
  left: 0px;
  top: 0px;
  opacity: 0.7;
  z-index: 1000;
  background-color: white;
  opacity: 0.6;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
`;
exports.ColumnDiv = styled_components_1.default(exports.Div) `
  flex-direction: column;
`;
exports.DivWrapper = styled_components_1.default(exports.Div) `
  width: 100%;
`;
exports.DivWrapperMaxWidth = styled_components_1.default(exports.Div) `
  max-width: 960px;
`;
exports.RowDiv = styled_components_1.default(exports.Div) `
  flex-wrap: wrap;
  flex-direction: row;
`;
exports.color = "rgb(101, 155, 77)";
exports.darkColor = "rgb(57, 99, 39)";
exports.fontColor = `color: ${exports.color}`;
exports.hoverUnderline = `&:hover {
    text-decoration:underline;
  }`;
exports.P = styled_components_1.default.p `
  padding: 2px;
  margin: 0px;
  width: 100%;
  text-align: center;
`;
exports.Spacer = styled_components_1.default(exports.P) `
  height: 10px;
`;
exports.A = styled_components_1.default.a `
  padding: 10px;
  font-size: 15pt;
  text-decoration: none;
  ${exports.fontColor};
  ${exports.hoverUnderline};
  cursor: pointer;
`;
exports.Green = styled_components_1.default.span `
  margin: 0;
  padding: 10px;
  font-size: 15pt;
  ${exports.fontColor};
`;
//# sourceMappingURL=styles.js.map