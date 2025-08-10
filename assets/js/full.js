let isFullpageInitialized = false;
let swiperInstance = null;

function initLayout() {
  const screenWidth = window.innerWidth;

  if (screenWidth > 768) {
    // PC: fullpage + swiper 모두 활성화
    if (!isFullpageInitialized) {
      fullpage_api = new fullpage('#fullpage', {
        licenseKey: 'gplv3-license',
        autoScrolling: true,
        navigation: true,
        anchors: ['Cover-page','Profile-page','Publishing-page','UXUI-page', 'Graphic-page','Graphic-page','3D-page','ETC-page','Thankyou-page'],
        navigationTooltips: ['Cover','Profile', 'Publishing','UXUI','Graphic', '', '3D', 'ETC','Thankyou'],
        showActiveTooltip: true,
        navigationPosition: 'left',
        scrollOverflow: false,
      });
      isFullpageInitialized = true;
    }

    if (!swiperInstance) {
      swiperInstance = new Swiper('.profile-swiper', {
        direction: 'horizontal',
        loop: false,
        touchStartPreventDefault: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          slideChange: function () {
            const { activeIndex, slides } = this;
            const totalSlides = slides.length;
            document.querySelector('.swiper-button-prev').style.display = (activeIndex === 0) ? 'none' : 'block';
            document.querySelector('.swiper-button-next').style.display = (activeIndex === totalSlides - 1) ?   'none' : 'block';
          },
        },
      });
      swiperInstance.emit('slideChange');
    }
  } else {
      // 모바일/태블릿: fullpage 제거
      if (isFullpageInitialized) {
        fullpage_api.destroy('all');
        fullpage_api = null;
        isFullpageInitialized = false;
      }
      // swiper 제거
      if (swiperInstance) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
      }
    }
}

// 초기 실행
initLayout();

// 화면 리사이즈 시 처리
window.addEventListener('resize', function () {
  initLayout();
});

// 로고 클릭 시 Cover 이동 (fullpage만 활성일 때)
document.querySelectorAll('.goToCover').forEach (function(link) {
  link.addEventListener('click', function(e) {
    if (isFullpageInitialized) {
      e.preventDefault();
      fullpage_api.moveTo('Cover-page');
    }
  });
});
