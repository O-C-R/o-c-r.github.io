$('.slides').slick({
	dots: true,
	slidesToShow: 1
});

var greetings = ['Greetings', 'Good morning', 'Good afternoon', 'Good evening', 'Good night'];
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

var date = new Date(),
    greetingIndex = 0,
    hour = date.getHours(),
    weekday = date.getDay(),
    dateNum = date.getDate(),
    month = "January,February,March,April,May,June,July,August,September,October,November,December".split(",")[date.getMonth()],
    year = date.getFullYear();


if(hour>=4 && hour<12) {
  greetingIndex = 1;
} 
else if(hour>=12 && hour<18) {
  greetingIndex = 2;
}
else if(hour>=18 && hour<=23) {
  greetingIndex = 3;
}

function nth(d) {
  if(d > 3 && d < 21) return 'th';
  switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
} 

$('.greeting').text(greetings[greetingIndex]);

$('.weekday').text(days[weekday]);
$('.date-ordinal').text(dateNum+nth(dateNum));
$('.month').text(month);
$('.year').text(year);

var $side = $('.contact-info.item:first');
console.log($side);
var previousScroll = 0;
var isScrolling = false;
var isActive = false;
var doHighlight = true;

/*
var words = ["exploring","breaking down", "explaining", "visualizing", "publishing", "performing", "mapping",
       "investigating", "empowering", "giving voice", "mapping", "staging", "augmenting", "showing",
       "remixing", "examining", "imagining","projecting","analyzing","designing"];
//var colors = ['#793AB1', '#C737AF', '#FF6752', '#FFDD45', '#A7F34D', '#36F669', '#04B4D5'];
var colors = ['rgba(121,58,177,1)', 'rgba(199, 55, 175,1)', 'rgba(255, 103, 82, 1)', 'rgba(255, 221, 69, 1)', 'rgba(167, 243,77,1)', 'rgba(54, 246, 105, 1)', 'rgba(4,180, 213, 1)'];
var colorsOff = ['rgba(121,58,177,0)', 'rgba(199, 55, 175,0)', 'rgba(255, 103, 82, 0)', 'rgba(255, 221, 69, 0)', 'rgba(167, 243,77,0)', 'rgba(54, 246, 105, 0)', 'rgba(4,180, 213, 0)'];

for (var i = 0; i < words.length; i++) {
  $('.posts-home .post').each(function () {
    this.outerHTML = this.outerHTML.split(words[i]).join('<span class="gerund">' + words[i] + '</span>');
    $(this).on('mouseover', function() {
      $(this).css("background-color", '#ccc');
      $(this).css("color", "#FFFFFF");
    });
  });
}
*/

$(window).resize(function() {
  if($(window).width() > 1280) {
    $side.css("position","fixed");
    $side.css("padding-top", "318px");
  } else {
    $side.css("padding-top", "10px");
    $side.css("position","relative");
  }
});
    
$(window).scroll(function () {
  isScrolling = true;
  var currentScroll = $(this).scrollTop();
  var i = 0;

  /*
  $('.gerund').each(function (index) {
    var pos = $(this).position();
    var p = (currentScroll - pos.top);
    var gerund = $(this);
    //console.log("P IS: " + p);
    if (p >= -300) {
      //active class is added as condition of animating
      //dequeue().stop() is secret sauce to get animation to only fire once
      if(!$(this).hasClass(".active")) {
        $(this).dequeue().stop().animate({ color: "#fff", backgroundColor: colors[i % colors.length]}, 500, function() {
          $(this).addClass(".active").dequeue();
        });
      }
    } else {
      //console.log("is Not Scrolling");
      //$('a:hover .gerund').eq(index).css("color", "#fff");
    }

    if(p > -60 || p < -(window.innerHeight - 100)) {
      
      //$('a:hover .gerund').eq(index).css("color", "#fff");

      $(this).animate({ color: "#000", backgroundColor: colorsOff[i % colorsOff.length]}, 500, function() {
          $(this).removeClass(".active").dequeue();
        });
    }   
    i++;
  });
  */

  if($(window).width() > 1280 && $side!=undefined) {
    
    var window_offset = $side.offset().top + $(window).scrollTop();
    //console.log(window_offset);

    if (currentScroll > previousScroll){

     if( window_offset >= 165) {
        // console.log('down');
        // console.log($side);
        $side.css("position","fixed");
        $side.css("padding-top", "148px");
      }
    }
    else {
      if( window_offset <= 330 ) {
        // console.log('up');
        // console.log($side);
        $side.css("position","relative");
        $side.css("padding-top", "318px");        
      }
    }
    previousScroll = currentScroll;
  } else {
    $side.css("padding-top", "10px");
    $side.css("position","relative");
  }
  
  clearTimeout( $.data( this, "scrollCheck" ) );
    $.data( this, "scrollCheck", setTimeout(function() {
      isScrolling = false;
      //console.log( "isScrolling is: " + isScrolling );
    }, 250) );
    //console.log( "isScrolling is: " + isScrolling );
});