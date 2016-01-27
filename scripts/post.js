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
  if($(window).width() > 1280) {
    var currentScroll = $(this).scrollTop();
    var window_offset = $side.offset().top + $(window).scrollTop();
    console.log(window_offset);
    if (currentScroll > previousScroll){
       console.log('down');

       if( window_offset >= 165 ) {
          $side.css("position","fixed");
          $side.css("padding-top", "148px");
       }
    }
    else {
      console.log('up');
        if( window_offset <= 330 ) {
          $side.css("position","relative");
          $side.css("padding-top", "318px");        
        }
    }
    previousScroll = currentScroll;
  } else {
    $side.css("padding-top", "10px");
    $side.css("position","relative");
  }
});

// $( window ).scroll(function() {
//   var window_offset = $side.offset().top + $(window).scrollTop();
//   console.log(window_offset);
//   //$side.css("padding-top": "320px");
//   //console.log(p.offset().top + p.height());
//   if(window_offset >= 165 ) {
//     $side.css("position","fixed");
//     $side.css("padding-top", "150px");
//   } else {
//     $side.css("position","relative");
//     $side.css("padding-top", "320px");
//   }

//   if (window_offset <= 330 ) {
//     $side.css("position","relative");
//     $side.css("padding-top", "320px");
//   }
// });
