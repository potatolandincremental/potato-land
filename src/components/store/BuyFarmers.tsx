import { Button, TextField, WithStyles, withStyles } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { PotatoFarmStoreProps } from "../../store/potatoFarmStore";
import { ColumnDiv, RowDiv } from "../styles/styles";
import { BuyStyles } from "./styles";
import { StoreStoreProps } from "../../store/storeStore";
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


interface State {
  quantity: number;
}

interface Props extends PotatoFarmStoreProps, WithStyles<typeof BuyStyles> {}

@inject("potatoFarmStore")
@inject("storeStore")
@observer
class BuyFarmers extends React.Component<Props & StoreStoreProps, State> {
  componentWillMount() {
    const quantity = this.props.storeStore.quantities.farmers;
    this.setState({ quantity });
  }
  changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = this.props.storeStore.setString(
      "farmers",
      e.currentTarget.value
    );

    this.setState({ quantity });
  };

  render() {
    const { classes } = this.props;
    return (
      <ColumnDiv>
       <Tooltip title={`Farmers plant for free and harvest for $${this.props.potatoFarmStore.farmerPlotClearCost} per plot harvested.`} placement="left">
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Tooltip>
        <TextField
          id="outlined-number"
          label="Number of Farmers"
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
            this.props.potatoFarmStore.buyFarmers(this.state.quantity);
          }}
        >
          Buy {this.state.quantity} Farmers (
          {this.props.potatoFarmStore.farmerCost.toFixed(2)}/ea)
        </Button>
      </ColumnDiv>
    );
  }
}

export default withStyles(BuyStyles)(BuyFarmers);
