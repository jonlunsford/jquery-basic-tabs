# Jquery Basic Tabs

Jquery Basic Tabs is a lightweight plugin that leaves the styling up to you. Basic tabs, that's it.

### Installation
---

#### Write some basic markup

Basic tabs works with a unordered list with an equal number of divs to house your tab content, like this:

```html

<div class="my-tabs">
  <ul class="nav-tabs">
    <li>
      <a href="#" title="Tab Name 1">Tab Name 1</a>
    </li>
    <li>
      <a href="#" title="Tab Name 2">Tab Name 2</a>
    </li>
    <li>
      <a href="#" title="Tab Name 3">Tab Name 3</a>
    </li>
  </ul> 

  <div class="tab-content">
    <div class="tab-pane">
      Tab pane content 1
    </div>    
    <div class="tab-pane">
      Tab pane content 2
    </div>    
    <div class="tab-pane">
      Tab pane content 3
    </div>    
  </div>
</div>

```

If you're not a fan of the classes above, no problem, you can name them anything you want when the plugin is instantiated, more on that later.

#### Include the neccessary files

Simply reference the ```jquery.basicTabs.js``` file after your reference to jquery, or be super awesome and toss the Basic Tabs js into your ```plugins.js``` file. 

There are some basic styles included in ```basicTabs.(css|less)``` to get you started. The goal of this plugin is to give you as little styles as possible to give you complete control over the presentation.

### Usage
---

#### Make it happen

Call Basic Tabs like any other plugin, during instantiation you can tell Basic Tabs to use any class names you like, like this:

```JavaScript
  
$('.vertical-tabs').basicTabs({
  customActiveClass: 'active',            
  tabsParentSelector: '.nav-tabs',              
  tabSelector: '.nav-tabs li',                  
  tabsContentSelector: '.tab-pane',             
  verticalTabs: false                           
});

```

Basic Tabs also supports vertical tabs, simpley pass in ```verticalTabs: true```, like this:

```JavaScript
  
$('.vertical-tabs').basicTabs({           
  verticalTabs: true                           
});

```

#### Available options

Basic Tabs purposly has very few opitons, afterall it's just *basic*. If you would like different classes than the provided, just pass them is as the following options.

| Option                      | Value                                                                                                              |
|:----------------------------|:-------------------------------------------------------------------------------------------------------------------|
| ```customActiveClass```     | *string* Default: "active", class the active tab will be given.                                                    |
| ```tabsParentSelector```    | *string* Default: ".nav-tavs", selector that matches the tabs parent (should be a ```<ul></ul>```)                 |
| ```tabSelector```           | Default: *string* ".nav-tabs li", selector or class that matches the tabs themselves (should be a ```<li></li>```) |
| ```tabsContentSelector```   | *string* Default: ".tab-pane", selector or class that matches the parent of each tab's content                     |
| ```verticalTabs```          | *Bool* Default: false, boolean to determin if tabs should be rendered vertically or not                            | 