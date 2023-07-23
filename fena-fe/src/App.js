import "./App.css";
import AddCampaign from "./Components/AddCampaign";
import ViewCampaign from "./Components/ViewCampaign";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#faf9f6",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "40px",
        }}
      >
        <div style={{ marginTop: "20px" }}>
          <AddCampaign />
          <ViewCampaign />
        </div>
      </div>
    </div>
  );
}

export default App;
