import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css'
import LoginPage from './components/loginPage'
import Home from './components/home'
import Jobs from './components/Jobs'
import JobItemDetails from './components/jobItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import PageNotFound from './components/pageNotFound'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    <Route path="/not-found" component={PageNotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
