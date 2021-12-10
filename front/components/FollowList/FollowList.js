import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { ListWrapper, ListItem, ButtonWrapper } from './styles';
import { REMOVE_FOLLOWER_REQUEST, UNFOLLOW_REQUEST } from '../../reducers/user';

const FollowList = ({ header, data }) => {
  const dispatch = useDispatch();
  const cancelFollowing = (id) => () => {
    if (header === '팔로잉') {
      // 언팔로우
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    } else {
      // 팔로워 차단(삭제)
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: id,
      });
    }
  };

  return (
    <ListWrapper
      // grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <ButtonWrapper>
          <Button>더 보기</Button>
        </ButtonWrapper>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <ListItem>
          <ListItem.Meta title={item.nickname} description={item.email} />
          <Button onClick={cancelFollowing(item.id)}>삭제</Button>
        </ListItem>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
