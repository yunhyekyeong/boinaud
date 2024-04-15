gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// 헤더 로고
const headerTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".wrapper",
    start: "0% 0%",
    scrub: 0,
    // markers: true,
  },
  ease: "none",
});
headerTl.to(".header .stamp .txt", { rotation: 360 });

const mainTit = new SplitType(".sc-main .big-tit", {
  types: "line, words",
});


// 인트로
const introTl = gsap.timeline({
  onComplete: function () {
    // 메인
    mainTl.play();
  },
});
introTl
  .from(".sc-intro .big-logo",
  { xPercent: -30, opacity: 0, duration: 2 },"a")
  .from(".sc-intro .stamp", { opacity: 0, duration: 2 }, "a")
  .to(".sc-intro", { clipPath: "inset(0 0 0 100%)",}
);

//  메인
function mainLineAni(timeline) {
  timeline
    .fromTo(
      ".sc-main .big-tit .line .word",
      { yPercent: 100 },
      { yPercent: 0, stagger: 0.1, duration: 1 },
      "a"
    )
    .fromTo(
      ".sc-main .line-top",
      { clipPath: "inset(0 -0.6em  100%)" },
      { clipPath: "inset(0 -0.6em  0%)", duration: 1 },
      "a"
    )
    .fromTo(
      ".sc-main .line-bottom",
      { clipPath: "inset(100% -0.6em  0)" },
      { clipPath: "inset(0% -0.6em  0)", duration: 1 },
      "a"
    );
}

// 메인 로드
const mainTl = gsap.timeline({
  paused: true,
  ease: "none",
});
mainLineAni(mainTl);

// 메인 스크롤
const mainScrollTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-main",
    start: "0% 90%",
    end: "100% 20%",
    toggleActions: "none none play reset",
    // markers: true,
  },
  ease: "none",
});
mainLineAni(mainScrollTl);



// 비지니스 섹션 배경
const businessTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-business",
    start: "0% 0%",
    end: "100% 100%",
    scrub: 0,
  },
});
businessTl
  .fromTo(".sc-business .inner .bg .img", { y: -100 }, { y: 100 }, "a")
  .to(".sc-business .inner .bg .img img", { opacity: 0.9 }, "a"
);





// 반응형  토글액션 공통 변수
var viewport = window.matchMedia("(min-width: 1025px)").matches;
var toggleAction = viewport ? "play reset play reset" : "restart pause resume pause";


// 스토리 섹션
const storyTl = gsap.timeline();
storyTl
  .from(".sc-story h2 .tit .line", { clipPath: "inset(-1em 0 -0.15em)" }, "a")
  .from(".sc-story h2 .tit .word", { yPercent: 100, stagger: 0.02, duration: 1 }, "a")
  .from(".sc-story h2 .ico-arrow", { scale: 0, duration: 1 }, "a")
  .fromTo(".sc-story h2 .surround", 
    { maskImage: "conic-gradient(from -24deg, black 0deg, transparent 0deg)" }, 
    { maskImage: "conic-gradient(from -24deg, black 360deg, transparent 360deg)", duration: 3 }
  )
;

ScrollTrigger.create({
  animation: storyTl,
  trigger: ".sc-story h2",
  start: "0% 90%",
  end: "100% 0%",
  ease: "none",
  toggleActions: toggleAction,
});

// 이미지 컬러 변경
const storyImgTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-story .box-1",
    start: "0% 0%",
    end: "120% 100%",
    scrub: 0,
  },
  ease: "none",
});
storyImgTl.fromTo(
  ".sc-story .box-1 .history .img-box .img2",
  { clipPath: "inset(0 0 100%)" },
  { clipPath: "inset(0 0 0%)" }
);







// 인디펜던트 섹션 스크롤 배경이미지
const indepanBgTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-independent .box-3",
    start: "-30% 50%",
    end: "100% 50%",
    scrub: 0,
    // markers: true,
  },
  ease: "none",
});
indepanBgTl.to(".sc-independent .inner .box-3 .wrap .bg", { opacity: 0.4 });

