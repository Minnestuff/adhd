$(document).ready(function(){
	var quotes = [
	{
		"quote" : "Clocks slay time... time is dead as long as it is being clicked off by little wheels; only when the clock stops does time come to life.",
		"author" : "- William Faulkner, The Sound and the Fury"
	},
	{
		"quote" : "Your time is way too valuable to be wasting on people that can't accept who you are.",
		"author" : "- Turcois Ominek"
	},
	{
		"quote" : "The proper function of man is to live, not to exist. I shall not waste my days in trying to prolong them. I shall use my time.",
		"author" : "- Jack London"
	},
	{
		"quote" : "Your hand can seize today, but not tomorrow; and thoughts of your tomorrow are nothing but desire. Don’t waste this breath, if your heart isn’t crazy, since 'the rest of your life' won’t last forever.",
		"author" : "― Omar Khayyám, Quatrains - Ballades"
	},
	{
		"quote" : "It is named the 'Web' for good reason.",
		"author" : "― David Foster Wallace"
	},
	{
		"quote" : "He did not waste time in a vain search for a place in history.",
		"author" : "― Dejan Stojanovic, The Sun Watches the Sun"
	}
	];
	var randomVal = Math.floor(Math.random() * (quotes.length - 1));
	$("blockquote").html(quotes[randomVal].quote); 
	$("blockquote").append("<footer>" + quotes[randomVal].author + "</footer>");
});