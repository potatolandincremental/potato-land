import * as React from "react";
import { ColumnDiv, Div, FullWidthContainer, RowDiv } from "../styles/styles";
import styled from "styled-components";
import { typeValue } from "../utils/utils";
import posed from "react-pose";
import { MoneyStoreProps } from "../../store/moneyStore";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Store } from "../store/Store";

@inject("moneyStore")
@observer
export class Navigation extends React.Component<MoneyStoreProps> {
  getMoney = () => {
    const money = this.props.moneyStore.money;
    if (money == null) {
      return 0.0;
    }
    return money;
  };
  render() {
    return (
      <ColumnDiv>
        <RowDiv>Money: ${this.getMoney().toFixed(2)}</RowDiv>
        <RowDiv><RowDiv><Link to='/potatoFarm'>Potato Farm</Link></RowDiv>
       <RowDiv><Link to='/store'>Store</Link></RowDiv></RowDiv> 
      </ColumnDiv>
    );
  }
}
