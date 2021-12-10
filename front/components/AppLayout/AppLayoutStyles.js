import styled from 'styled-components';
import { Input } from 'antd';

const { Search } = Input;

export const SearchInput = styled(Search)`
  vertical-align: middle;
  width: 100%;
  .ant-input {
    border-radius: 25px;
  }
  .ant-btn {
    border-radius: 0 25px 25px 0 !important;
    border-left: none;
  }
`;

export const Menu = styled.div`
  position: fixed;
  padding: 1rem;
  border-bottom: 0.1rem solid ${(props) => props.theme.colors.gray};
  width: 100%;
  z-index: 3;
  font-size: ${(props) => props.theme.fontSizes.base};
  background-color: ${(props) => props.theme.colors.white};
  text-align: center;

  a {
    color: ${(props) => props.theme.colors.black};
  }
`;

export const Content = styled.div`
  padding-top: 5.8rem;
  font-size: ${(props) => props.theme.fontSizes.base};

  #madeBy {
    text-align: center;
    padding-top: 1rem;
  }
`;
