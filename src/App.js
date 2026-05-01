import {Switch, Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Repositories from './components/Repositories'
import RepositoryItemDetails from './components/RepositoryItemDetails'
import Analysis from './components/Analysis'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <div className="app">
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/repositories" component={Repositories} />
      <Route
        exact
        path="/repositories/:repoName"
        component={RepositoryItemDetails}
      />
      <Route exact path="/analysis" component={Analysis} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
