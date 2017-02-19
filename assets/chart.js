$(function() {
	var severity;	
	$('.dropdown-toggle').on('click',function(e){
		e.preventDefault();
	});
	$('.dropdown-menu>li>a').on('click',function(e){
		e.preventDefault();
		severity = $(this).html();
		$('.btn-group>.dropdown-toggle').html(severity + "&nbsp;<span class='caret'></span>");
	});
	function updatePieChart(){
		var totalTime = localStorage.getItem("totalTimer");
		var sites = JSON.parse(localStorage.getItem("sites"));
		var points = 0;
		var totalWastedTime = 0;
		var totalMaxTimeout = 0;
		if(sites != null) {
			for(var i = 0; i < sites.length; i++){
				totalWastedTime += sites[i].timeout;
				totalMaxTimeout += parseInt(sites[i].maxTimeout);
			}
			points = points - (totalWastedTime - totalMaxTimeout);
		}
		else {
			totalWastedTime = 0;
		}
		$('.time-wasted>span').html(totalWastedTime+' s');
		var percentageTimeWaste = Math.floor((totalWastedTime/totalTime)*100);
		$('.points>span').html(points);
		$('.percentage').html(Math.floor(percentageTimeWaste) + '%');
		$('.chart').data('easyPieChart').update(percentageTimeWaste);
		
	}
	loadTable();
	$('.chart').easyPieChart({
		animate: 1000
	});
	updatePieChart();
	$('.button').on('click',function(e){
		e.preventDefault();
		if($('.website').val().length === 0 || severity === "Action" || $('.timeout-number').val().length === 0){
			alert("Missing data!");
			return;
		}
		sites = getLocalStorage();
		if(sites == undefined || sites == null || sites.length <= 0){
			sites = new Array();
		}
		var site = new Object();
		site.url = $('.website').val();
		site.timeout = 0;
		site.maxTimeout = $('.timeout-number').val();
		site.severity = severity;
		sites.push(site);
		storeLocally(sites);
		$('.sites-table>tbody').append('<tr><td>'+(sites.length)+'</td><td>'+site.url+'</td><td>'+site.timeout+'</td><td>'+site.maxTimeout+'</td><td>'+site.severity+'</td><td><a class="delete"><input type="hidden" value='+sites.length+' class="index"><i class="icon-remove"></i></a></td>');
		$('.sites-number').html(sites.length);
		$('.website').val("");
		$('.timeout-number').val("");
	});
	function storeLocally(data){
		localStorage.setItem("sites",JSON.stringify(data));
	}
	function getLocalStorage(){
		return JSON.parse(localStorage.getItem("sites"));
	}
	function loadTable(){
		var sites = JSON.parse(localStorage.getItem("sites"));
		if(sites != null) {
			if(sites.length === 0){
				$('.sites-table>tbody').html("");
				$('.sites-number').html(0);
			}
			else {
				for(var i=0; i < sites.length; i++){
					$('.sites-table>tbody').append('<tr><td>'+(i+1)+'</td><td>'+sites[i].url+'</td><td>'+sites[i].timeout+'</td><td>'+sites[i].maxTimeout+'</td><td>'+sites[i].severity+'</td><td><a class="delete"><input type="hidden" value='+(i+1)+' class="index"><i class="icon-remove"></i></a></td>');
					$('.sites-number').html(sites.length);
				}
			}
		}
	}
	$(".delete").on('click',function(e){
		e.preventDefault();
		var deleteElementNo = $(this).find("input").val() - 1;
		var sites = getLocalStorage();
		sites.splice(deleteElementNo,1);
		storeLocally(sites);
		loadTable();
	})
});