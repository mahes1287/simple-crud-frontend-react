import Home from "../Home.jsx";
import { AuthContext } from "../../contexts/AuthContext.js";
import renderer from "react-test-renderer";
const { render, screen } = require("@testing-library/react");
describe("<Home />", () => {
  test("this should render homepage for logged out user", () => {
    const auth = { user: null };
    render(
      <AuthContext.Provider value={auth}>
        <div className="App">
          <Home />
        </div>
      </AuthContext.Provider>
    );

    const loggedOutElement = screen.getByTestId("logged-out");
    expect(screen.queryByTestId("logged-in")).not.toBeInTheDocument();
    expect(loggedOutElement).toBeInTheDocument();
    expect(loggedOutElement).toHaveTextContent("You are at sweet home!!!!!");
  });

  test("snapshot for logged out user", () => {
    const auth = { user: null };
    const tree = renderer
      .create(
        <AuthContext.Provider value={auth}>
          <div className="App">
            <Home />
          </div>
        </AuthContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("this should render homepage with logged in user", () => {
    const auth = {
      user: { uid: "jfjdffjvnhdf", displayName: "Maheshwaran Velusamy" },
    };
    localStorage.setItem("displayName", auth.user.displayName);
    render(
      <AuthContext.Provider value={auth}>
        <div className="App">
          <Home />
        </div>
      </AuthContext.Provider>
    );

    const loggedInElement = screen.getByTestId("logged-in");
    expect(loggedInElement).toBeInTheDocument();
    expect(screen.queryByTestId("logged-out")).not.toBeInTheDocument();
    expect(loggedInElement).toHaveTextContent(
      "Hello Maheshwaran Velusamy welcome to our app"
    );
  });
  test("snapshot for logged in user", () => {
    const auth = {
      user: { uid: "jfjdffjvnhdf", displayName: "Maheshwaran Velusamy" },
    };
    localStorage.setItem("displayName", auth.user.displayName);
    const tree = renderer
      .create(
        <AuthContext.Provider value={auth}>
          <div className="App">
            <Home />
          </div>
        </AuthContext.Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
