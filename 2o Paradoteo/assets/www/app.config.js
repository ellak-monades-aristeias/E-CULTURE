window.KitchenSink = $.extend(true, window.KitchenSink, {
  "config": {
    "layoutSet": "slideout",
    "commandMapping": {
      "ios-header-toolbar": {
        "commands": [
          {
            "id": "menu-add",
            "location": "menu"
          },
          {
            "id": "menu-edit",
            "location": "menu"
          },
          {
            "id": "menu-remove",
            "location": "menu"
          }
        ]
      },
      "android-header-toolbar": {
        "commands": [
          {
            "id": "menu-add",
            "location": "menu"
          },
          {
            "id": "menu-edit",
            "location": "menu"
          },
          {
            "id": "menu-remove",
            "location": "menu"
          }
        ]
      },
      "win8-phone-appbar": {
        "commands": [
          {
            "id": "menu-add",
            "location": "menu"
          },
          {
            "id": "menu-edit",
            "location": "menu"
          },
          {
            "id": "menu-remove",
            "location": "menu"
          }
        ]
      },
      "tizen-header-toolbar": {
        "commands": [
          {
            "id": "menu-add",
            "location": "menu"
          },
          {
            "id": "menu-edit",
            "location": "menu"
          },
          {
            "id": "menu-remove",
            "location": "menu"
          }
        ]
      },
      "generic-header-toolbar": {
        "commands": [
          {
            "id": "menu-add",
            "location": "menu"
          },
          {
            "id": "menu-edit",
            "location": "menu"
          },
          {
            "id": "menu-remove",
            "location": "menu"
          }
        ]
      }
    },
    "navigation": [
	  {
	    //"id": "menu-myhome",
        "title": "Home",
        "action": "#Category",
        "icon": "favorites"
      }
     ]
  }
});