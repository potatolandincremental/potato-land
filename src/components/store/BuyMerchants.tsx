import { Button, TextField, WithStyles, withStyles } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { PotatoFarmStoreProps } from "../../store/potatoFarmStore";
import { ColumnDiv, RowDiv } from "../styles/styles";
import { BuyStyles } from "./styles";
import { MerchantStoreProps } from "../../store/merchantStore";
import { StoreStoreProps } from "../../store/storeStore";

interface State {
  quantity: number;
}

interface Props extends MerchantStoreProps, WithStyles<typeof BuyStyles> {}

@inject("merchantStore")
@inject("storeStore")
@observer
class BuyFarmers extends React.Component<Props & StoreStoreProps, State> {
  componentWillMount() {
    const quantity = this.props.storeStore.quantities.merchants;
    this.setState({ quantity });
  }
  changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = this.props.storeStore.setString(
      "merchants",
      e.currentTarget.value
    );

    this.setState({ quantity });
  };

  render() {
    const { classes } = this.props;
    return (
      <ColumnDiv>
        <TextField
          id="outlined-number"
          label="Number of Merchants"
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
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={() => {
            this.props.merchantStore.buyMerchants(this.state.quantity);
          }}
        >
          Buy {this.state.quantity} Merchants (
          {this.props.merchantStore.merchantCost.toFixed(2)}/ea)
        </Button>
      </ColumnDiv>
    );
  }
}

export default withStyles(BuyStyles)(BuyFarmers);
