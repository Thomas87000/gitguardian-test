import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ReactDOM from 'react-dom'
import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import * as serviceWorker from './serviceWorker'
import App from './App'
import { ExerciseAlgo } from './4_exercise_algo'
import { ExerciseLiveChart } from './3_exercise_livechart'
import { ExerciseTesting } from './2_exercise_testing'
import { ExerciseLayout } from './1_exercise_layout'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <Switch>
          <Route exact path="/exercises/1">
            <ExerciseLayout />
          </Route>
          <Route exact path="/exercises/2">
            <ExerciseTesting />
          </Route>
          <Route exact path="/exercises/3">
            <ExerciseLiveChart />
          </Route>
          <Route exact path="/exercises/4">
            <ExerciseAlgo />
          </Route>
          <Route path="*">
            <App />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
