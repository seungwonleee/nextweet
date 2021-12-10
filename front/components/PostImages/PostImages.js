import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import ImagesZoom from '../ImageZoom/index';
// import backUrl from '../config/config';

const PostImages = ({ images }) => {
  const [showImageZoom, setShowImageZoom] = useState(false);
  const onZoom = useCallback(() => {
    setShowImageZoom(true);
  }, []);

  const handleClose = useCallback(() => {
    setShowImageZoom(false);
  }, []);
  // 이미지 1개 이상일 경우
  if (images.length === 1) {
    return (
      <>
        <img
          // style={{ maxHeight: '232px', maxWidth: '232px' }}
          src={`${images[0].src}`}
          alt={images[0].src}
          onClick={onZoom}
        />
        {showImageZoom && <ImagesZoom images={images} onClose={handleClose} />}
      </>
    );
  }
  // 이미지 2개 이상일 경우
  if (images.length === 2) {
    return (
      <>
        <img
          style={{ width: '50%', display: 'inline-block' }}
          src={`${images[0].src}`}
          alt={images[0].src}
          onClick={onZoom}
        />
        <img
          style={{ width: '50%', display: 'inline-block' }}
          src={`${images[1].src}`}
          alt={images[1].src}
          onClick={onZoom}
        />
        {showImageZoom && <ImagesZoom images={images} onClose={handleClose} />}
      </>
    );
  }
  return (
    // 이미지 3개 이상일 경우
    <>
      <div>
        <img
          width="50%"
          src={`${images[0].src}`}
          alt={images[0].src}
          onClick={onZoom}
        />
        <div
          style={{
            display: 'inline-block',
            width: '50%',
            textAlign: 'center',
            verticalAlign: 'middle',
          }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더 보기
        </div>
      </div>
      {showImageZoom && <ImagesZoom images={images} onClose={handleClose} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;
