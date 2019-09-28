import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Sidebar from './components/sidebar/sidebar';
import TopNav from './components/top-nav/top-nav';
import { Switch, Route, HashRouter, Router } from 'react-router-dom';
import Articles from './components/article/articles';
import Article from './components/article/article';
import { createBrowserHistory } from 'history';
import DataLoader from './components/data/data-loader';
import LandingPage from './components/landing-page/landing-page';

const history = createBrowserHistory();

const App: React.FC = () => {
  return (    
    <Router history={history}>
      <div className="App">
          <DataLoader></DataLoader>
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
      </div>    
    </Router>
  );
}

export default App;
