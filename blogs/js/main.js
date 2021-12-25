function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
blogview=document.getElementById("blogview");
blogview.setAttribute("src","https://mogmoug.github.io/blogs/article/"+getQueryString("id"));
blogview.setAttribute("src",""+getQueryString("url"));