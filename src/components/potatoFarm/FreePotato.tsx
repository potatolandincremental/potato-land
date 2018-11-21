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
export class FreePotato extends React.Component<PotatoFarmStoreProps, State> {
  componentWillMount() {
    this.setState({ quantity: 1 });
  }
  changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ quantity: parseInt(e.currentTarget.value) });
  };
  render() {
    return (
      <ColumnDiv>
        <ImgDiv>
          <CountDiv>{this.props.potatoFarmStore.freePotatoes}</CountDiv>
        </ImgDiv>
        <button>Eat</button>
        <button
          onClick={() =>
            this.props.potatoFarmStore.plantPotatoes(this.state.quantity)
          }
        >
          Plant {this.state.quantity}
        </button>
        <button
          onClick={() => {
            this.props.potatoFarmStore.sellPotatoes(this.state.quantity);
          }}
        >
          Sell {this.state.quantity} ($
          {this.props.potatoFarmStore.potatoCost.toFixed(2)}/ea){" "}
        </button>
        Number:
        <input type="text" onChange={this.changeText} />
      </ColumnDiv>
    );
  }
}

const ImgDiv = styled(Div)`
  width: 100px;
  height:100px;
  background: url("${potatoImg}") no-repeat center;
  background-size: 100%;
`;

const CountDiv = styled(Div)`
  background-color: white;
  opacity: 0.7;
  border-radius: 6px;
  padding: 5px;
`;
