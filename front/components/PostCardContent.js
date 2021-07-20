import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { useSelector } from 'react-redux';

const { TextArea } = Input;

const PostCardContent = ({
  postData,
  modify,
  handleCancelModifyPost,
  handleSavePost,
}) => {
  const { updatePostDone } = useSelector((state) => state.post);

  const [modifyText, setModifyText] = useState(postData);

  const handleModifyText = useCallback((event) => {
    setModifyText(event.target.value);
  }, []);

  useEffect(() => {
    if (updatePostDone) {
      handleCancelModifyPost();
    }
  }, [updatePostDone]);

  return (
    <div>
      {modify ? (
        <>
          <TextArea rows={2} value={modifyText} onChange={handleModifyText} />
          <span
            role="presentation"
            onClick={handleCancelModifyPost}
            style={{ cursor: 'pointer' }}
          >
            취소
          </span>
          <span> | </span>
          <span
            role="presentation"
            onClick={handleSavePost(modifyText)}
            style={{ cursor: 'pointer' }}
          >
            완료
          </span>
        </>
      ) : (
        postData.split(/(#[^\s#]+)/g).map((text) => {
          if (text.match(/(#[^\s]+)/)) {
            return (
              <Link
                key={text}
                href={{ pathname: '/hashtag', query: { tag: text.slice(1) } }}
                as={`/hashtag/${text.slice(1)}`}
              >
                <a>{text}</a>
              </Link>
            );
          }
          return text;
        })
      )}
    </div>
  );
};

// isRequired 모든 사용처에 모두 입력되어야 한다.
PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
  modify: PropTypes.bool.isRequired,
  handleCancelModifyPost: PropTypes.func.isRequired,
  handleSavePost: PropTypes.func.isRequired,
};

export default PostCardContent;
