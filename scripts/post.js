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
var previousScroll = 0;
var isScrolling = false;
var isActive = false;

var words = ["exploring","breaking down", "explaining", "visualizing", "publishing", "performing", "mapping",
       "investigating", "empowering", "giving voice", "mapping", "staging", "augmenting", "showing",
       "remixing", "examining", "imagining","projecting","analyzing","designing"];
var colors = ['#793AB1', '#C737AF', '#FF6752', '#FFDD45', '#A7F34D', '#36F669', '#04B4D5'];

for (var i = 0; i < words.length; i++) {
  $('.posts-home .post').each(function () {
    this.outerHTML = this.outerHTML.split(words[i]).join('<span class="gerund">' + words[i] + '</span>');
    $(this).on('mouseover', function() {
      $(this).css("background-color", '#ccc');
      $(this).css("color", "#FFFFFF");
    });
  });
}

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

  $('.gerund').each(function (index) {
    var pos = $(this).position();
    var p = (currentScroll - pos.top);
    console.log("P IS: " + p);
    //$(this).stop( true, true );
    if (p >= -300) {
      //console.log("p is greater than -300: " + p);
      
      //todo
      //css animation to have color turn to red, then back to black on scroll
      //don't use colors array
      //$(this).css("background-color", colors[i % colors.length]);
      //$(this).css("opacity", "0.5");
      //$(this).css("color", colors[i % colors.length]);
      if(!$(this).hasClass(".active")) {
        $(this).dequeue().stop().animate({backgroundColor: 'rgb(0, 0, 0, 0.15)', color: '#A2230F'}, 800, function() {
          $(this).animate({backgroundColor: 'rgb(0, 0, 0, 0.0)', color: '#333'}, 600, function() {
            $(this).animate({backgroundColor: 'rgb(0, 0, 0, 0.15)', color: '#A2230F'}, 400, function() {
              $(this).animate({backgroundColor: 'rgb(0, 0, 0, 0.0)', color: '#333'}, 800, function() {
                $(this).css("background-color", "transparent");
                console.log($('a:hover .gerund').eq(index));
                $('a:hover .gerund').eq(index).css("color", "#fff");
                $(this).removeClass(".active").dequeue();
                console.log(index + " was active and is now inactive");
              });
            });
          });
        });
        //console.log(index + " is active");
      } else {
        $('a:hover .gerund').eq(index).css("color", "#fff");
        //console.log(index + " was not active and now is active");
        $(this).addClass(".active");
        //console.log("starting to animate");
      }

    } else {
      //console.log("is Not Scrolling");
      $('a:hover .gerund').eq(index).css("color", "#fff");
    }

    if(p > -60 || p < -(window.innerHeight - 100)) {

      $(this).css("background-color", "transparent");
      //$(this).css("color", "#000000");
      $('a:hover .gerund').eq(index).css("color", "#fff");
      $(this).removeClass(".active").dequeue();
    }   
    i++;
  });

  if($(window).width() > 1280) {
    
    var window_offset = $side.offset().top + $(window).scrollTop();
    console.log(window_offset);

    if (currentScroll > previousScroll){

     if( window_offset >= 165 ) {
        console.log('down');
        console.log($side);
        $side.css("position","fixed");
        $side.css("padding-top", "148px");
      }
    }
    else {
      if( window_offset <= 330 ) {
        console.log('up');
        console.log($side);
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
      console.log( "isScrolling is: " + isScrolling );
    }, 250) );
    console.log( "isScrolling is: " + isScrolling );
});