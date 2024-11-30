export const getAuthTokenFromCookie = () => {
  const cookies = document.cookie.split(";");
  const authCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("_auth=")
  );

  if (authCookie) {
    return decodeURIComponent(authCookie.split("=")[1]);
  }
  return null;
};
