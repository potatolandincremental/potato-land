import { Button, TextField, WithStyles, withStyles } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { PotatoFarmStoreProps } from "../../store/potatoFarmStore";
import { ColumnDiv, RowDiv } from "../styles/styles";
import { BuyStyles } from "./styles";
import { StoreStoreProps } from "../../store/storeStore";

interface State {
  quantity: number;
}

interface Props extends PotatoFarmStoreProps, WithStyles<typeof BuyStyles> {}

@inject("potatoFarmStore")
@inject("storeStore")
@observer
class BuyBuckets extends React.Component<Props & StoreStoreProps, State> {
  componentWillMount() {
    const quantity = this.props.storeStore.quantities.buckets;
    this.setState({ quantity });
  }
  changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = this.props.storeStore.setString(
      "buckets",
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
          label="Number of Buckets"
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
            // this.props.potatoFarmStore.buyFarmers(this.state.quantity);
          }}
        >
          Buy {this.state.quantity} Buckets (
          {this.props.potatoFarmStore.farmerCost.toFixed(2)}/ea)
        </Button>
      </ColumnDiv>
    );
  }
}

export default withStyles(BuyStyles)(BuyBuckets);
