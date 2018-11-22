import { Button, TextField, WithStyles, withStyles } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { PotatoFarmStoreProps } from "../../store/potatoFarmStore";
import { ColumnDiv, RowDiv } from "../styles/styles";
import { BuyStyles } from "./styles";

interface State {
  quantity: number;
}

interface Props extends PotatoFarmStoreProps, WithStyles<typeof BuyStyles> {}

@inject("potatoFarmStore")
@observer
class BuyBuckets extends React.Component<Props, State> {
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
