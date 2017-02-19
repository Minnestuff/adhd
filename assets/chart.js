$(function() {
	loadTable();
	$('.chart').easyPieChart({animate: 1000});
	$('.button').on('click',function(e){
		e.preventDefault();
		sites = getLocalStorage();
		if(sites == undefined || sites == null || sites.length <= 0){
			sites = new Array();
		}
		console.log(sites);
		var site = new Object();
		site.url = $('.website').val();
		site.timeout = 0;
		sites.push(site);
		storeLocally(sites);
		$('.sites-table>tbody').append('<tr><td>'+(sites.length)+'</td><td>'+site.url+'</td><td>'+site.timeout+'</td>');
		$('.sites-nunmber').html(sites.length);
		console.log(getLocalStorage());
	});
	function storeLocally(data){
		localStorage.setItem("sites",JSON.stringify(data));
	}
	function getLocalStorage(){
		return JSON.parse(localStorage.getItem("sites"));
	}
	function loadTable(){
		var sites = JSON.parse(localStorage.getItem("sites"));
		console.log(sites);
		if(sites != null) {
			for(var i=0; i < sites.length; i++){
				$('.sites-table>tbody').append('<tr><td>'+(i+1)+'</td><td>'+sites[i].url+'</td><td>'+sites[i].timeout+'</td>');
				$('.sites-number').html(sites.length);
			}
		}
	}
});