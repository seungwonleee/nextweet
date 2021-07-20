import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Form } from 'antd';
import styled from 'styled-components';
import useInput from './hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const { Search } = Input;

const NicknameEditFormWrapper = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;

const NicknameEditForm = () => {
  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');
  const dispatch = useDispatch();

  const handleSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  return (
    <NicknameEditFormWrapper>
      <Search
        addonBefore="닉네임"
        enterButton="수정"
        value={nickname}
        onChange={onChangeNickname}
        onSearch={handleSubmit}
      />
    </NicknameEditFormWrapper>
  );
};

export default NicknameEditForm;
