$(function() {
	$('.chart').easyPieChart({animate: 1000});
	$('.button').on('click',function(e){
		e.preventDefault();
		var website = $('.website').val();
		console.log(getLocalStorage());
	});
	function storeLocally(data){
		var allData = getLocalStorage();
		allData.push(data);
		localStorage.setItem("sites",JSON.stringify(allData));
	}
	function getLocalStorage(){
		return JSON.parse(localStorage.getItem("sites"));
	}
});