//dummy data
export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "seungwon",
      },
      content: "첫 번째 게시글 #오늘 #첫번째#두번째 ###세번째",
      Images: [
        {
          src:
            "https://lh3.googleusercontent.com/-QM-YKaNC4sU/YJL_kxzjK8I/AAAAAAAABD8/v4FR7LLfu1sWeRW2zyFgHmPc4T_vuMMhgCLcBGAsYHQ/mine.png",
        },
        {
          src:
            "https://lh3.googleusercontent.com/-xdIdn5mGuQU/YJL_kh2PHMI/AAAAAAAABEA/HpcmGT79egskPgJUBq4uvE6rU5BOfHNKgCLcBGAsYHQ/node.png",
        },
        {
          src:
            "https://lh3.googleusercontent.com/-KPJcyuvVuqU/YJL_2ovVlGI/AAAAAAAABEI/gGzBM88v-Msigj1-b6aclUSvsaiZl12pQCLcBGAsYHQ/next.png",
        },
        {
          src:
            "https://lh3.googleusercontent.com/-5tCrJKmqzxs/YJL_2pakYjI/AAAAAAAABEM/DIHLpxcgpM4RreQGRtr5QYmz_bEClTCYwCLcBGAsYHQ/react.png",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "park",
          },
          content: "댓글1 내용입니다~~!",
        },
        {
          User: {
            nickname: "kim",
          },
          content: "댓글2 내용입니다~~!",
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = {
  id: 2,
  content: "더미데이터입니다.",
  User: {
    id: 1,
    nickname: "seungwon",
  },
  Images: [],
  Comments: [],
};

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
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };

    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
      };
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
