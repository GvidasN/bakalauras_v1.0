import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Routes';

function App() {
  return (
    <div className="App">     
      <Router>
				<Routes />
			</Router>
    </div>
  );
}

export default App;