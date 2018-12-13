import * as React from "react";
import { PotatoFarmStore } from "../../store/potatoFarmStore";
import { inject, observer } from "mobx-react";
import FreePotato from "./FreePotato";
import { RowDiv, ColumnDiv } from "../styles/styles";
import { PotatoPlot } from "./PotatoPlot";
import { Paper } from "@material-ui/core";
import { PotatoPlotIndividual } from "./PotatoPlotIndividual.1";

interface Props {
  potatoFarmStore?: PotatoFarmStore;
}

@inject("potatoFarmStore")
@observer
export class PotatoFarm extends React.Component<Props> {
  render() {
    return (
      <ColumnDiv>
        <Paper>
          <ColumnDiv>
            <FreePotato />
          </ColumnDiv>
          <ColumnDiv>
            <RowDiv>Potato Plots</RowDiv>
            {this.props.potatoFarmStore.plots >= 200 ? (
              <PotatoPlot />
            ) : (
              <PotatoPlotIndividual />
            )}
          </ColumnDiv>
        </Paper>
      </ColumnDiv>
    );
  }
}
