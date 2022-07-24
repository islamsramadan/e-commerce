import "./App.scss";
import NavbarComp from "./components/Navabar/Navbar";
import SearchPage from "./Pages/Search";

function App() {
  return (
    <div className="App">
      <NavbarComp />
      <SearchPage/>
    </div>
  );
}

export default App;
