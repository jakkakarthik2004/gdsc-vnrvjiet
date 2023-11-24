import Root from "./Root";
import "./output.css";
import Navbar from "./pages/Navbar";

function App() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-900">
      <Navbar />
      <Root />
    </div>
  );
}

export default App;
