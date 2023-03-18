import './App.css';
import Shelter from './components/Shelter/Shelter';
import News from './components/News/News';
import Dashboard from './components/Dashboard/Dashboard'
// import ShelterTest from './components/Shelertest/ShelterTest';
function App() {
  return (
    <>
      <Shelter />
      <News />
      <Dashboard />
      {/* <ShelterTest /> */}
    </>
  );
}

export default App;
