import shortId from 'shortid';
import produce from 'immer';

// dummy data
export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: 'seungwon',
      },
      content: '첫 번째 게시글 #오늘 #첫번째#두번째 ###세번째',
      Images: [
        {
          id: shortId.generate(),
          src:
            'https://lh3.googleusercontent.com/-QM-YKaNC4sU/YJL_kxzjK8I/AAAAAAAABD8/v4FR7LLfu1sWeRW2zyFgHmPc4T_vuMMhgCLcBGAsYHQ/mine.png',
        },
        {
          id: shortId.generate(),
          src:
            'https://lh3.googleusercontent.com/-xdIdn5mGuQU/YJL_kh2PHMI/AAAAAAAABEA/HpcmGT79egskPgJUBq4uvE6rU5BOfHNKgCLcBGAsYHQ/node.png',
        },
        {
          id: shortId.generate(),
          src:
            'https://lh3.googleusercontent.com/-KPJcyuvVuqU/YJL_2ovVlGI/AAAAAAAABEI/gGzBM88v-Msigj1-b6aclUSvsaiZl12pQCLcBGAsYHQ/next.png',
        },
        {
          id: shortId.generate(),
          src:
            'https://lh3.googleusercontent.com/-5tCrJKmqzxs/YJL_2pakYjI/AAAAAAAABEM/DIHLpxcgpM4RreQGRtr5QYmz_bEClTCYwCLcBGAsYHQ/react.png',
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: 'park',
          },
          content: '댓글1 내용입니다~~!',
        },
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: 'kim',
          },
          content: '댓글2 내용입니다~~!',
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: 'seungwon',
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: 'seungwon',
  },
});

// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.mainPosts.unshift(dummyPost(action.data));
        draft.addPostLoading = false;
        draft.addPostDone = true;
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.mainPosts = draft.mainPosts.filter(
          (post) => post.id !== action.data,
        );
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find(
          (post) => post.id === action.data.postId,
        );
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
