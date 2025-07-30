/* ---- 공통 모달 시스템 ---- */
class ModalSystem {
  constructor() {
    this.modalOverlay = null;
    this.modalContent = null;
    this.modalImage = null;
    this.modalClose = null;
    this.topButton = null;
    this.fullpageApi = null; // fullpage.js API 참조
    this.init();
  }

  init() {
    // 모달 HTML 구조 생성
    this.createModalStructure();
    this.bindEvents();
    this.initModalTriggers();
  }

  createModalStructure() {
    // 기존 모달이 있다면 제거
    const existingModal = document.getElementById('modal-overlay');
    if (existingModal) {
      existingModal.remove();
    }

    // 모달 HTML 생성
    const modalHTML = `
      <div id="modal-overlay" class="modal-overlay">
        <div class="modal-content">
          <span class="modal-close">&times;</span>
          <div class="modal-image-container">
            <img id="modal-image" src="" alt="모달 이미지">
            <button class="modal-top-btn" title="맨 위로">
              <i class="xi-angle-up"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    // body에 모달 추가
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // 요소 참조 저장
    this.modalOverlay = document.getElementById('modal-overlay');
    this.modalContent = this.modalOverlay.querySelector('.modal-content');
    this.modalImage = document.getElementById('modal-image');
    this.modalClose = this.modalOverlay.querySelector('.modal-close');
    this.topButton = this.modalOverlay.querySelector('.modal-top-btn');
  }

  bindEvents() {
    // 닫기 버튼 클릭
    this.modalClose.addEventListener('click', () => this.closeModal());

    // 오버레이 클릭 (모달 외부 클릭)
    this.modalOverlay.addEventListener('click', (e) => {
      if (e.target === this.modalOverlay) {
        this.closeModal();
      }
    });

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalOverlay.classList.contains('show')) {
        this.closeModal();
      }
    });

    // 탑 버튼 클릭
    this.topButton.addEventListener('click', () => {
      this.modalContent.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // 모달 스크롤 시 탑 버튼 표시/숨김
    this.modalContent.addEventListener('scroll', () => {
      if (this.modalContent.scrollTop > 200) {
        this.topButton.classList.add('show');
      } else {
        this.topButton.classList.remove('show');
      }
    });
  }

  initModalTriggers() {
    // 모든 .modal-trigger 클래스를 가진 요소에 이벤트 바인딩
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.modal-trigger');
      if (trigger) {
        e.preventDefault();
        console.log('Modal trigger clicked:', trigger); // 디버깅용
        const imageSrc = trigger.getAttribute('data-modal-image');
        console.log('Image source:', imageSrc); // 디버깅용
        if (imageSrc) {
          this.openModal(imageSrc);
        } else {
          console.log('No data-modal-image attribute found');
        }
      }
    });
  }

  openModal(imageSrc) {
    console.log('Opening modal with image:', imageSrc); // 디버깅용
    
    // fullpage.js 스크롤 비활성화
    if (window.fullpage_api) {
      this.fullpageApi = window.fullpage_api;
      this.fullpageApi.setAllowScrolling(false);
      this.fullpageApi.setKeyboardScrolling(false);
    }

    // 모달 열기
    this.modalImage.src = imageSrc;
    this.modalOverlay.classList.add('show');
    
    // body 스크롤 방지
    document.body.style.overflow = 'hidden';
    
    // 탑 버튼 초기화
    this.topButton.classList.remove('show');
    this.modalContent.scrollTop = 0;
    
    console.log('Modal opened'); // 디버깅용
  }

  closeModal() {
    // fullpage.js 스크롤 활성화
    if (this.fullpageApi) {
      this.fullpageApi.setAllowScrolling(true);
      this.fullpageApi.setKeyboardScrolling(true);
    }

    // 모달 닫기
    this.modalOverlay.classList.remove('show');
    this.modalImage.src = '';
    
    // body 스크롤 복구
    document.body.style.overflow = '';
    
    // 탑 버튼 숨김
    this.topButton.classList.remove('show');
  }
}





/* ---- 퍼블리싱 썸네일 누르면 정보 바뀜 ---- */
// 각 프로젝트 정보 정의
const projects = [
  {
    title: '배스킨라빈스',
    desc: 'Main Page',
    percent: 'Personal 100%',
    stack: ['figma-logo.png', 'html-logo.png', 'css-logo.png'],
    duration: '1weeks',
    content: '메인페이지',
    video: 'assets/img/publishing/baskin.MP4',
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
    video: 'assets/img/publishing/gompyo.MP4',
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
    video: 'assets/img/publishing/billie.mp4',
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
    video: 'assets/img/publishing/arthub.mp4',
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
    video: 'assets/img/publishing/board.mp4',
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

    // Planning 버튼 표시/숨김 및 모달 트리거 설정
    if (project.showPlanning && project.planningImage) {
      planningBtn.classList.add('show', 'modal-trigger');
      planningBtn.dataset.modalImage = project.planningImage;
      planningBtn.href = '#';
    } else {
      planningBtn.classList.remove('show', 'modal-trigger');
      planningBtn.removeAttribute('data-modal-image');
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

// 상장 이미지 마우스오버 (기존 코드)
document.addEventListener("DOMContentLoaded", function () {
  // 모달 시스템 초기화
  const modalSystem = new ModalSystem();

  // 첫 번째 프로젝트 정보로 초기화
  updateProjectDetails(0);
  
  // 상장 이미지 hover 효과
  const hoverTargets = document.querySelectorAll(".hover-target");
  const hoverImg = document.getElementById("hover-img");

  if (hoverTargets.length > 0 && hoverImg) {
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
  }
  
  // 썸네일 네비게이션 버튼 처리
  const thumbList = document.querySelector('.thumb-list');
  const thumbItems = thumbList.querySelectorAll('li');
  const prevBtn = document.querySelector('.nav-btn.prev');
  const nextBtn = document.querySelector('.nav-btn.next');
  const wrapper = document.querySelector('.thumb-wrapper');

  const isMobile = window.matchMedia("(max-width: 1200px)").matches;
  
  function updateNavButtons() {
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





/* --------UX/UI--------- */
const projectsUXUI = [
  {
    title: '까탈로그 신청 페이지',
    desc: 'Landing Page',
    percent: 'Personal 100%',
    stack: ['figma-logo.png', 'html-logo.png', 'css-logo.png'],
    duration: '1week',
    content: '신청페이지',
    planningImage: 'assets/img/publishing/katalog-plan.png'
  },
  {
    title: '다음 프로젝트',
    desc: '서브 설명',
    percent: 'Team 40%',
    stack: ['figma-logo.png', 'html-logo.png'],
    duration: '2weeks',
    content: '기획 + 디자인',
    planningImage: 'assets/img/publishing/another-plan.png'
  }
];

function updateUXUIProjectDetails(index) {
  const project = projectsUXUI[index];

  const infoBox = document.querySelector('.uxui-info');
  const titleEl = infoBox.querySelector('.project-title');
  const descEl = infoBox.querySelector('.project-desc');
  const percentEl = infoBox.querySelector('.percent');
  const stackIconsEl = infoBox.querySelector('.stack-icons');
  const contentsEl = infoBox.querySelector('.pub-contents');
  const viewDetailBtn = infoBox.querySelector('.view-detail-btn');

  fadeOutIn(infoBox, () => {
    titleEl.textContent = project.title;
    descEl.textContent = project.desc;
    percentEl.textContent = project.percent;

    stackIconsEl.innerHTML = '';
    project.stack.forEach(img => {
      const el = document.createElement('img');
      el.src = `assets/img/publishing/${img}`;
      stackIconsEl.appendChild(el);
    });

    contentsEl.innerHTML = `
      <p>작업기간: ${project.duration}</p>
      <p>작업내용: ${project.content}</p>
    `;

    viewDetailBtn.dataset.modalImage = project.planningImage;
  });
}

/* 스와이퍼 초기화 */
const uxuiSwiper = new Swiper('.uxui-swiper', {
  slidesPerView: 1.5, // 한 번에 1.5장 보여줌
  spaceBetween: 30,   // 슬라이드 간 간격
  centeredSlides: true, // 가운데 정렬
  loop: true,
  navigation: {
    nextEl: ".uxui-swiper-button-next",
    prevEl: ".uxui-swiper-button-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 2.5, // 태블릿 이상에선 더 많이 보이게
    },
    1024: {
      slidesPerView: 3, // 데스크탑에서는 3개 보이게 조절 가능
    },
  },
});

/* 페이지 로딩시 초기화 */
document.addEventListener("DOMContentLoaded", function () {
  updateUXUIProjectDetails(0); // 첫 프로젝트 정보 표시
});