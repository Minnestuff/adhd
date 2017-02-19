 function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);
  });
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function getLocalStorage(){
  return JSON.parse(localStorage.getItem("sites"));
}
var totalSeconds = 0;

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    renderStatus('You have opened '+ url);
    var secondsLabel = 0;
    var minutesLabel = 0;
    setInterval(setTime, 1000);

    function setTime(){
      var sites = new Array();
      sites = getLocalStorage();
      for(var i = 0; i < sites.length; i++) {
        if(url.toString().indexOf(sites[i].url.toString()) != -1){
          var message = "You have been using this site for " + sites[i].timeout + " seconds";
          renderStatus(message);
        }
        else {
          renderStatus("Please enable tracking for this site on your home page");
        }
      }
    }

  });
});