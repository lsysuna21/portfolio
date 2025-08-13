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
            <div id="modal-buttons-container" class="modal-buttons-container" style="display: none;">
              <a href="#" id="business-plan-btn" class="btn modal-btn" target="_blank">
                사업계획서&nbsp;<i class="fa fa-chevron-right"></i>
              </a>
              <a href="#" id="final-ppt-btn" class="btn modal-btn" target="_blank">
                최종 PPT&nbsp;<i class="fa fa-chevron-right"></i>
              </a>
              <a href="#" id="news-link-btn" class="btn modal-btn" target="_blank">
                뉴스 기사&nbsp;<i class="fa fa-chevron-right"></i>
              </a>
            </div>
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
    this.modalButtonsContainer = document.getElementById('modal-buttons-container');
    this.businessPlanBtn = document.getElementById('business-plan-btn');
    this.finalPptBtn = document.getElementById('final-ppt-btn');
    this.newsLinkBtn = document.getElementById('news-link-btn');
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
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.modal-trigger');
      if (!trigger) return;
    
      e.preventDefault();
    
      const imgSrc = trigger.getAttribute('data-modal-image');
      if (!imgSrc) {
        console.log('No data-modal-image attribute found');
        return;
      }
    
      const isPDF = imgSrc.toLowerCase().endsWith('.pdf');
      if (isPDF) {
        window.open(imgSrc, '_blank');
        return;
      }
    
      // 비디오 관련 속성 읽기
      const videoSrc = trigger.getAttribute ('data-modal-video') || null;
      const opts = {
        top: trigger.getAttribute('data-video-top')   ||  null,
        left: trigger.getAttribute('data-video-left')  ||  null,
        width: trigger.getAttribute('data-video-width') ||  null,
        aspect:trigger.getAttribute('data-video-aspect')||  null,
      };
    
      this.openModal(imgSrc, videoSrc, trigger);
    });
  }

  openModal(imageSrc, videoSrc = null, trigger = null) {
    this.modalImage.src = imageSrc;

    // fullpage.js 스크롤 비활성화
    if (window.fullpage_api) {
      this.fullpageApi = window.fullpage_api;
      this.fullpageApi.setAllowScrolling(false);
      this.fullpageApi.setKeyboardScrolling(false);
    }

    // 벤또롱또똣 프로젝트 확인 (이미지 경로로 판단)
  const isBentoProject = imageSrc.includes('bentto.jpg');
  
  if (isBentoProject && trigger) {
    // 벤또롱또똣 프로젝트인 경우 버튼들 표시
    this.showBentoButtons();
    // 벤또롱또똣 전용 클래스 추가
    this.modalOverlay.classList.add('bento-modal');
  } else {
    // 다른 프로젝트인 경우 버튼들 숨김
    this.hideBentoButtons();
    // 벤또롱또똣 전용 클래스 제거
    this.modalOverlay.classList.remove('bento-modal');
  }
    
    // 비디오가 있는 경우 처리
    if (videoSrc) {
      this.addVideoToModal(videoSrc, isBentoProject);
    } else {
      this.removeVideoFromModal();
    }
    
    this.modalOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  showBentoButtons() {
    // 버튼 링크
    this.businessPlanBtn.href = 'assets/img/etc/bento-plan.pdf';
    this.finalPptBtn.href = 'assets/img/etc/bento.pdf';
    this.newsLinkBtn.href = 'https://news.unn.net/news/articleView.html?idxno=549129';
    
    this.modalButtonsContainer.style.display = 'flex';
  }

  hideBentoButtons() {
    this.modalButtonsContainer.style.display = 'none';
  }

  addVideoToModal(videoSrc, isBentoProject = false) {
    // 기존 비디오 오버레이 제거
    this.removeVideoFromModal();
    
    
    const videoOverlay = document.createElement('div');
    videoOverlay.className = 'modal-video-overlay';

    // 👇 벤또롱또똣 프로젝트일 경우, 전용 클래스를 추가합니다.
    if (isBentoProject) {
      videoOverlay.classList.add('bento-video');
    }

    videoOverlay.innerHTML = `
      <video controls autoplay muted>
        <source src="${videoSrc}" type="video/mp4">
        브라우저가 비디오를 지원하지 않습니다.
      </video>
    `;
    
    // modal-image의 부모 요소에 비디오 오버레이를 추가합니다.
    this.modalImage.parentNode.appendChild(videoOverlay);
  }

  removeVideoFromModal() {
    const existingVideo = this.modalOverlay.querySelector('.modal-video-overlay');
    if (existingVideo) {
      existingVideo.remove();
    }
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
    percent: 'Team 30%',
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
    title: '까탈로그 신청페이지',
    percent: 'Personal 100%',
    stack: ['figma-logo.png'],
    duration: '4H',
    content: '랜딩페이지',
    planningImage: '',
    detailImage: 'assets/img/uxui/catal.png'
  },
  {
    title: '누구나',
    percent: 'Personal 100%',
    stack: ['figma-logo.png'],
    duration: '2weeks',
    content: '모바일어플 전체페이지',
    planningImage: 'assets/img/uxui/nuguna-planning.png',
    detailImage: 'assets/img/uxui/nuguna-view.png'
  },
  {
    title: '롯데시네마',
    percent: 'Personal 100%',
    stack: ['figma-logo.png'],
    duration: '1week',
    content: '메인페이지',
    planningImage: '', 
    detailImage: 'assets/img/uxui/lotte.png'
  },
  {
    title: '동대문구립도서관',
    percent: 'Personal 100%',
    stack: ['photo-logo.png'],
    duration: '4H',
    content: '메인&서브페이지',
    planningImage: '',
    detailImage: 'assets/img/uxui/d-view.png'
  },
  {
    title: '코스모스',
    percent: 'Team 30%',
    stack: ['xd-logo.png'],
    duration: '2Months',
    content: '모바일어플 전체페이지',
    planningImage: '', 
    detailImage: 'assets/img/uxui/cosmos-view.pdf'
  }
];

