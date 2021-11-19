// server 요청 주소
const backUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://api.nextweet.site'
    : 'http://localhost:3065';

export default backUrl;
