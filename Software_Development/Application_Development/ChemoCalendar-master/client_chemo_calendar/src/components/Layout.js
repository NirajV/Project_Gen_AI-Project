import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import { ImmutableLoadingBar as LoadingBar } from 'react-redux-loading-bar';
import ReduxToastr from 'react-redux-toastr';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => {
  return ({
    footer: {
		backgroundColor: '#9a9ca7',
		padding: '15px',
		bottom: 0,
		marginTop: '5px',
		height: '80px',
		color: '#fff'
	}
  })
};
class Layout extends Component {
  constructor(props) {
      super(props);
      this.state = {
        activeTab: 0
      }
  }

  componentDidMount() {
    switch(this.props.location.pathname) {
      case '/home': this.setState({ activeTab: 0 });
        break;
      case '/createEvent': this.setState({ activeTab: 1 });
        break;
      case '/favorite': this.setState({ activeTab: 2 });
        break;
      case '/users': this.setState({ activeTab: 3 });
        break;
      default : 
    }
  }

  handleTabChange = (event, value) => {
    this.setState({ activeTab: value });
  }

  render() {
    const { user, classes } = this.props;
    const { activeTab } = this.state;
    const renderTabs = user.data ? (
      <RenderTabs activeTab={activeTab} handleTabChange={this.handleTabChange} user={user.data}/>
    ) : <Redirect to='/login' />;
    
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar style={{ justifyContent: 'space-between' }}>
            <Typography variant="title" color="inherit">
              Chemo Cal
            </Typography>
            <div>
              {renderTabs}
            </div>
            <Button color="inherit" onClick={() => {
              this.props.logout();
              this.context && this.context.router && this.context.router.history && this.context.router.history.push('/login');
            }}>Logout</Button>
          </Toolbar>
          <LoadingBar />
        </AppBar>
        <div id='main-container' style={{marginTop: '72px',minHeight: '80vh'}} className='container-fluid'>
          {this.props.children}
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="bottom-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar/>
        </div>
		<footer className={classes.footer}>
			<Grid container spacing={0}>
				<Grid item xs={9} sm={9} md={9} lg={9}>
					<Typography variant="body1" color="inherit">
						XYZ Corporation
					</Typography>
					<Typography variant="body1" color="inherit">
						Contact No. - xxxxxxxxxx
					</Typography>
					<Typography variant="body1" color="inherit">
						Email - abc@xyz.com
					</Typography>
				</Grid>
				<Grid item xs={3} sm={3} md={3} lg={3}>
					<div>Copyright 2019 © XYZ Corporation. All Rights Reserved.</div>
				</Grid>
			</Grid>
		</footer>
      </div>
    );
  }
}

const RenderTabs = (props) => {
  return (
    <Tabs value={props.activeTab} onChange={props.handleTabChange} centered>
      <Tab label="home" icon={<HomeIcon />} component={Link} to="/home" />
      <Tab label="event" icon={<AddIcon />} component={Link} to="/createEvent"/>
      <Tab label="favorite" icon={<FavoriteIcon />} component={Link} to="/favorite"/>
      {
        props.user.role === 'hospital_admin' && <Tab label="Users" icon={<AccountCircleIcon />} component={Link} to="/users"/>
      }
    </Tabs>
  )
}

Layout.contextTypes = {
  router: PropTypes.object
}

export default withStyles(styles)(Layout);