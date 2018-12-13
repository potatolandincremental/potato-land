import { Button, TextField, WithStyles, withStyles } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { PotatoFarmStoreProps } from "../../store/potatoFarmStore";
import { ColumnDiv } from "../styles/styles";
import { BuyStyles } from "./styles";
import { StoreStoreProps } from "../../store/storeStore";
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

interface State {
  quantity: number;
}

@inject("potatoFarmStore")
@inject("storeStore")
@observer
class BuyPlots extends React.Component<
  StoreStoreProps & PotatoFarmStoreProps & WithStyles<typeof BuyStyles>,
  State
> {
  componentWillMount() {
    const quantity = this.props.storeStore.quantities.plots;
    this.setState({ quantity });
  }
  changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = this.props.storeStore.setString(
      "plots",
      e.currentTarget.value
    );

    this.setState({ quantity });
  };
  render() {
    const { classes } = this.props;
    return (
      <ColumnDiv>
       <Tooltip title={`1 potato may be planted per plot, returning ${this.props.potatoFarmStore.growthFactor} potatoes when harvested`} placement="left">
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Tooltip>
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
