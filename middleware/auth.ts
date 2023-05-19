async function isAuth() {
  try {
    const api = useApi();
    const res = await api.isAuth();
    return true;
  } catch (e: any) {
    console.log(e);
    return false;
  }
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.server) {
    // 需使用到local storage ，因此不在server端運作
    return;
  }
  if (!(await isAuth())) return navigateTo("/login");
});
