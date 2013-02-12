$(function() {
  
  $('.tabbable').basicTabs({
    customActiveClass: 'active',
    tabsParentSelector: '.nav-tabs',
    tabSelector: '.nav-tabs li',
    tabsContentSelector: '.tab-pane',
    verticalTabs: true
  });

}); // end doc.ready