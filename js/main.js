$(function() {
  
  $('.vertical-tabs').basicTabs({
    tabsParentSelector: '.nav-tabs',
    tabSelector: '.nav-tabs li',
    tabsContentSelector: '.tab-pane',
    verticalTabs: true
  });

  $('.horizontal-tabs').basicTabs({
    tabsParentSelector: '.nav-tabs',
    tabSelector: '.nav-tabs li',
    tabsContentSelector: '.tab-pane'
  });

}); // end doc.ready