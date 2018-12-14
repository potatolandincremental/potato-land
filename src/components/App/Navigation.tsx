import {
  Paper,
  Tab,
  Tabs,
  WithStyles,
  withStyles,
  Button
} from "@material-ui/core";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { withRouter } from "react-router-dom";
import { MoneyStoreProps } from "../../store/moneyStore";
import { FullWidthContainer, RowDiv } from "../styles/styles";
import styled from "styled-components";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit
  }
});

interface Props extends MoneyStoreProps, WithStyles<typeof styles> {
  match: any;
  location: any;
  history: any;
}

interface State {
  value: string;
  confirm: boolean;
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

  componentWillMount() {
    this.setState({ value: "/potatoFarm", confirm: false });
  }

  handleChange = (event, value) => {
    this.setState({ value });
    this.goTo(event, value);
  };

  goTo = (event, value) => {
    this.props.history.push(value);
  };

  clearData = () => {
    if (this.state.confirm) {
      localStorage.clear();
      location.reload();
      this.setState({ confirm: false });
    } else {
      this.setState({ confirm: true });
    }
  };
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <RowDiv>Money: ${this.getMoney().toFixed(2)}</RowDiv>

        <StyledButton
          variant="contained"
          color={this.state.confirm ? "primary" : "secondary"}
          className={classes.button}
          onClick={this.clearData}
        >
        {this.state.confirm ? "Really?" : "Clear Data"}
        </StyledButton>

        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          centered
          fullWidth
        >
          <Tab label="Potato Farm" value="/potatoFarm" />
          <Tab label="Store" value="/store" />
        </Tabs>
      </Paper>
    );
  }
}

const StyledButton = styled(Button)`
  position: absolute;
  right: 0px;
  top: -40px;
`;

export default withStyles(styles)(withRouter(Navigation));
