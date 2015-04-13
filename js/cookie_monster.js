function Cookie_Monster(){
  var current_date = new Date();
  var day = current_date.getDay().toString();
  var date = current_date.getDate().toString();
  var month = (current_date.getMonth() + 1).toString();
  var year = (current_date.getFullYear()).toString();
  var expiration_year = (year - 1).toString();
  var time = current_date.getTime().toString();
  this.todays_date = current_date;
  this.expiration_date = new Date(month + "/" + date + "/" + expiration_year);
};

Cookie_Monster.prototype = {

  constructor: Cookie_Monster,

  get_cookies:function(){
    var doc_c = document.cookie.split(";");
    var cookies ={};
    for (var i = 0; i<doc_c.length; i++){
      var cookie = doc_c[i];
      var is_there = cookie.indexOf("=");
      var cookie_value = cookie.substring(is_there+1);
      var cookie_name = cookie.substring( 0,is_there);
      cookies[cookie_name] = cookie_value;
    }
    return cookies
  },

  get_cookie:function(name){
    var browser_cookies= document.cookie.split(";");
    for (var i = 0; i<browser_cookies.length; i++){
      var cookie = browser_cookies[i];
      var index = cookie.indexOf("=");
      var cookie_value = cookie.substring(index+1);
      var cookie_name = cookie.substring( 0,index);
      if(cookie_name == name){
        var return_cookies ={};
        return_cookies[cookie_name] = cookie_value;
        return return_cookies 
      }
    }
  },

  set_cookie:function(name, value, exp){
    if(!exp){
      var date = new Date();
      date.setFullYear(date.getFullYear() + 1);
    }
    var expires = exp || date;
    document.cookie =name + '=' + value + ';' + 'expires=' + expires + ';'; 

  },

  delete_cookie:function(name){
    var expires = new Date();
    expires.setFullYear(expires.getFullYear() - 1);
    document.cookie =name + '=;' + 'expires=' + expires + ';'; 
  },

  delete_cookies:function(){ 
    var cookies = this.get_cookies();
    var cm = this;
    console.log(cookies);
    $.each(cookies, function(value, key){
       cm.delete_cookie(value.toString());
    });
  }

}

