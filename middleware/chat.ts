export default defineNuxtRouteMiddleware((to, from) => {
  // 在進入chat頁面前，需先確保chatEmail這個state已存在
  const emailData = useState("chatEmail", () => to.query.email);
  if (!emailData.value) return navigateTo("/match");
});
