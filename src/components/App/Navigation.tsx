import { Paper, Tab, Tabs, WithStyles, withStyles } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { withRouter } from "react-router-dom";
import { MoneyStoreProps } from "../../store/moneyStore";
import { FullWidthContainer, RowDiv } from "../styles/styles";

const styles = {
  root: {
    flexGrow: 1
  }
};

interface Props extends MoneyStoreProps, WithStyles<typeof styles> {
  match: any;
  location: any;
  history: any;
}

interface State {
  value: number;
}

@inject("moneyStore")
@observer
class Navigation extends React.Component<Props, State> {
  getMoney = () => {
    const money = this.props.moneyStore.money;
    if (money == null) {
      return 0.0;
    }
    return money;
  };

  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.goTo(event, value);
  };

  goTo = (event, value) => {
    this.props.history.push(value);
  };
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <RowDiv>Money: ${this.getMoney().toFixed(2)}</RowDiv>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          centered
          fullWidth
        >
          <Tab label="Potato Farm" value="/potatoFarm" />
          <Tab label="Store" value="/store" />
          <Tab label="Inventory & Statistics" value="/inventoryAndStatistics" />
        </Tabs>
      </Paper>
    );
  }
}

export default withStyles(styles)(withRouter(Navigation));
