import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch, Redirect } from 'react-router-dom';
import withRoot from './withRoot';
import LayoutContainer from './containers/LayoutContainer';
import LoginContainer from './containers/LoginContainer';
import HomeContainer from './containers/HomeContainer';
import CreateEventContainer from './containers/CreateEventContainer';
import CreateUserContainer from './containers/CreateUserContainer';
import UsersContainer from './containers/UsersContainer';
import ViewEventContainer from './containers/ViewEventContainer';
import FavoriteContainer from './containers/FavoriteContainer';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 20,
  },
});

const RouteWithLayout = ({ layout, component, ...rest }) => {
  return (
    <Route {...rest} render={(props) =>
      React.createElement(layout, props, React.createElement(component, props))
    } />
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" component={App} />} />
          <Route path="/login" component={LoginContainer} />
          <LayoutContainer>
            <Switch>
              <Route path="/home" component={HomeContainer} />
              <Route path="/createUser" component={CreateUserContainer} />
              <Route path="/users" component={UsersContainer} />
              <Route path="/createEvent" component={CreateEventContainer} />
              <Route path="/viewEvent/:id" component={ViewEventContainer} />
              <Route path="/favorite" component={FavoriteContainer} />
            </Switch>
          </LayoutContainer>
        </Switch>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(App));
