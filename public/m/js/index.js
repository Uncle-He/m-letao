$(function () {
  // 区域滚动
  mui('.mui-scroll-wrapper').scroll({
    indicators:false // 滚动条
  });
  // 轮播图
  mui('.mui-slider').slider({
    interval: 2000 // 自动轮播周期，若为0则不自动播放，默认为0
  });
});