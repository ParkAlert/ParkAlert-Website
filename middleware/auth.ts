import { apiIsAuth } from "../composables/api";

async function isAuth() {
  try {
    await apiIsAuth();
    return true;
  } catch (e) {
    return false;
  }
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!(await isAuth())) return navigateTo("/login");
});