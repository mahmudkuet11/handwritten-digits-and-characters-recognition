$(document).ready(function(){
	for (var i = 1; i <=64; i++) {
		$(".grid").append("<div class=\"cell\" id=\""+ i +"\" data-active=\"0\"></div>");
	}


	$(".cell").click(function(){
		if($(this).attr("data-active") == 0){
			$(this).css({"background":"#666"});
			$(this).attr("data-active", "1");
		}else{
			$(this).css({"background":"#e1e1e1"});
			$(this).attr("data-active", "0");
		}
		
		
	});

	var click = false;
	$(".grid").mousedown(function(){
		click = true;
	});
	$(".grid").mouseup(function(){
		click = false;
	});
	$(".cell").mousemove(function(){
		if(!click) return;
		$(this).css({"background":"#666"});
		$(this).attr("data-active", "1");
	});



	$("#clear").click(function(){
		$(".cell").css({"background":"#e1e1e1"});
		$(".cell").attr("data-active", "0");
	});

	$("#get_data").click(function(){
		var data = [];
		for(var i=1; i<=64; i++){
			var active = $("#" + i).attr("data-active");
			data.push(active);
		}
		var value = $("#value").val();

		if(value == '') return;
		$.post("http://localhost/nn/save_data.php", {value:value,data:JSON.stringify(data)}, function(res){
			$(".cell").css({"background":"#e1e1e1"});
			$(".cell").attr("data-active", "0");
			$("#value").val('');
		});
	});

});