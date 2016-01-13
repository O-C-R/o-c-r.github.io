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
