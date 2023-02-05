import Home from "../Home.jsx";
import { AuthProvider } from "../../contexts/AuthContext.js";
const { render, screen } = require("@testing-library/react");

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = localStorageMock;

test("this should render homepage without user loggedin", () => {
  render(
    <AuthProvider>
      <div className="App">
        <Home />
      </div>
    </AuthProvider>
  );

  const homeElement = screen.getByTestId("home-not-logged-in");
  expect(homeElement).toBeInTheDocument();
  expect(localStorageMock.getItem).toHaveBeenCalled("displayName");
});
