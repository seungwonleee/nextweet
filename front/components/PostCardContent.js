import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const PostCardContent = ({ postData }) => (
  <div>
    {postData.split(/(#[^\s#]+)/g).map((text, index) => {
      if (text.match(/(#[^\s]+)/)) {
        return (
          <Link
            key={index}
            href={{ pathname: "/hashtag", query: { tag: text.slice(1) } }}
            as={`/hashtag/${text.slice(1)}`}
          >
            <a>{text}</a>
          </Link>
        );
      }
      return text;
    })}
  </div>
);

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
