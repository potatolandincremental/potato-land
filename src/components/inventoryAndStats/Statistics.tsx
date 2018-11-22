import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  WithStyles,
  withStyles,
  Paper,
  Typography,
  Divider
} from "@material-ui/core";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import React = require("react");
import { ColumnDiv, RowDiv } from "../styles/styles";
import { observer, inject } from "mobx-react";
import { MoneyStore } from "../../store/moneyStore";
import { PotatoFarmStore } from "../../store/potatoFarmStore";
import { StatisticsStore } from "../../store/statisticsStore";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

interface Props {
  potatoFarmStore?: PotatoFarmStore;
  moneyStore?: MoneyStore;
  statisticsStore?: StatisticsStore;
}

@inject("potatoFarmStore")
@inject("moneyStore")
@inject("statisticsStore")
@observer
class Statistics extends React.Component<Props & WithStyles<typeof styles>> {
  render() {
    const { classes } = this.props;
    return (
      <RowDiv>
        <Paper>
          <div className={classes.root}>
            <ColumnDiv>
              <Typography variant="h5" component="h3">
                Statistics
              </Typography>
            </ColumnDiv>

            <Divider />
            <List>
              <ListItem>
                <Avatar>
                  <ImageIcon />
                </Avatar>
                <ListItemText
                  primary="Farmer cost to clear plot"
                  secondary={`$${this.props.potatoFarmStore.farmerPlotClearCost.toFixed(
                    2
                  )}`}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <Avatar>
                  <BeachAccessIcon />
                </Avatar>
                <ListItemText
                  primary="Farmer cost per minute"
                  secondary={`$${this.props.statisticsStore.farmerPlotClearingCostPerMinute.toFixed(
                    2
                  )}`}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <Avatar>
                  <WorkIcon />
                </Avatar>
                <ListItemText
                  primary="Potatoes planted per minute"
                  secondary={this.props.statisticsStore.potatoesPlantedPerMinute.toFixed(
                    2
                  )}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <Avatar>
                  <WorkIcon />
                </Avatar>
                <ListItemText
                  primary="Potatoes harvested per minute"
                  secondary={this.props.statisticsStore.potatoesHarvestedPerMinute.toFixed(
                    2
                  )}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <Avatar>
                  <WorkIcon />
                </Avatar>
                <ListItemText
                  primary="Potatoes sold per minute"
                  secondary={this.props.statisticsStore.potatoesSoldPerMinute.toFixed(
                    2
                  )}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <Avatar>
                  <WorkIcon />
                </Avatar>
                <ListItemText
                  primary="Money generated from potatoes sold per minute"
                  secondary={`$${this.props.statisticsStore.potatoesMoneySoldPerMinute.toFixed(
                    2
                  )}`}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <Avatar>
                  <WorkIcon />
                </Avatar>
                <ListItemText
                  primary="Merchant fees per minute"
                  secondary={`$${this.props.statisticsStore.merchantCostPerMinute.toFixed(
                    2
                  )}`}
                />
              </ListItem>
            </List>
          </div>
        </Paper>
      </RowDiv>
    );
  }
}

export default withStyles(styles)(Statistics);
