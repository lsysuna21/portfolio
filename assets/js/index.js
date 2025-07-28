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
    showPlanning: false,
    siteLink: 'https://lsysuna21.github.io/baskinrobbins/',
    githubLink: 'https://github.com/lsysuna21/baskinrobbins'
  },
  {
    title: '곰표',
    desc: 'Main Page',
    percent: 'Personal 100%',
    stack: ['figma-logo.png', 'html-logo.png', 'css-logo.png', 'jquery-logo.png'],
    duration: '2weeks',
    content: '메인페이지',
    video: 'video/gompyo.mp4',
    showPlanning: true,
    siteLink: 'https://lsysuna21.github.io/gompyo/',
    githubLink: 'https://github.com/lsysuna21/gompyo',
    planningImage: 'assets/img/publishing/gompyo-plan.png'
  },
  {
    title: '빌리아일리쉬',
    desc: '전체 페이지',
    percent: 'Personal 100%',
    stack: ['figma-logo.png', 'html-logo.png','css-logo.png', 'jquery-logo.png'],
    duration: '3weeks',
    content: '12 Pages',
    video: 'video/billie.mp4',
    showPlanning: false,
    siteLink: 'https://lsysuna21.github.io/billieeilish/',
    githubLink: 'https://github.com/lsysuna21/billieeilish'
  },
  {
    title: '아트허브',
    desc: '반응형 전체페이지',
    percent: 'Team 40%',
    stack: ['figma-logo.png','html-logo.png', 'css-logo.png','java-logo.png'],
    duration: '4weeks',
    content: '12 Pages',
    video: 'video/arthub.mp4',
    showPlanning: true,
    siteLink: 'https://junes-lie.github.io/group-C/',
    githubLink: 'https://github.com/junes-lie/group-C',
    planningImage: 'assets/img/publishing/arthub-plan.png'
  },
  {
    title: '보드라이프',
    desc: '하이브리드웹앱',
    percent: 'Team 40%',
    stack: ['figma-logo.png', 'html-logo.png', 'css-logo.png','java-logo.png'],
    duration: '2weeks',
    content: '12 Pages',
    video: 'video/boardlife.mp4',
    showPlanning: true,
    siteLink: 'https://reroll-boardlife.netlify.app/',
    githubLink: 'https://github.com/dasiy-design/boardlife',
    planningImage: 'assets/img/publishing/boardlife-plan.png'
  }
];

// 요소 캐싱
const projectInfoEl = document.querySelector('.project-info');
const titleEl = document.querySelector('.project-title');
const descEl = document.querySelector('.project-desc');
const percentEl = document.querySelector('.percent');
const stackIconsEl = document.querySelector('.stack-icons');
const contentsEl = document.querySelector('.pub-contents');
const videoEl = document.getElementById('project-video');
const siteBtn = document.querySelector('.site-btn');
const githubBtn = document.querySelector('.github-btn');
const planningBtn = document.querySelector('.planning-btn');
const proInfoLeftEl = document.querySelector('.proinfo-left');

// 현재 선택된 프로젝트 인덱스 추적
let currentProjectIndex = 0;

function updateProjectDetails(index) {
  const project = projects[index];
  currentProjectIndex = index; // 현재 인덱스 업데이트

  fadeOutIn(projectInfoEl, () => {
    // 텍스트 정보 업데이트
    titleEl.textContent = project.title;
    descEl.textContent = project.desc;
    percentEl.textContent = project.percent;
    contentsEl.innerHTML = `
      <p>작업기간: ${project.duration}</p>
      <p>작업내용: ${project.content}</p>
    `;
    // 스택 아이콘 업데이트
    stackIconsEl.innerHTML = '';
    project.stack.forEach(stackImg => {
      const img = document.createElement('img');
      img.src = `assets/img/publishing/${stackImg}`;
      stackIconsEl.appendChild(img);
    });

    // 버튼 링크 업데이트
    siteBtn.href = project.siteLink;
    githubBtn.href = project.githubLink;

    // Planning 버튼 표시/숨김 처리
    if (project.showPlanning && project.planningImage) {
      planningBtn.classList.add('show');
      planningBtn.href = '#'; // 모달용이므로 # 설정
    } else {
      planningBtn.classList.remove('show');
      planningBtn.href = '#';
    }
  });

  // 영상 업데이트 별도 처리
  fadeOutIn(videoEl, () => {
    videoEl.src = project.video;
    videoEl.load();
    videoEl.play();
  });
}

// Fade Out -> 내용 변경 -> Fade In 효과를 주는 함수
function fadeOutIn(element, updateFn) {
  const fadeTarget = element.querySelector('.fade') || element;
  fadeTarget.classList.remove('show');
  
  setTimeout(() => {
    updateFn(); // 모든 업데이트 로직 실행
    fadeTarget.classList.add('show');
  }, 300);
}

// 썸네일 리스트의 각 아이템에 클릭 이벤트 추가
document.querySelectorAll('.thumb-list li').forEach((li, index) => {
  li.addEventListener('click', () => {
    updateProjectDetails(index); // 인덱스에 맞는 프로젝트 정보로 업데이트
  });
});

// 페이지가 처음 로드될 때 첫 번째 프로젝트 정보로 초기화
document.addEventListener('DOMContentLoaded', () => {
  updateProjectDetails(0);
  
  /* 썸네일 갯수에 따라 좌우버튼 생기고 없어짐 */
  const thumbList = document.querySelector('.thumb-list');
  const thumbItems = thumbList.querySelectorAll('li');
  const prevBtn = document.querySelector('.nav-btn.prev');
  const nextBtn = document.querySelector('.nav-btn.next');
  const wrapper = document.querySelector('.thumb-wrapper');

  const isMobile = window.matchMedia("(max-width: 1200px)").matches;
  
  function updateNavButtons() {
    // 화면에 보여줄 최대 썸네일 개수 (PC 기준)
    const MAX_VISIBLE_COUNT = 5;

    if (isMobile) {
        const visibleCount = Math.floor(wrapper.offsetWidth / 150);
        if (thumbItems.length <= visibleCount) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
        }
    } else {
        // PC 기준: 아이템 개수가 5개를 초과할 때만 버튼 표시
        if (thumbItems.length > MAX_VISIBLE_COUNT) {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
        } else {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }
    }
}

  // 최초 실행 및 윈도우 리사이즈 대응
  updateNavButtons();
  window.addEventListener('resize', updateNavButtons);
  
  let scrollStep = 100;
  nextBtn.addEventListener('click', () => {
    thumbList.scrollBy({ top: scrollStep, behavior: 'smooth' });
  });
  prevBtn.addEventListener('click', () => {
    thumbList.scrollBy({ top: -scrollStep, behavior: 'smooth' });
  });
});

// 모달 관련 처리
const modalOverlay = document.getElementById('modal-overlay');
const modalImage = document.getElementById('modal-image');
const modalClose = document.querySelector('.modal-close');

// Planning 버튼 클릭 시 모달 열기
planningBtn.addEventListener('click', (e) => {
  e.preventDefault(); // a 태그의 기본 동작 방지
  const project = projects[currentProjectIndex];

  if (project.showPlanning && project.planningImage) {
    modalImage.src = project.planningImage;
    modalOverlay.classList.add('show');
  }
});

// 모달 닫기 이벤트들
modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// ESC 키로 모달 닫기
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('show')) {
    closeModal();
  }
});