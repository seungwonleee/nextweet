import styled from 'styled-components';

export const Title = styled.h1`
  text-align: center;
  padding-top: 2rem;

  a {
    color: ${(props) => props.theme.colors.black};
  }
`;

export const SubTitle = styled.h2`
  text-align: center;
`;
