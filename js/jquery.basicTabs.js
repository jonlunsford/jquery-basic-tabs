/*!
** jQuery Basic Tabs
** Original author: Jon Lunsford - jonathon.lunsford@mindbodyonline.com
** Further changes, comments:
*/

/* Example markup structure:
---------------------------------------------------------  
 
 <div class="tabbable">
   <ul class="nav-tabs">
     <li>
       <a href="#" title="Tab Name">Tab Name</a>
     </li>
     <li>
       <a href="#" title="Tab Name">Tab Name</a>
     </li>
   </ul> <-- .nav-tabs
   
   <div class="tab-content">
     <div class="tab-pane">
       Tab pane content
     </div>    
     <div class="tab-pane">
       Tab pane content
     </div>    
   </div> <-- .tab-content    
 </div> <-- .tabbable 

/* Example implementation:
---------------------------------------------------------  
  
  $(function() {
    $('.tabbable').basicTabs(options);
  });
  
  Also see Scripts/security_info.js AND Views/SecurityInfo/Index.cshtml for example Implementation
-------------------------------------------------------*/

;(function($, window, document, undefined) {

  var pluginName = 'basicTabs',
      defaults = {
        customActiveClass: 'active',                  // Class that is given to a tab when it's active
        tabsParentSelector: '.nav-tabs',              // Class / selector of parent ul wrapping tab list items 
        tabSelector: '.tab',                          // Class / selector of tab li items
        tabsContentSelector: '.tab-pane',             // Class / selector of tab content
        tabActionsSelector: '.tab-actions',           // Class / selector of tab that conatains dropdown menu
        dropdownSelector: '.dropdown-menu',           // Class / selector of action dropdown menu to show 
        dropdownTrigger: '.arrow',                    // Class / selector of dropdown menu trigger
        dropdownVisible: false,                       // Boolean if dropdown menu is initially visible
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
      this.showTab(0);                                // Initially show the first tab
      this.showTabActions();                          // Attach tab actions dropdown handlers if neccessary
      this.appendClearfix();                          // Append clearfix after tabsParentSelector if verticalTabs is false
      this.checkVerticalAllign();                     // If verticalTabs is true add "tabs-left" class to tabbable element
      this.attachNavHandlers();                       // Attach click handlers to tabs but NOT any links in a dropdown menu
      this.attachDropdownhandlers();                  // Attach dropdown handlers if neccessary
    },

    // Show tab bases on index (0 based) passed in
    showTab: function(index) {
      $(this.findElement(this.options.tabsContentSelector)).hide();
      $(this.findElement(this.options.tabsContentSelector)[index]).show();
      $(this.findElement(this.options.tabSelector)[index]).addClass(this.options.customActiveClass);
    },

    // Attach click handers to tab links
    attachNavHandlers: function() {
      var _this = this,
          $tabLinks = this.findElement(this.options.tabsParentSelector).children(this.options.tabSelector).find('a').not(this.options.tabActionsSelector + ' a, ' + this.options.dropdownSelector +' a');
      
      $tabLinks.click(function() {
        $(this).parents(_this.options.tabsParentSelector).children('.' + _this.options.customActiveClass).removeClass(_this.options.customActiveClass);
        _this.showTab($(this).parents(_this.options.tabSelector).index());
      });
    },

    // If dropdown markup exists attach neccessary click handlers
    attachDropdownhandlers: function() {
      var _this = this,
          $dropdownTrigger = this.findElement(this.options.dropdownTrigger);

      $dropdownTrigger.click(function() {
        if(!_this.options.dropdownVisible) {
          _this.dropdownVisible = true;
          $(this).parents(_this.options.tabSelector).find(_this.options.dropdownSelector).show();
        } else {
          _this.dropdownVisible = false;
          $(this).parents(_this.options.tabSelector).find(_this.options.dropdownSelector).hide();
        }
      });

      // TODO allow this to be different from just "down" and make this more efficient
      // Attach click handlers to close dropdown menu if anything but the menu has been click
      $('body').click(function(e) {
        if(!e.target.className.match(/down/g)) {
          _this.dropdownVisible = false;
          _this.findElement(_this.options.dropdownSelector).hide();
        }
      });
    },

    // Show / hide dropdown menu if markup exists
    showTabActions: function() {
      var _this = this,
          $tabActions = this.findElement(this.options.tabActionsSelector),
          $tabParent = this.findElement(this.options.tabsParentSelector);

      if($tabActions.length) {
        $tabParent.hover(function() {
          $tabActions.show();
        }, function() {
          $tabActions.hide();
        }); 
      };
    },

    // Unless verticalTabs is true append a clearfix after the tab links. 
    // This allows proper clearing even when a dropdown menu is present.
    appendClearfix: function() {
      if(!this.options.verticalTabs) {
        $(this.options.tabsParentSelector).after('<div class="clearfix"></div>');
      } 
    },

    // If verticalTabs is trud add the "tabs-left" class to this.element.
    // Necessarry styles are added from Styles/plugins/basicTabs.less
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

