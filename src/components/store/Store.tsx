import * as React from "react";
import { PotatoFarmStore } from "../../store/potatoFarmStore";
import { ColumnDiv, RowDiv } from "../styles/styles";
import BuyFarmers from "./BuyFarmers";
import BuyPlots from "./BuyPlots";
import { Paper } from "@material-ui/core";
import BuyMerchants from "./BuyMerchants";
import BuyBuckets from "./BuyBuckets";

interface Props {
  potatoFarmStore?: PotatoFarmStore;
}

export class Store extends React.Component<Props> {
  render() {
    return (
      <RowDiv>
        <Paper>
          <ColumnDiv>
            <BuyPlots />
          </ColumnDiv>
          <ColumnDiv>
            <BuyFarmers />
          </ColumnDiv>
        </Paper>
        <Paper>
          <ColumnDiv>
            <BuyMerchants />
          </ColumnDiv>
          <ColumnDiv>
            <BuyBuckets />
          </ColumnDiv>
        </Paper>
      </RowDiv>
    );
  }
}
