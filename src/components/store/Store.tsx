import * as React from "react";
import { PotatoFarmStore } from "../../store/potatoFarmStore";
import { ColumnDiv } from "../styles/styles";
import BuyFarmers from "./BuyFarmers";
import BuyPlots from "./BuyPlots";

interface Props {
  potatoFarmStore?: PotatoFarmStore;
}

export class Store extends React.Component<Props> {
  render() {
    return (
      <ColumnDiv>
        <ColumnDiv>
          <BuyPlots />
        </ColumnDiv>
        <ColumnDiv>
          <BuyFarmers />
        </ColumnDiv>
      </ColumnDiv>
    );
  }
}
