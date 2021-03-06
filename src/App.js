import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import './App.css';
import Checkout from './containers/Checkout/Checkout';
import {Route, withRouter, Switch, Redirect} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount(){
    this.props.autoSignIn();
  }

  render() {
    let routes = (
      <Switch>
        <Route path= "/" exact component={BurgerBuilder} />  
        <Route path="/auth" component={Auth} />
        <Redirect to = "/" />
      </Switch>
    )

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/auth" component={Auth} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={Logout} />
            <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoSignIn: () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
