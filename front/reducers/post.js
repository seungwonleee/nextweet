import shortId from 'shortid';

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
        { id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: 'park',
          },
          content: '댓글1 내용입니다~~!',
        },
        { id: shortId.generate(),
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };

    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        mainPosts: state.mainPosts.filter(post => post.id !== action.data),
        removePostLoading: false,
        removePostDone: true,
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        removePostLoading: false,
        removePostError: action.error,
      };

    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
