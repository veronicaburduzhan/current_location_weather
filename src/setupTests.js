// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React from "react";
import Weather from "./Weather.component";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { data } from "./__mockdata__/mock_api"

global.IS_REACT_ACT_ENVIRONMENT = true;

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
};

global.navigator.geolocation = mockGeolocation;

const MOCK_DATA = data;

let container;
let root;

beforeEach(() => {
    container = document.createElement("div");
    root = createRoot(container);
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Weather", () => {
  it("Weather API renders successfully", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(MOCK_DATA),
      })
    );

    await act(async () => {
      root.render(<Weather />);
    });
  });
});


