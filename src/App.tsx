import { createBrowserHistory } from 'history';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import './App.scss';
import Article from './components/article/article';
import Articles from './components/article/articles';
import LandingPage from './components/landing-page/landing-page';
import Sidebar from './components/sidebar/sidebar';
import TopNav from './components/top-nav/top-nav';
import { ToastContainer } from 'react-toastify';

const history = createBrowserHistory();

const App: React.FC = () => {
  return (    
    <Router history={history}>
      <div className="App">
          <TopNav></TopNav>
          <Sidebar></Sidebar>
          <header className="App-header">
          </header>
          <div className="router-outlet">
            <Switch>
              <Route path='/articles/:parent/:child/article/:article?' component={Article} />
              <Route path='/articles/:parent/:child' component={Articles} />          
              <Route path={'/'} exact component={LandingPage} />
            </Switch>
          </div>
          <ToastContainer />
      </div>    
    </Router>
  );
}

export default App;
