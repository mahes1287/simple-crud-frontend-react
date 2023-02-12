import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {
  translationsErrorHandler,
  translationsHandler,
  translationsLoadingHandler,
  translationsZeroDataHandler,
} from "../../mocks/handlers";
import { server } from "../../mocks/server";
import Translations from "../Translations";

describe("<Translations />", () => {
  test("should render Loading screen", () => {
    server.use(translationsLoadingHandler);
    const { asFragment } = render(
      <MemoryRouter>
        <Translations />
      </MemoryRouter>
    );

    const loadingText = screen.getByRole("heading");
    expect(loadingText).toHaveTextContent("Loading...");
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render -Its lonely here...- when data from api is empty array []", async () => {
    server.use(translationsZeroDataHandler);
    const { asFragment } = render(
      <MemoryRouter>
        <Translations />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("List of Translations")).toBeInTheDocument();
    });
    const headingText = screen.getByText("List of Translations");
    expect(headingText).toHaveTextContent("List of Translations");
    expect(
      screen.getByText("Its lonely here... Add some data..")
    ).toHaveTextContent("Its lonely here... Add some data..");

    expect(asFragment()).toMatchSnapshot();
  });
  test("should render list  of translations when data available", async () => {
    server.use(translationsHandler);
    const { asFragment } = render(
      <MemoryRouter>
        <Translations />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText("eeeeeerkkkkkkkkkkkkkkkkkkkkkkkk")
      ).toBeInTheDocument();
    });
    const headingText = screen.getByText("List of Translations");
    expect(headingText).toHaveTextContent("List of Translations");
    expect(
      screen.getByText("eeeeeerkkkkkkkkkkkkkkkkkkkkkkkk")
    ).toHaveTextContent("eeeeeerkkkkkkkkkkkkkkkkkkkkkkkk");

    expect(asFragment()).toMatchSnapshot();
  });
  test("should render error while fetching data", async () => {
    server.use(translationsErrorHandler);
    const { asFragment } = render(
      <MemoryRouter>
        <Translations />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/There is following error/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/There is following error/i)).toHaveTextContent(
      /There is following error/i
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
