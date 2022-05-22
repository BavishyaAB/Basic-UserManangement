import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../../Styles/App.css';
import Home from '../Home/Home';
import Users from "../Users/Users";
import UserDetail from '../UserDetails/UserDetail';
function App() {
  return (
    <div className="App">
      <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/Users" element={<Users/>}/>
                <Route path="/Users/:userId" element={<UserDetail/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
