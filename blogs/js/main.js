function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
blogview=document.getElementById("blogview");
if (getQueryString("domain")!=null) blogview.setAttribute("src","https://"+getQueryString("domain"));
if (getQueryString("web")!=null) blogview.setAttribute("src",""+getQueryString("web"));
if (getQueryString("article")!=null) blogview.setAttribute("src","https://mogmoug.github.io/blogs/article/"+getQueryString("article"));