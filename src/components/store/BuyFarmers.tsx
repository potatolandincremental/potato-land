import * as React from "react";
import { ColumnDiv, Div, FullWidthContainer, RowDiv } from "../styles/styles";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { PotatoFarmStoreProps } from "../../store/potatoFarmStore";
const potatoImg = require("../../images/potato.jpg");

interface State {
  quantity: number;
}

@inject("potatoFarmStore")
@observer
export class BuyFarmers extends React.Component<PotatoFarmStoreProps, State> {
  componentWillMount() {
    this.setState({ quantity: 1 });
  }
  changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ quantity: parseInt(e.currentTarget.value) });
  };
  render() {
    return (
      <ColumnDiv>
        <RowDiv>Farmers</RowDiv>
        <button
          onClick={() => {
            this.props.potatoFarmStore.buyFarmers(this.state.quantity);
          }}
        >
          Buy {this.state.quantity} Farmers (
          {this.props.potatoFarmStore.farmerCost.toFixed(2)}/ea)
        </button>
        Number to buy:
        <input type="text" onChange={this.changeText} />
      </ColumnDiv>
    );
  }
}
