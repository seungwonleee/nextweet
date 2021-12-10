import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
  // 전체 스타일 적용
  html, body {
    font-size: 10px;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  // 하단 스크롤바 없애기. antd gutter 문제
   .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  
  .ant-col:first-child {
      padding-left: 0 !important;
  }
  
  .ant-col:last-child {
    padding-right: 0 !important;
  }

  .ant-menu-item {
    border-bottom: none !important;
  }

  .ant-card-bordered {
    border-color: #D9D9D9;
  }

  /* 모든 버튼 */
  Button.ant-btn {
    border-radius: 25px;
  }

`;

export default Global;
