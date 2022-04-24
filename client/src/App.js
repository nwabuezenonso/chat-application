//importing react, BrowserRouter and Route
import React from 'react'
import { BrowserRouter ,Route} from 'react-router-dom'

//importing component for join and chat
import Chat from './components/Chat/Chat'
import Join from './components/Join/Join'

function App() {
  //runnning browserRouter to allow routes
  return (
    <BrowserRouter>
      <Route path='/' exact component={Join} />
      <Route path='/chat' component={Chat} />
    </BrowserRouter>
  )
}

export default App;
