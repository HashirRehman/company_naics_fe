import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import PageNotFound from './common/PageNotFound';
import Home from './landing/Home';
import createBrowserHistory from 'history/createBrowserHistory';
import HeaderNavContainer from './landing/HeaderNavContainer'; // eslint-disable-line import/no-named-as-default
import CompanyListContainer from './company/CompanyListContainer';
import SignInContainer from './signIn/SignInContainer';
import SignUpContainer from './signUp/SignUpContainer';
import * as authActions from '../action/AuthActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const history = createBrowserHistory();

export class App extends React.Component {
  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <Router history={history}>
          <div>
            <HeaderNavContainer history={history} />

            <Switch>
              {currentUser && (
                <PrivateRoute
                  exact
                  path="/"
                  component={CompanyListContainer}
                  currentUser={currentUser}
                />
              )}
              {currentUser && (
                  <PrivateRoute
                    exact
                    path="/companies"
                    component={CompanyListContainer}
                    currentUser={currentUser}
                  />
                )}
              <Route exact path="/" component={Home} />

              <Route
                path="/login"
                render={props =>
                  !currentUser ? (
                    <SignInContainer {...props} />
                  ) : (
                    <Redirect
                      to={{
                        pathname: '/',
                        state: { from: props.location }
                      }}
                    />
                  )
                }
              />
              <Route
                path="/signup"
                render={props =>
                  !currentUser ? (
                    <SignUpContainer {...props} />
                  ) : (
                    <Redirect
                      to={{
                        pathname: '/',
                        state: { from: props.location }
                      }}
                    />
                  )
                }
              />
              {!currentUser ? <Redirect to="/" /> : null}
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const PrivateRoute = ({ currentUser, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

const mapStateToProps = state => ({
  currentUser: state.userReducer.currentUser
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...authActions }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
