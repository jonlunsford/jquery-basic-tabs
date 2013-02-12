$(function() {
  
  $('.tabbable').basicTabs({
    customActiveClass: 'active',
    tabsParentSelector: '.nav-tabs',
    tabSelector: '.nav-tabs li',
    tabsContentSelector: '.tab-pane'
  });

}); // end doc.ready