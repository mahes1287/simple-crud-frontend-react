import Home from "../Home.jsx";
import {
  AuthContext,
  AuthProvider,
  useAuth,
} from "../../contexts/AuthContext.js";
const { render, screen, renderHook } = require("@testing-library/react");

// const mock = null;

// jest.mock("../../contexts/AuthContext", () => ({
//   useAuth: () => {
//     return mock;
//   },
// }));

describe("Home Page", () => {
  it("this should render homepage for logged out user", () => {
    const auth = { user: null };
    render(
      <AuthContext.Provider value={auth}>
        <div className="App">
          <Home />
        </div>
      </AuthContext.Provider>
    );

    const loggedOutElement = screen.getByTestId("logged-out");
    expect(localStorage.getItem("displayName")).toBe(null);
    expect(loggedOutElement).toBeInTheDocument();
  });

  test("this should render homepage with logged in user", () => {
    const auth = {
      user: { uid: "jfjdffjvnhdf", displayName: "Maheshwaran Velusamy" },
    };

    render(
      <AuthContext.Provider value={auth}>
        <div className="App">
          <Home />
        </div>
      </AuthContext.Provider>
    );
    localStorage.setItem("displayName", "Maheshwaran Velusamy");

    const homeElement = screen.getByTestId("logged-in");
    expect(homeElement).toBeInTheDocument();
    expect(screen.queryByTestId("logged-out")).not.toBeInTheDocument();
    expect(localStorage.getItem("displayName")).toBe("Maheshwaran Velusamy");
  });
});
