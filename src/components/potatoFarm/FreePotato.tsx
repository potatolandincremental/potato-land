import { inject, observer } from "mobx-react";
import * as React from "react";
import styled from "styled-components";
import { PotatoFarmStoreProps } from "../../store/potatoFarmStore";
import { ColumnDiv, Div } from "../styles/styles";
import { Button, WithStyles, withStyles, TextField } from "@material-ui/core";
import { BuyStyles } from "../store/styles";
const potatoImg = require("../../images/potato.jpg");

interface State {
  quantity: number;
}

@inject("potatoFarmStore")
@observer
class FreePotato extends React.Component<
  PotatoFarmStoreProps & WithStyles<typeof BuyStyles>,
  State
> {
  componentWillMount() {
    this.setState({ quantity: 1 });
  }
  changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value == "") {
      return;
    }
    this.setState({ quantity: parseInt(e.currentTarget.value) }, () => {
      if (this.state.quantity < 0) {
        this.setState({ quantity: 0 });
      }
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <ColumnDiv>
        <ImgDiv>
          <CountDiv>{this.props.potatoFarmStore.freePotatoes}</CountDiv>
        </ImgDiv>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={() =>
            this.props.potatoFarmStore.plantPotatoes(this.state.quantity)
          }
        >
          Plant {this.state.quantity}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={() => {
            this.props.potatoFarmStore.sellPotatoes(this.state.quantity);
          }}
        >
          Sell {this.state.quantity} ($
          {this.props.potatoFarmStore.potatoCost.toFixed(2)}/ea)
        </Button>
        <TextField
          id="outlined-number"
          label="Quantity"
          value={this.state.quantity}
          onChange={this.changeText}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
          variant="outlined"
        />
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

export const CountDiv = styled(Div)`
  background-color: white;
  opacity: 0.7;
  border-radius: 6px;
  padding: 5px;
`;

export default withStyles(BuyStyles)(FreePotato);
