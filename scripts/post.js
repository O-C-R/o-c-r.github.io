$('.slides').slick({
	dots: true,
	slidesToShow: 1
});

var greetings = ['Greetings', 'Good morning', 'Good afternoon', 'Good evening', 'Good night'];

var date = new Date(),
    greetingIndex = 0,
    hour = date.getHours();

if(hour>=4 && hour<12) {
  greetingIndex = 1;
} 
else if(hour>=12 && hour<18) {
  greetingIndex = 2;
}
else if(hour>=18 && hour<=23) {
  greetingIndex = 3;
}

$('.greeting').text(greetings[greetingIndex]);

