var totalSeconds = 0;
var secondsLabel = 0;
var minutesLabel = 0;
setInterval(setTime, 1000);

function getLocalStorage() {
	return JSON.parse(localStorage.getItem("sites"));
}

function setLocalStorage(data) {
	localStorage.setItem("sites",JSON.stringify(data));
}

var sites = Array();

setTimeout(updateSites,500);

function updateSites() {
	sites = getLocalStorage();	
}

function setTime(){
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){	
		for( var i = 0; i < sites.length; i++) {
			if(tabs[0].url.toString().indexOf(sites[i].url) != -1) {
				++sites[i].timeout;
				myNewUrl = "timeout.html";
				if(sites[i].timeout > 10) {
					chrome.tabs.update(tabs[0].id, {url: myNewUrl});
				}
				setLocalStorage(sites);
			}
		}
	});
}
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	console.log(tab.url);
});