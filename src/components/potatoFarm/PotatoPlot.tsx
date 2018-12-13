import { inject, observer } from "mobx-react";
import * as React from "react";
import styled from "styled-components";
import { PotatoFarmStoreProps } from "../../store/potatoFarmStore";
import { Div } from "../styles/styles";

interface State {
  quantity: number;
}

@inject("potatoFarmStore")
@observer
export class PotatoPlot extends React.Component<PotatoFarmStoreProps, State> {
  count = () => {
    return (
      <CountDiv>{`${this.props.potatoFarmStore.plantedPotatoes}/${
        this.props.potatoFarmStore.plots
      }`}</CountDiv>
    );
  };
  render() {
    return this.props.potatoFarmStore.plantedPotatoes > 0 ? (
      this.props.potatoFarmStore.plotsReady ? (
        <FilledPlotReady
          onClick={() =>
            this.props.potatoFarmStore.harvestPlots(
              this.props.potatoFarmStore.plantedPotatoes
            )
          }
        >
          {this.count()}
        </FilledPlotReady>
      ) : (
        <FilledPlot>{this.count()}</FilledPlot>
      )
    ) : (
      <EmptyPlot>{this.count()}</EmptyPlot>
    );
  }
}

const PlotPiece = styled.div`
  width: 100px;
  height: 100px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilledPlot = styled(PlotPiece)`
  border: 1px solid rgb(188, 100, 0);
  background: repeating-linear-gradient(
    45deg,
    rgb(188, 100, 0),
    rgb(188, 100, 0) 10px,
    white 10px,
    white 20px
  );
`;

const FilledPlotReady = styled(PlotPiece)`
  border: 1px solid green;
  background: repeating-linear-gradient(
    45deg,
    green,
    green 10px,
    white 10px,
    white 20px
  );
  cursor: pointer;
`;

const EmptyPlot = styled(PlotPiece)`
  border: 1px solid #000000;
`;

const CountDiv = styled(Div)`
  background-color: white;
  opacity: 0.7;
  border-radius: 6px;
  padding: 5px;
`;
