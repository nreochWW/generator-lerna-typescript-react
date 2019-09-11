import * as React from "react";
import { shallow } from "enzyme";
import <%= name %> from "../src/index";

describe("<%= name %> package tests", () => {
  it("matches snapshot", () => {
    const wrapper = shallow(<<%= name %> compiler="TypeScript" framework="React" />);
    expect(wrapper).toMatchSnapshot();
  });
});
