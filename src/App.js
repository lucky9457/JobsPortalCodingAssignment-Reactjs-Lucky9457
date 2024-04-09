import {Switch, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import './App.css'
import Jobs from './components/Jobs'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => {
  const a = 'A'
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/jobs" component={Jobs} />
    </Switch>
  )
}

export default App