// 인디펜던트 섹션 스크롤 고정
const indepanFixTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-independent .box-3",
    start: "0% 0%",
    end: "400% 0%",
    scrub: 0,
    pin: ".sc-independent .fixed",
    // markers: true,
  },
  ease: "none",
});
const box3Wrap = ".sc-independent .box-3 .wrap";
const box3Wrap2 = ".sc-independent .box-3 .wrap2";
indepanFixTl
  .to(`${box3Wrap} .big-tit`, { opacity: 0 }, "a")
  .from(`${box3Wrap} .left`, { yPercent: 100 }, "a")
  .from(`${box3Wrap} .right`, { yPercent: -100, display: "none" }, "a")

  .to(`${box3Wrap2} .big-tit`, { opacity: 0.5 }, "b")
  .to(`${box3Wrap2} .bg`, { opacity: 0.4 }, "b")
  .to(`${box3Wrap} .bg`, { opacity: 0 }, "b")
  .to(`${box3Wrap} .right`, { xPercent: 100 }, "b")
  .to(`${box3Wrap} .left`, { clipPath: "inset(0 100% 0 0)" }, "b")

  .to(`${box3Wrap} .right`, { display: "none" }, "c")
  .from(`${box3Wrap2} .left`, { yPercent: 100 }, "c")
  .from(`${box3Wrap2} .right`, { yPercent: -100, display: "none" }, "c")
  .from(`${box3Wrap2} .left img`, { scale: 1.2 }, "c")
  .from(`${box3Wrap2} .right img`, { scale: 1.2 }, "c")
  .to(`${box3Wrap2} .big-tit`, { opacity: 0 }, "c")
  .to(`${box3Wrap2} .bg`, { opacity: 0 }, "c");

// 넥스트 섹션
gsap.from(".sc-next .under-tit", {
  opacity: 0,
  yPercent: 100,
  duration: 1,
  scrollTrigger: {
    trigger: ".sc-next .under-tit",
    start: "0% 90%",
    end: "100% 100%",
    toggleActions: "play none reverse none",
    // markers: true,
  },
});

// 푸터 섹션 스크롤 스티키

gsap.from(
  ".footer .logo-ft",
  {
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".footer .logo-ft",
      start: "0% 90%",
      end: "100% 100%",
      toggleActions: "play none reverse none",
      // markers: true,
    },
  },
  "a"
);
gsap.from(
  ".footer .menu-item",
  {
    opacity: 0,
    stagger: 0.1,
    duration: 1,
    scrollTrigger: {
      trigger: ".footer .menu-list",
      start: "0% 90%",
      end: "100% 100%",
      toggleActions: "play none reverse none",
      // markers: true,
    },
  },
  "b"
);
gsap.from(
  ".footer .list",
  {
    opacity: 0,
    stagger: 0.1,
    duration: 1,
    scrollTrigger: {
      trigger: ".footer .list",
      start: "0% 95%",
      end: "100% 100%",
      toggleActions: "play none reverse none",
      // markers: true,
    },
  },
  "c"
);
gsap.from(
  ".footer address",
  {
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".footer address",
      start: "0% 99%",
      end: "100% 100%",
      toggleActions: "play none reverse none",
      // markers: true,
    },
  },
  "d"
);

// gnb 토글
ScrollTrigger.create({
  trigger: ".sc-next, .footer",
  start: "0% 100%",
  end: "100% 100%",
  // markers: true,
  onEnter: function () {
    $(".gnb").addClass("on");
  },
  onLeaveBack: function () {
    $(".gnb").removeClass("on");
  },
});

// 모바일 gnb 토글
ScrollTrigger.create({
  trigger: ".sc-next, .footer",
  start: "0% 100%",
  end: "100% 100%",
  // markers: true,
  onEnter: function () {
    $(".btn-mb").addClass("active");
  },
  onLeaveBack: function () {
    $(".btn-mb").removeClass("active");
  },
});

// 반복 모션 데이터화

// 텍스트 모션
// 텍스트 잘림 이슈로 인해 변경 > 리펙토링으로 노션에 적기
// $('[data-motion="text"]').each(function (index, item) {
//   gsap.from($(this).find(".word"), {
//     scrollTrigger: {
//       trigger: item,
//       start: "0% 90%",
//       end: "100% 0%",
//       markers: true,
//       toggleActions: "play none none reset",
//     },
//     yPercent: 100,
//     stagger: 0.1,
//     duration: 1,
//   });
// });

const text = new SplitType('[data-motion="text"]', {
  types: "line, words, chars",
});

$('[data-motion="text"]').each(function (index, item) {
  const textTl = gsap.timeline();

  textTl.from(
    $(this).find(".line"),
    { clipPath: "inset(-1em 0 -0.15em)" },
    "a"
  );
  textTl.from(
    $(this).find(".word"),
    { yPercent: 100, stagger: 0.02, duration: 1 },
    "a"
  );

  // ScrollTrigger.create({
  //   animation: textTl,
  //   trigger: item,
  //   start: "0% 90%",
  //   end: "100% 0%",
  //   // markers: true,
  //   ease: "none",
  //   toggleActions: toggleAction,
  // });

  const scrollTriggerOptions = {
    animation: textTl,
    trigger: item,
    start: "0% 90%",
    end: "100% 0%",
    // markers: true,
    ease: "none",
    toggleActions: toggleAction,
  };

  ScrollTrigger.create(scrollTriggerOptions);
});

