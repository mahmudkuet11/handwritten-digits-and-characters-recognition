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


	//weight
	var w1 = [];
	$.get("w1.txt", function(w1_data){
		var w1_array = JSON.parse(w1_data);
		for(var i in w1_array["w1"]){
			w1.push(w1_array["w1"][i]);
		}
	});

	var w2 = [];
	$.get("w2.txt", function(w2_data){
		var w2_array = JSON.parse(w2_data);
		for(var i in w2_array["w2"]){
			w2.push(w2_array["w2"][i]);
		}
	});


	$("#get_data").click(function(){
		var data = [];
		for(var i=1; i<=64; i++){
			var active = $("#" + i).attr("data-active");
			data.push(active);
		}
		data.push(1);	// for hidden neuron

		var hidden_size = 64;
		var input1_size = 65;
		var output_size = 10;

		var z1 = [];
		for(var j=0; j<hidden_size; j++){
			z1[j] = 0;
			var weight_index = j;
			for(var k=0; k<input1_size; k++){
				z1[j] += data[k] * w1[weight_index]
				weight_index += hidden_size;
			}
		}
		var a1 = [];
		for(var j=0; j<hidden_size; j++){
		    a1[j] =  1/(1+Math.exp(-z1[j]));
		}
		a1[hidden_size] = 1;
		var z2 = [];
		for(var j=0; j<output_size; j++){
			z2[j] = 0;
			var weight_index = j;
			for(var k=0; k<a1.length; k++){
				z2[j] += a1[k] * w2[weight_index];
		        weight_index += output_size;
			}
		}
		var a2 = [];
		for(var j=0; j<z2.length; j++){
		    a2[j] = 1/(1+Math.exp(-z2[j]));
		}

		var max = 0;
		var final_output = 0;
		for(var k=0; k<a2.length; k++){
		    if(a2[k] > max){
		    	max = a2[k];
		    	final_output = k;
		    }
		}

		console.log(final_output);

		/*
		//2nd layer
		float[] z2 = new float[output_size];
		for(int j=0; j<output_size; j++){
		    int weight_index = j;
		    for(int k=0; k<a1.length; k++){
		        z2[j] += a1[k] * w2[weight_index];
		        weight_index += output_size;
		    }
		}
		float[] a2 = new float[output_size];
		for(int j=0; j<z2.length; j++){
		    a2[j] = (float) (1/(1+Math.exp(-z2[j])));
		}
		System.out.println("output----------------------------------------------------------");
		for(int k=0; k<a2.length; k++){
		    System.out.println("["+ k +"]-" + Math.round(a2[k]));
		}*/





























	});

});