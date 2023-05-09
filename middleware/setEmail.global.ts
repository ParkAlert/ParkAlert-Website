async function isAuth() {
  try {
    const api = useApi();
    const res = await api.isAuth();
    const email = useState("email", () => res.data.email);
  } catch (e: any) {}
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  await isAuth();
});
