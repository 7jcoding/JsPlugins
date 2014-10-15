/**
 * @author lin
 */
// 分页代码          ------------------------------------------------------------------
function ShowPageNum(total, pageSize, currentPage, url, functionName, isdetialed, pText, nText) {
    currentPage = Number(currentPage);
    var PageNum = Math.ceil(total / pageSize);
    if (PageNum < 2) { return ""; }
    if (currentPage > PageNum) { currentPage = PageNum; }
    var pageCode = "";
    var EPPNC = 7;
    var MID = 3;
    if (PageNum <= EPPNC) {
        for (var i = 1; i <= PageNum; i++) {
            if (i == currentPage) {
                pageCode += String.Format("<font>{0}</font>", i);
            }
            else {
                pageCode += String.Format("<a href = \"{0}\">{1}</a>", GetLink(url, i, functionName), i);
            }
        }
    }
    else {
        // Set Start PageNum
        var startPageNum = Number(currentPage) - MID;
        if (currentPage < MID + 1) {
            startPageNum = 1;
        }
        else if (currentPage > PageNum - MID) {
            startPageNum = PageNum - EPPNC + 1;
        }

        // Previous and First Page
        if (currentPage != 1) { pageCode += String.Format("<a href = \"{0}\">{1}</a>", GetLink(url, currentPage - 1, functionName), pText); }
        if (isdetialed) {
            if (startPageNum > 1) { pageCode += String.Format("<a href = \"{0}\">1</a>", GetLink(url, 1, functionName)); }
            if (startPageNum > 2) { pageCode += "<font class = 'dot'>...</font>"; }
        }

        // Normal
        for (var i = startPageNum; i <= startPageNum + EPPNC - 1; i++) {
            if (i == currentPage) {
                pageCode += String.Format("<font>{0}</font>", i);
            }
            else {
                pageCode += String.Format("<a href = \"{0}\">{1}</a>", GetLink(url, i, functionName), i);
            }
        }

        // Next and Last Page
        if (isdetialed) {
            if (currentPage < PageNum - MID) {
                if (currentPage < PageNum - 2) { pageCode += "<font class = 'dot'>...</font>"; }
                if (currentPage < PageNum - 1) { pageCode += String.Format("<a href = \"{0}\">{1}</a>", GetLink(url, PageNum, functionName), PageNum); }
            }
        }
        if (currentPage != PageNum) { pageCode += String.Format("<a href = \"{0}\">{1}</a>", GetLink(url, Number(currentPage) + 1, functionName), nText); }
        pageCode += String.Format("<input type = 'input' id = 'jumptopage' style = 'padding:3px;width:50px;' /><a href = \"javascript:JumpToPage('{0}','{1}')\">跳转</a>", url, functionName);
    }
    return pageCode;
}
function GetLink(url, pageIndex, functionName) {
    return functionName == "" ? url + pageIndex : String.Format("javascript:{0}('{1}')", functionName, url + pageIndex);
}
function JumpToPage(url, functionName) {
    var pageNum = $.trim($("#jumptopage").attr("value"));
    if (!/^[1-9]?[0-9]+$/.test(pageNum)) {
        alert("请输入数字");
        return;
    }
    eval( String.Format("{0}({1})", functionName, url + pageNum));
}

// 替换函数         ------------------------------------------------------------------
String.Format = function () {
    if (arguments.length == 0) { return null; }
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
}