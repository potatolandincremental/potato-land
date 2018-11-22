import * as React from "react";
import { ColumnDiv, Div, FullWidthContainer, RowDiv } from "../styles/styles";
import styled from "styled-components";
import { typeValue } from "../utils/utils";
import posed from "react-pose";
import { MoneyStoreProps } from "../../store/moneyStore";
import { inject, observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";
import { Store } from "../store/Store";
import { Paper, Tabs, Tab, WithStyles, withStyles } from "@material-ui/core";

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
      <ColumnDiv>
        <Paper className={classes.root}>
        <RowDiv>Money: ${this.getMoney().toFixed(2)}</RowDiv>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Potato Farm" value="/potatoFarm" />
            <Tab label="Store" value="/store" />
          </Tabs>
        </Paper>
      </ColumnDiv>
    );
  }
}

export default withStyles(styles)(withRouter(Navigation));
