import * as React from "react";
import * as ReactDOM from "react-dom";

import <%= name %> from "../src/index";

ReactDOM.render(
  <<%= name %> compiler="TypeScript" framework="React" />,
  document.getElementById("<%= name %>")
);
