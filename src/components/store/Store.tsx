import * as React from "react";
import { PotatoFarmStore } from "../../store/potatoFarmStore";
import { inject, observer } from "mobx-react";
import { RowDiv, ColumnDiv } from "../styles/styles";
import { BuyPlots } from "./BuyPlots";
import { BuyFarmers } from "./BuyFarmers";

interface Props {
  potatoFarmStore?: PotatoFarmStore;
}

export class Store extends React.Component<Props> {
  render() {
    return (
      <ColumnDiv>
        <RowDiv>Store</RowDiv>
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
