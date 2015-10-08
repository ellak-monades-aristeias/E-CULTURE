window.KitchenSink = window.KitchenSink || {};

$(function() {
    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    // DevExpress.devices.current({ platform: "generic" });
    document.addEventListener("deviceready", onDeviceReady, false);
    KitchenSink.app = new DevExpress.framework.html.HtmlApplication({
        namespace: KitchenSink,
		disableViewCache: true,
        commandMapping: KitchenSink.config.commandMapping,
        layoutSet: DevExpress.framework.html.layoutSets[KitchenSink.config.layoutSet],
        navigation: getNavigationItems()
    });
    KitchenSink.app.router.register(":view/:id", { view: "Category", id: undefined });
    if(DevExpress.devices.real().platform === "win8") {
        $("body").css("background-color", "#000");
    }

    function showMenu(e) {
        KitchenSink.app.viewShown.remove(showMenu);
		if (e.viewInfo.viewName !== "Home" && $(".nav-button")!=null)
           $(".nav-button").hide();
        if (e.viewInfo.viewName !== "Home")
            return;
        setTimeout(function() {
            $(".nav-button").trigger("dxclick");
        }, 1000);
    }
    
    function getNavigationItems() {
        if(DevExpress.devices.current().platform === "win8") {
            KitchenSink.config.navigation.push({
                "title": "Panorama",
                "action": "#Panorama",
                "icon": "panorama"
            },
            {
                "title": "Pivot",
                "action": "#Pivot",
                "icon": "pivot"
            });
        }



        return KitchenSink.config.navigation;
    }

    function exitApp() {
        switch(DevExpress.devices.current().platform) {
            case "tizen":
                tizen.application.getCurrentApplication().exit();
                break;
            case "android":
                navigator.app.exitApp();
                break;
            case "win8":
                window.external.Notify("DevExpress.ExitApp");
                break;
        }
    }

    function onDeviceReady() {
        document.addEventListener("backbutton", onBackButton1STTap, false);
        KitchenSink.app.on("navigatingBack",function() {
            if(!KitchenSink.app.canBack()) {
                exitApp();
            }
        });
    }

    function onBackButton1STTap() {
                        var myDialog = DevExpress.ui.dialog.custom({
                            title: "",
                            message: "Press Back Again to Exit",
                            buttons: []
                        });
                        
                        myDialog.show();
                        $('.dx-popup-title').remove();
                         $('.dx-dialog-buttons').remove();
                         
                         $('.dx-dialog-message').attr('style','vertical-align:middle;text-align:center;padding-top:2px;padding-bottom:2px');
                        document.removeEventListener("backbutton", onBackButton1STTap);
                        document.addEventListener("backbutton", onBackButton2NDTap,false);
                        setTimeout(
                            function () { 
                                document.removeEventListener("backbutton", onBackButton2NDTap,false);
                                document.addEventListener("backbutton", onBackButton1STTap);
                                myDialog.hide(); 
                            }, 
                        2000);
                
    }
    function onBackButton2NDTap() {
         navigator.app.exitApp();
    }
    KitchenSink.app.viewShown.add(showMenu);
    //KitchenSink.app.on("viewShown",showMenu);
    //KitchenSink.app..;
});
