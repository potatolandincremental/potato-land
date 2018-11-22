import * as React from "react";
import { PotatoFarmStore } from "../../store/potatoFarmStore";
import { ColumnDiv } from "../styles/styles";
import BuyFarmers from "./BuyFarmers";
import BuyPlots from "./BuyPlots";
import { Paper } from "@material-ui/core";

interface Props {
  potatoFarmStore?: PotatoFarmStore;
}

export class Store extends React.Component<Props> {
  render() {
    return (
      <ColumnDiv>
        <Paper>
          <ColumnDiv>
            <BuyPlots />
          </ColumnDiv>
          <ColumnDiv>
            <BuyFarmers />
          </ColumnDiv>
        </Paper>
      </ColumnDiv>
    );
  }
}
