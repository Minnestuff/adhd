var totalSeconds = 0;
var secondsLabel = 0;
var minutesLabel = 0;
setInterval(setTime, 1000);

var facebook = new Object();
facebook.url = "facebook.com";
facebook.timeout = 0;

function setTime(){
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){	
		console.log(tabs[0].url.toString().indexOf(facebook.url));
		if(tabs[0].url.toString().indexOf(facebook.url) != -1) {
			++facebook.timeout;
			myNewUrl = "timeout.html";
			if(facebook.timeout > 10) {
				console.log("here");
				chrome.tabs.update(tabs[0].id, {url: myNewUrl});
			}
		}
	});
}
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	console.log(tab.url);
});