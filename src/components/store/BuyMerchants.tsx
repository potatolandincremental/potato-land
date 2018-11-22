import { Button, TextField, WithStyles, withStyles } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { PotatoFarmStoreProps } from "../../store/potatoFarmStore";
import { ColumnDiv, RowDiv } from "../styles/styles";
import { BuyStyles } from "./styles";
import { MerchantStoreProps } from "../../store/merchantStore";

interface State {
  quantity: number;
}

interface Props extends MerchantStoreProps, WithStyles<typeof BuyStyles> {}

@inject("merchantStore")
@observer
class BuyFarmers extends React.Component<Props, State> {
  componentWillMount() {
    this.setState({ quantity: 1 });
  }
  changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ quantity: parseInt(e.currentTarget.value) });
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
