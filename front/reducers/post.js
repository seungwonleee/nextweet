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
  postAdded: false,
};

const ADD_POST = "ADD_POST";

export const addPost = {
  type: ADD_POST,
};

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
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
