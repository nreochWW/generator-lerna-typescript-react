import * as React from "react";
import { storiesOf } from "@storybook/react";
import <%= name %> from "../src/index";

storiesOf("<%= name %>", module).add("<%= name %>", () => (
  <<%= name %> compiler="TypeScript" framework="React" />
));
