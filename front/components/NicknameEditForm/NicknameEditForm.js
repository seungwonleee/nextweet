import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../../reducers/user';
import { NicknameEditFormWrapper, StyledSearch } from './styles';

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
      <StyledSearch
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
