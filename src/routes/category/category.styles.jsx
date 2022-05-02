import styled from "styled-components";

export const Header = styled.h2`
  font-size: 36px;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 25px;
`;

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 50px;
  column-gap: 25px;
`;
