// src/mocks/handlers.js
import { rest } from "msw";
const baseURL = process.env.REACT_APP_BASE_API_URL;

let mockTranslationsData = [
  {
    id: 1,
    input: "input1",
    output: "ouput1",
    fromUser: "Maheshwaran Velusamy",
  },
  {
    id: 2,
    input: "input2",
    output: "eeeeeerkkkkkkkkkkkkkkkkkkkkkkkk",
    fromUser: "Maheshwaran Velusamy",
  },
  {
    id: 3,
    input: "www",
    output: "dfdffd",
    fromUser: "Maheshwaran Velusamy",
  },
  {
    id: 4,
    input: "ooooooooooooooooooo",
    output: "iiiiiiiiiiiiiiiiiiiiiiii",
    fromUser: "Maheshwaran Velusamy",
  },
];

export const translationsLoadingHandler = rest.get(
  `${baseURL}/api/translations/`,
  async (req, res, ctx) => {
    localStorage.setItem("token", "true");
    localStorage.setItem("displayName", "Maheshwaran Velusamy");

    return res(ctx.status(200), ctx.delay());
  }
);

export const translationsZeroDataHandler = rest.get(
  `${baseURL}/api/translations/`,
  async (req, res, ctx) => {
    localStorage.setItem("token", "true");
    localStorage.setItem("displayName", "Maheshwaran Velusamy");

    return res(ctx.status(200), ctx.body([]));
  }
);

export const translationsHandler = rest.get(
  `${baseURL}/api/translations/`,
  async (req, res, ctx) => {
    localStorage.setItem("token", "true");
    localStorage.setItem("displayName", "Maheshwaran Velusamy");

    return res(ctx.status(200), ctx.body(mockTranslationsData));
  }
);
export const translationsErrorHandler = rest.get(
  `${baseURL}/api/translations/`,
  async (req, res, ctx) => {
    return res(ctx.status(500), ctx.body());
  }
);

export const handlers = [translationsHandler];
