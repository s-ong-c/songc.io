String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};


var getIdentifier = function(staticIdentifier, date, title) {
    if( staticIdentifier != null ) {
        if( staticIdentifier instanceof String && staticIdentifier.trim() != '' ){
            return staticIdentifier;
        }
    }

    var partOfTitle = (title + '12345678901234567890').substring(0,20);
    var result = ''.concat(date).concat(partOfTitle.hashCode());
    return result;
};


jQuery.fn.center = function () {
    this.css("position","relative");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");

    return this;
}


$(function(){

    $("input.search").keydown(function(key) {
      if(key.keyCode == '13') { // Enter key
        window.open('https://www.google.com/search?q=inurl%3Adveamer.github.io ' + $(this).val(), '_blank');
      }
    });
});


