import { Button, TextField, WithStyles, withStyles } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { PotatoFarmStoreProps } from "../../store/potatoFarmStore";
import { ColumnDiv } from "../styles/styles";
import { BuyStyles } from "./styles";

interface State {
  quantity: number;
}

@inject("potatoFarmStore")
@observer
class BuyPlots extends React.Component<
  PotatoFarmStoreProps & WithStyles<typeof BuyStyles>,
  State
> {
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
          label="Number of Plots"
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
            this.props.potatoFarmStore.buyPlots(this.state.quantity);
          }}
        >
          Buy {this.state.quantity} Plots (
          {this.props.potatoFarmStore.plotCost.toFixed(2)}/ea)
        </Button>
      </ColumnDiv>
    );
  }
}

export default withStyles(BuyStyles)(BuyPlots);
