const BASE_URL = "http://localhost:3000"

const CLIENT_ID = process.env.REACT_APP_KAKAO_AUTH_CLIENT_ID;
const REDIRECT_URI = `${BASE_URL}/oauth/callback`;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;