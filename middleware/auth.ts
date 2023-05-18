async function isAuth() {
  try {
    const api = useApi();
    console.log(api);
    const res = await api.isAuth();
    return true;
  } catch (e: any) {
    console.log(e);
    return false;
  }
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.server) {
    return;
  }
  if (!(await isAuth())) return navigateTo("/login");
});
