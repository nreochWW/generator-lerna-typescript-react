import * as React from "react";
import styled from "styled-components";

export interface <%= name %>Props {
  compiler: string;
  framework: string;
}

const Wrapper = styled.div`
  border: 1px solid blue;
  padding: 10px;
`;

const <%= name %> = (props: <%= name %>Props) => (
  <Wrapper>
    <h1>
      Hello World from {props.compiler} and {props.framework}!
    </h1>
  </Wrapper>
);

export default <%= name %>;
