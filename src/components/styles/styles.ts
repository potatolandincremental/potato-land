import styled from "styled-components";

export const Div = styled.div`
  font-family: "Roboto";
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  flex-wrap: wrap;
`;

export const FullWidthContainer = styled.div`
  width: 100%;
`;

export const FullWidthContainerWithOpacity = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  opacity: 0.7;
  z-index: 1000;
  background-color: white;
  opacity: 0.6;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
`;
export const ColumnDiv = styled(Div)`
  flex-direction: column;
`;

export const DivWrapper = styled(Div)`
  width: 100%;
`;
export const DivWrapperMaxWidth = styled(Div)`
  max-width: 960px;
`;
export const RowDiv = styled(Div)`
  flex-wrap: wrap;
  flex-direction: row;
`;

export const color = "rgb(101, 155, 77)";
export const darkColor = "rgb(57, 99, 39)";
export const fontColor = `color: ${color}`;

export const hoverUnderline = `&:hover {
    text-decoration:underline;
  }`;

export const P = styled.p`
  padding: 2px;
  margin: 0px;
  width: 100%;
  text-align: center;
`;

export const Spacer = styled(P)`
  height: 10px;
`;

export const A = styled.a`
  padding: 10px;
  font-size: 15pt;
  text-decoration: none;
  ${fontColor};
  ${hoverUnderline};
  cursor: pointer;
`;

export const Green = styled.span`
  margin: 0;
  padding: 10px;
  font-size: 15pt;
  ${fontColor};
`;

