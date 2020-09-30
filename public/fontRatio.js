; (function ()
{
    //字体比例----------------
    var fontRatio = 18.75
		, windowWidth
		, rootFontSize
    ;
    function modifyRootFontSize() {
        var windowWidth=document.documentElement.clientWidth> 480 ? 480: document.documentElement.clientWidth;
        rootFontSize = windowWidth / 18.75;
        document.getElementsByTagName('html')[0].style.cssText = 'font-size:' + rootFontSize + 'px';
    }
    modifyRootFontSize();
    window.onresize = function () {
        modifyRootFontSize();
    }
})();