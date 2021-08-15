const glide = new Glide(".glide", {
  type: "carousel",
  startAt: 0,
  autoplay: 3500,
});
const captionsEL = document.querySelectorAll(".slide-caption");

glide.on(["mount.after", "run.after"], () => {
  // glideindex属性
  const caption = captionsEL[glide.index];
  //   anime 插件
  anime({
    targets: caption.children,
    opacity: [0, 1],
    duration: 400,
    easing: "spring(1, 80, 10, 0)",
    delay: anime.stagger(400, { start: 300 }),
    translateY: [anime.stagger([40, 10]), 0],
  });
});
// glide前先隐藏 进入时候页面是空的
glide.on("run.before", () => {
  document.querySelectorAll(".slide-caption > *").forEach((el) => {
    el.style.opacity = 0;
  });
});

glide.mount();
