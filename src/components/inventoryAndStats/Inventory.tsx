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
}

@inject("potatoFarmStore")
@inject("moneyStore")
@observer
class Inventory extends React.Component<Props & WithStyles<typeof styles>> {
  render() {
    const { classes } = this.props;
    return (
      <RowDiv>
        <Paper>
          <div className={classes.root}>
            <ColumnDiv>
              <Typography variant="h5" component="h3">
                Inventory
              </Typography>
            </ColumnDiv>

            <Divider />
            <List>
              <ListItem>
                <Avatar>
                  <ImageIcon />
                </Avatar>
                <ListItemText
                  primary="Free Potatoes"
                  secondary={this.props.potatoFarmStore.freePotatoes}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <Avatar>
                  <WorkIcon />
                </Avatar>
                <ListItemText
                  primary="Planted Potatoes"
                  secondary={this.props.potatoFarmStore.plantedPotatoes}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <Avatar>
                  <BeachAccessIcon />
                </Avatar>
                <ListItemText
                  primary="Plots"
                  secondary={this.props.potatoFarmStore.plots}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <Avatar>
                  <BeachAccessIcon />
                </Avatar>
                <ListItemText
                  primary="Farmers"
                  secondary={this.props.potatoFarmStore.farmers}
                />
              </ListItem>
            </List>
          </div>
        </Paper>
      </RowDiv>
    );
  }
}

export default withStyles(styles)(Inventory);
