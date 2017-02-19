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

function updateSites() {
	sites = getLocalStorage();	
}

document.addEventListener('DOMContentLoaded', function () {
	if (!Notification) {
		alert('Desktop notifications not available in your browser. Try Chromium.'); 
		return;
	}

	if (Notification.permission !== "granted")
		Notification.requestPermission();
});

var totalTimer = 0;

var notificaitonCount = 0;
function setTime(){
	updateSites();
	++totalTimer;
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){	
		for( var i = 0; i < sites.length; i++) {
			if(tabs[0].url.toString().indexOf(sites[i].url) != -1) {
				++sites[i].timeout;
				myNewUrl = "timeout.html";
				if(sites[i].timeout > sites[i].maxTimeout) {	
					if(sites[i].severity === "Severe") {
						chrome.tabs.update(tabs[0].id, {url: myNewUrl});
					}
					else if(sites[i].severity === "Moderate") {
						if (Notification.permission !== "granted")
							Notification.requestPermission();
						else if(notificaitonCount == 0){
							var notificationTitle = "You are spending too much time on " + sites[i].url + "s";
							var notificationText = "You have spent " + sites[i].timeout;
							var notification = new Notification(notificationTitle, {
								icon: '/icon.png',
								body: notificationText
							});

							notification.onclick = function () {
								window.open("/dashboard.html");      
							};
							++notificaitonCount;
						}
					}
				}
				setLocalStorage(sites);
			}
		}
	});
	localStorage.setItem("totalTimer",totalTimer);
}