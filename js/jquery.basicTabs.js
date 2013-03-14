/*
** jQuery Basic Tabs
** @author Jon Lunsford || jon@capturethecastle.net
*/

;(function($, window, document, undefined) {

  var pluginName = 'basicTabs',
      defaults = {
        customActiveClass: 'active',                  // Class that is given to a tab when it's active
        tabsParentSelector: '.nav-tabs',              // Class / selector of parent ul wrapping tab list items 
        tabSelector: '.nav-tabs li',                  // Class / selector of tab li items
        tabsContentSelector: '.tab-pane',             // Class / selector of tab content
        defaultTab: 0,                                // Default tab to show, based on a zero index
        verticalTabs: false                           // Boolean if tabs should render vertically
      };

  function Plugin(element, options) {
    this.element = $(element);                        // The element basicTabs was called on
    this.options = $.extend({}, defaults, options);   // Defaults overridden by options passed in by user
    this._defaults = defaults;                        // Access to original defaults before user options
    this._name = pluginName;                          // The plugin name "basicTabs"
    this.init();                                      // Calling Plugin.init()
  };

  Plugin.prototype = {

    init: function() {
      this.showTab(this.options.defaultTab);          // Initially show the first tab
      this.checkVerticalAllign();                     // If verticalTabs is true add "tabs-left" class to tabbable element
      this.attachNavHandlers();                       // Attach click handlers to tabs but NOT any links in a dropdown menu
      this.element.addClass("basic-tabs");
    },

    // Show tab based on index (0 based) passed in
    showTab: function(index) {
      $(this.findElement(this.options.tabsContentSelector)).hide();
      $(this.findElement(this.options.tabsContentSelector)[index]).show();
      $(this.findElement(this.options.tabSelector)[index]).addClass(this.options.customActiveClass);
    },

    // Attach click handers to tab links
    attachNavHandlers: function() {
      var _this = this,
          $tabLinks = this.findElement(this.options.tabsParentSelector).children(this.options.tabSelector).find('a');
      
      $tabLinks.click(function() {
        $(this).parents(_this.options.tabsParentSelector).children('.' + _this.options.customActiveClass).removeClass(_this.options.customActiveClass);
        _this.showTab($(this).parents(_this.options.tabSelector).index());
      });
    },

    // If verticalTabs is true add the "tabs-left" class to this.element.
    checkVerticalAllign: function() {
      if(this.options.verticalTabs) {
        this.element.addClass("tabs-left");
      }
    },

    // Helper to find elements within current context
    findElement: function(element) {
      return this.element.find(element);
    }
  };

  // preventing against multiple instantiations
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  };

})(jQuery, window, document);

