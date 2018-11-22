import React = require("react");
import Statistics from "./Statistics";
import { RowDiv } from "../styles/styles";
import Inventory from "./Inventory";

export default class InventoryAndStatistics extends React.Component {
  render() {
    return (
      <RowDiv>
        <Inventory />
        <Statistics />
      </RowDiv>
    );
  }
}
