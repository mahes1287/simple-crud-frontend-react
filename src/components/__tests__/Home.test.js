import Home from "../Home.jsx";
import { AuthProvider } from "../../contexts/AuthContext.js";
const { render, screen } = require("@testing-library/react");

test("this should render homepage", () => {
  const user = {
    displayname: "Maheshwaran Velusamy",
    uid: "ssasaas",
  };
  render(
    <AuthProvider>
      <div className="App">
        <Home />
      </div>
    </AuthProvider>
  );
  const homeElement = screen.getByTestId("home-not-logged-in");
  expect(homeElement).toBeInTheDocument();
});