function updateUXUIProjectDetails(index) {
  const project = projectsUXUI[index];
  if (!project) return;

  const uxuiSection = document.getElementById('UXUI');
  if (!uxuiSection) return;

  const infoBox = uxuiSection.querySelector('.uxui-info');
  if (!infoBox) return;

  const titleEl = infoBox.querySelector('.project-title');
  const percentEl = infoBox.querySelector('.percent');
  const stackIconsEl = infoBox.querySelector('.stack-icons');
  const contentsEl = infoBox.querySelector('.pub-contents');
  const viewDetailBtn = uxuiSection.querySelector('.view-detail-btn');
  const planningBtn = uxuiSection.querySelector('.uxui-planning-btn');

  // 요소들이 존재하는지 확인
  if (!titleEl || !percentEl || !stackIconsEl || !contentsEl || !viewDetailBtn) {
    console.warn('UX/UI 섹션의 일부 요소를 찾을 수 없습니다.');
    return;
  }

  // 안전한 fade 효과 적용
  const fadeElement = infoBox.querySelector('.fade') || infoBox;
  
  // fadeOutIn 함수가 있으면 사용, 없으면 직접 구현
  if (typeof fadeOutIn === 'function') {
    fadeOutIn(infoBox, () => {
      updateUXUIContent();
    });
  } else {
    // fade 클래스가 있으면 fade 효과 적용
    if (fadeElement.classList.contains('fade')) {
      fadeElement.classList.remove('show');
      setTimeout(() => {
        updateUXUIContent();
        fadeElement.classList.add('show');
      }, 300);
    } else {
      // fade 클래스가 없으면 바로 업데이트
      updateUXUIContent();
    }
  }

  function updateUXUIContent() {
    titleEl.textContent = project.title;
    percentEl.textContent = project.percent;

    stackIconsEl.innerHTML = '';
    project.stack.forEach(img => {
      const el = document.createElement('img');
      el.src = `assets/img/publishing/${img}`;
      el.alt = img.replace('-logo.png', '');
      stackIconsEl.appendChild(el);
    });

    contentsEl.innerHTML = `
      <p>작업기간: ${project.duration}</p>
      <p>작업내용: ${project.content}</p>
    `;

    // View Detail 버튼 업데이트
    viewDetailBtn.setAttribute('data-modal-image', project.detailImage);

    // Planning 버튼 표시/숨김 및 모달 이미지 설정
    if (planningBtn) {
      // project.planningImage에 유효한 값이 있는지 확인하는 조건을 만듭니다.
      const shouldShowPlanningBtn = project.planningImage && project.planningImage.trim() !== '';

      // toggle을 사용하여 조건에 따라 'show' 클래스를 추가/제거합니다.
      planningBtn.classList.toggle('show', shouldShowPlanningBtn);

      // 버튼이 보여질 때만 data-modal-image 속성을 설정합니다.
      if (shouldShowPlanningBtn) {
      planningBtn.setAttribute('data-modal-image', project.planningImage);
      } else {
        planningBtn.removeAttribute('data-modal-image');
      }
    } else {
      console.warn('Planning 버튼을 찾을 수 없습니다.');
    }
  }
}

/* UX/UI 스와이퍼 변수 */
let uxuiSwiper;

/* UX/UI 스와이퍼 초기화 함수 */
function initUXUISwiper() {
  // 스와이퍼 컨테이너 존재 확인
  const swiperContainer = document.querySelector('.uxui-swiper');
  if (!swiperContainer) {
    console.warn('UX/UI 스와이퍼 컨테이너를 찾을 수 없습니다.');
    return;
  }

  // 이미 초기화되어 있다면 제거
  if (uxuiSwiper) {
    uxuiSwiper.destroy(true, true);
  }

  uxuiSwiper = new Swiper('.uxui-swiper', {
    slidesPerView: 3,
    spaceBetween: 10, //간격 줄이기
    centeredSlides: true,
    loop: true,
    initialSlide: 0,
    
    navigation: {
      nextEl: ".uxui-swiper-button-next",
      prevEl: ".uxui-swiper-button-prev",
    },
    
    // 슬라이드 변경 시 이벤트
    on: {
      slideChange: function () {
        const realIndex = this.realIndex;
        updateUXUIProjectDetails(realIndex);
      },
      
      // 스와이퍼 초기화 완료 후
      init: function() {
        updateUXUIProjectDetails(this.realIndex); 
      }
    },
    
    breakpoints: {
      768: {
        slidesPerView: 2.5,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
}

/* UX/UI 섹션 초기화 - 기존 DOMContentLoaded에 추가 */
document.addEventListener("DOMContentLoaded", function () {
  // Swiper 라이브러리 로딩 확인 후 UX/UI 스와이퍼 초기화
  setTimeout(() => {
    if (typeof Swiper !== 'undefined') {
      initUXUISwiper();
    } else {
      console.warn('Swiper 라이브러리가 로드되지 않았습니다.');
    }
  }, 500); // 다른 초기화 코드들이 완료된 후 실행
});

