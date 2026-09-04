import RiskMap from "./components/RiskMap";
import RiskSummary from "./components/RiskSummary";

function App() {
  return (
    <div>
      <h1>
        AI-Based Landslide Risk Monitoring System
      </h1>

      <p classname="dashboard-subtitle">
        North-East Region  Real-Time Risk Monitoring
      </p>

      <RiskSummary />

      <RiskMap />
    </div>
  );
}

export default App;