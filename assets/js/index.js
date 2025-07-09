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


/* 퍼블리싱 썸네일 누르면 정보 바뀜 */
// 각 프로젝트 정보 정의
const projects = [
  {
    title: '배스킨라빈스',
    desc: 'Main Page',
    percent: 'Personal 100%',
    stack: ['figma-logo.png', 'html-logo.png', 'css-logo.png'],
    duration: '1weeks',
    content: '메인페이지',
    video: 'video/br.mp4',
    showPlanning: false
  },
  {
    title: '곰표',
    desc: 'Main Page',
    percent: 'Personal 100%',
    stack: ['figma-logo.png', 'html-logo.png', 'css-logo.png', 'jquery-logo.png'],
    duration: '2weeks',
    content: '메인페이지',
    video: 'video/gompyo.mp4',
    showPlanning: true
  },
  {
    title: '빌리아일리쉬',
    desc: '전체 페이지',
    percent: 'Personal 100%',
    stack: ['figma-logo.png', 'html-logo.png','css-logo.png', 'jquery-logo.png'],
    duration: '3weeks',
    content: '12 Pages',
    video: 'video/billie.mp4',
    showPlanning: false
  },
  {
    title: '아트허브',
    desc: '반응형 전체페이지',
    percent: 'Team 40%',
    stack: ['figma-logo.png','html-logo.png', 'css-logo.png','java-logo.png'],
    duration: '4weeks',
    content: '12 Pages',
    video: 'video/arthub.mp4',
    showPlanning: true
  },
  {
    title: '보드라이프',
    desc: '하이브리드웹앱',
    percent: 'Team 40%',
    stack: ['figma-logo.png', 'html-logo.png', 'css-logo.png','java-logo.png'],
    duration: '2weeks',
    content: '12 Pages',
    video: 'video/boardlife.mp4',
    showPlanning: true
  }
];

// 요소 캐싱
const titleEl = document.querySelector('.project-title');
const descEl = document.querySelector('.project-desc');
const percentEl = document.querySelector('.percent');
const stackIconsEl = document.querySelector('.stack-icons');
const contentsEl = document.querySelector('.pub-contents');
const videoEl = document.getElementById('project-video');
const planningBtn = document.querySelector('.planning-btn');

document.querySelectorAll('.thumb-list li').forEach((li, index) => {
  li.addEventListener('click', () => {
    const project = projects[index];

    // 정보 박스 업데이트
    fadeOutIn(document.querySelector('.proinfo-left'), () => {
      titleEl.textContent = project.title;
      descEl.textContent = project.desc;
      percentEl.textContent = project.percent;
      contentsEl.innerHTML = `
        <p>작업기간: ${project.duration}</p>
        <p>작업내용: ${project.content}</p>
      `;
      stackIconsEl.innerHTML = '';
      project.stack.forEach(stackImg => {
        const img = document.createElement('img');
        img.src = `assets/img/publishing/${stackImg}`;
        stackIconsEl.appendChild(img);
      });
    });

    // 영상 업데이트
    fadeOutIn(videoEl, () => {
      videoEl.src = project.video;
      videoEl.load();
      videoEl.play();
    });

    if (project.showPlanning) {
      planningBtn.classList.add('show');
    } else {
      planningBtn.classList.remove('show');
    }
  });
});


function fadeOutIn(element, updateFn) {
  // 1단계: opacity 0
  element.classList.remove('show');

  // 2단계: 내용 교체 후 다시 보여줌
  setTimeout(() => {
    updateFn(); // 내부 내용 업데이트
    element.classList.add('show');
  }, 300); // transition 시간과 맞추기
}


/* 썸네일 갯수에 따라 좌우버튼 생기고 없어짐 */
document.addEventListener('DOMContentLoaded', () => {
  const thumbList = document.querySelector('.thumb-list');
  const thumbItems = thumbList.querySelectorAll('li');
  const prevBtn = document.querySelector('.nav-btn.prev');
  const nextBtn = document.querySelector('.nav-btn.next');
  const wrapper = document.querySelector('.thumb-wrapper');

  const isMobile = window.matchMedia("(max-width: 1200px)").matches;
  
  if (isMobile) {
    // 가로 스크롤 시 필요한 썸네일 개수 기준 (예: 화면에 3개까지 보일 수 있음)
    const visibleCount = Math.floor(wrapper.offsetWidth / 150); // 썸네일 하나가 150px이라고 가정

    if (thumbItems.length <= visibleCount) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'block';
      nextBtn.style.display = 'block';
    }
  } else {
    // PC에서는 버튼 항상 표시
    prevBtn.style.display = 'block';
    nextBtn.style.display = 'block';
  }
});
