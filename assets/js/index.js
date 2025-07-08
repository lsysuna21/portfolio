/* 상장 이미지 마우스오버 */
document.addEventListener("DOMContentLoaded", function () {
    const hoverTargets = document.querySelectorAll(".hover-target");
    const hoverImg = document.getElementById("hover-img");

    hoverTargets.forEach((target) => {
      target.addEventListener("mouseenter", function () {
        const imgSrc = this.dataset.img;
        hoverImg.style.backgroundImage = `url(${imgSrc})`;
        hoverImg.style.display = "block";
      });

      target.addEventListener("mousemove", function (e) {
        hoverImg.style.left = e.pageX + 20 + "px";
        hoverImg.style.top = e.pageY + 20 + "px";
      });

      target.addEventListener("mouseleave", function () {
        hoverImg.style.display = "none";
      });
    });
  });