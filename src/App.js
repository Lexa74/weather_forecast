//import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { Main } from './components/main/Main'
import { Other } from './components/other/Other';
import { Svg } from './components/UI/svg/Svg';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/in/*" element={<Other />} />
          <Route path="/Minsk" element={<Main />} />
          <Route path="/Moscow" element={<Main />} />
          <Route path="/Bratislava" element={<Main />} />
          <Route path="/other" element={<Other />} />
        </Routes>
        <Svg name="svg-one" className='svg-one w200 h200 fill#000000 stroke#000000'></Svg>
        <Svg name="svg-one" className='svg-two w100 h100 fill#ffffff stroke#000000'></Svg>
      </div>
    </Router>
  );
}

export default App;
