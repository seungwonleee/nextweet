import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Form } from 'antd';
import useInput from './hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const { Search } = Input;

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
    <Form
      style={{
        marginBottom: '20px',
        border: '1px solid #d9d9d9',
        padding: '20px',
      }}
    >
      <Search
        addonBefore="닉네임"
        enterButton="수정"
        value={nickname}
        onChange={onChangeNickname}
        onSearch={handleSubmit}
      />
    </Form>
  );
};

export default NicknameEditForm;
