import * as React from "react";
import { PotatoFarmStore } from "../../store/potatoFarmStore";
import { inject, observer } from "mobx-react";
import FreePotato from "./FreePotato";
import { RowDiv, ColumnDiv } from "../styles/styles";
import { PotatoPlot } from "./PotatoPlot";

interface Props {
  potatoFarmStore?: PotatoFarmStore;
}

@inject("potatoFarmStore")
@observer
export class PotatoFarm extends React.Component<Props> {
  render() {
    return (
      <ColumnDiv>
        <ColumnDiv>
          <FreePotato />
        </ColumnDiv>
        <ColumnDiv>
          <RowDiv>Potato Plots</RowDiv>
          <PotatoPlot />
        </ColumnDiv>
      </ColumnDiv>
    );
  }
}