// 링크이동 arrow
$('[data-motion="arrow"]').each(function (index, item) {
  const arrowTl = gsap.timeline();
  arrowTl.from($(this).find(".ico-arrow"), { scale: 0, duration: 1 });

  const scrollTriggerOptions = {
    animation: arrowTl,
    trigger: item,
    start: "0% 90%",
    end: "100% 0%",
    // markers: true,
    ease: "none",
    toggleActions: toggleAction,
  };

  ScrollTrigger.create(scrollTriggerOptions);
});

// 라인, 텍스트 모션
$('[data-motion="lineBox"]').each(function (index, item) {
  const lineTl = gsap.timeline();

  // 라인박스화 하여 작업했는데 콘솔에 not found  오류로 인해 조건문 추가 하여 리펙토링함
  let lineBottom = $(this).find(".line-bottom");
  let lineTop = $(this).find(".line-top");
  let smallTit = $(this).find(".small-tit");

  if (lineBottom.length > 0) {
    lineTl.fromTo(
      lineBottom,
      { clipPath: "inset(100% -0.6em 0)" },
      {
        clipPath: "inset(0% -0.6em 0)",
        duration: 1,
      },
      "a"
    );
  }

  if (lineTop.length > 0) {
    lineTl.fromTo(
      lineTop,
      { clipPath: "inset(0 -0.6em 100%)" },
      {
        clipPath: "inset(0 -0.6em 0%)",
        duration: 1,
      },
      "a"
    );
  }

  if (smallTit.length > 0) {
    lineTl.from(
      smallTit,
      {
        opacity: 0,
        duration: 1,
      },
      "b"
    );
  }

  const scrollTriggerOptions = {
    animation: lineTl,
    trigger: item,
    start: "0% 90%",
    end: "100% 0%",
    // markers: true,
    ease: "none",
    toggleActions: toggleAction
  };

  ScrollTrigger.create(scrollTriggerOptions);

});

//이미지 스케일
$("[data-motion=scale]").each(function (index, item) {
  const imgTl = gsap.timeline();
  imgTl.fromTo($(this).find("img"), { scale: 1.2 }, { scale: 1, duration: 1 });

  const scrollTriggerOptions = {
    animation: imgTl,
    trigger: item,
    start: "0% 90%",
    end: "100% 0%",
    // markers: true,
    ease: "none",
    toggleActions: toggleAction,
  };

  ScrollTrigger.create(scrollTriggerOptions);

});

// 라인 반대
$("[data-motion=lineOpp]").each(function (index, item) {
  const oppTl = gsap.timeline();
  oppTl.fromTo(
    $(this),
    { clipPath: "inset(100% -0.6em 0)" },
    {
      clipPath: "inset(0% -0.6em 0)",
      duration: 1,
    }
  );

  const scrollTriggerOptions = {
    animation: oppTl,
    trigger: item,
    start: "0% 90%",
    end: "100% 0%",
    // markers: true,
    ease: "none",
    toggleActions: toggleAction,
  };

  ScrollTrigger.create(scrollTriggerOptions);

});

// 모바일 gnb 클릭 이벤트
$(".btn-mb").click(function () {
  $(".gnb").addClass("active");
  $(this).addClass("on");
});
$(".header .gnb .btn-close").click(function () {
  $(".gnb").removeClass("active");
  $(".btn-mb").removeClass("on");
});

// 비디오 클릭 이벤트
$(".sc-masters .video-posi .btn-open").click(function () {
  let scroll = $(".sc-masters .video-posi").offset().top - 110;
  window.scrollTo({ top: scroll, behavior: "smooth" });
  setTimeout(() => {
    $(".sc-masters").addClass("on");
  }, 300);
  $(".header .gnb").hide();
  $(".sc-masters").on("scroll touchmove mousewheel", function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  });
});

$(".sc-masters .video-posi .btn-close").click(function () {
  $(".sc-masters").removeClass("on");
  $(".header .gnb").show();
  $(".sc-masters").off("scroll touchmove mousewheel");
});

// 마우스 커서
$(".sc-next").on("mousemove", function (e) {
  $(".sc-next .cursor").css({
    top: e.clientY,
    left: e.clientX,
  });
  gsap.set(".sc-next .cursor", { scale: 1, opacity: 1 });
});
$(".sc-next").on("mouseleave", function () {
  gsap.to(".sc-next .cursor", { scale: 0, opacity: 0 });
});
