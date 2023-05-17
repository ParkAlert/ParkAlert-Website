async function isAuth() {
  try {
    const api = useApi();
    const res = await api.isAuth();
    const email = useState("email", () => res.data.email);
    // return res.data && res.data.email;
    return true;
  } catch (e: any) {
    return false;
  }
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log(to.path);
  if (!(await isAuth())) {
    const path = to.path;
    localStorage.setItem("redirectUrl", path);
    console.log("fuck")
    return navigateTo("/login");
  }
  
});
