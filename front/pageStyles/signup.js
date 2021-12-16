import styled from 'styled-components';
import { Input, Checkbox } from 'antd';

export const StyledInput = styled(Input)`
  border-radius: 25px;
`;

export const StyledLabel = styled.label`
  margin: 0 0.5rem;
`;

export const StyledCheckbox = styled(Checkbox)`
  margin: 0.5rem;
`;

export const ErrorMessage = styled.div`
  color: red;
`;

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

export const ButtonWrapper = styled.div`
  margin-top: 1rem;
`;
