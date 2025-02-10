export const inProtectedRoute = (pathname: string) => config.matcher.some((pattern = '') => {
  const regex = new RegExp(`^${pattern.replace(/:([a-zA-Z_]+)/g, '[^/]+')}$`);
  return regex.test(pathname);
});
  
export const config = {
  matcher: []
};