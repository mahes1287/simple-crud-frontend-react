import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFound from "../NotFound";
import renderer from "react-test-renderer";
describe("Not found page ::", () => {
  test(`should give the "Sorry, The page is not found....." text in the page`, () => {
    render(<NotFound />, { wrapper: BrowserRouter });
    const textElement = screen.getByText("Sorry, The page is not found.....");
    expect(textElement).toBeInTheDocument();
  });

  test("Should give the Link to Home", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      )
      .toJSON();

    render(<NotFound />, { wrapper: BrowserRouter });
    const linkElement = screen.getByRole("link", { name: "Home" });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute("href")).toMatchInlineSnapshot(`"/"`);
  });
});
