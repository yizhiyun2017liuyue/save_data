
	//存放行里的维度元素的数据
var save_row_de_wrap =[],

//存放行里的度量元素的数据

	save_row_me_wrap = [],

//存放列里的维度元素的数据

	save_col_de_wrap = [],

//存放列里的度量元素的数据
	save_col_me_wrap = [],

// 表内行里数据的保存

	table_row_data_save = [],

//表内列里数据的保存

	table_col_data_save = [],


	row_if_me = [],

	row_if_de = [],
	col_if_me = [],

	col_if_de = [];

function histogram_show(all_col_data,all_row_data){
		//判断拖入的是行还是列
		var row_if_col = _drag_message["position"];

		//判断拖入的是维度还是度量

		var row_col_type = _drag_message["type"];

		//二维数组保存数据
 		var save_row_temp_de = [],
 		save_row_temp_me = [],
 		save_col_temp_de = [],
 		save_col_temp_me = [];
	
		 if( row_if_col == "row"){
		 	row_if_de = [];
		 	row_if_me = [];
		 	var row_data_change_de = drag_row_column_data["row"]["dimensionality"];
		 	var row_data_change_me = drag_row_column_data["row"]["measure"];

		 	row_data_change_de.filter(function(ele){
		 		row_if_de.push(ele.split(":")[0])
		 	})

		 	row_data_change_me.filter(function(ele){
		 		row_if_me.push(ele.split(":")[0])
		 	})


		 }else if(row_if_col == "column"){
		 	col_if_de = [];
		 	col_if_me = [];
		 	var col_data_change_de = drag_row_column_data["column"]["dimensionality"];
		 	var col_data_change_me = drag_row_column_data["column"]["measure"];
		 	col_data_change_de.filter(function(ele){
		 		col_if_de.push(ele.split(":")[0])
		 	})
		 	
		 	col_data_change_me.filter(function(ele){
		 		col_if_me.push(ele.split(":")[0])
		 	})
		 }


	//循环遍历数据获取对应维度度量的数据
	for(var i = 0; i < _cube_all_data[current_cube_name]["data"].length;i++){
 		var cube_temp = _cube_all_data[current_cube_name]["data"][i];
 		
 		//判断拖入行列数据的过滤
 			if(row_if_col == "row" &&  row_col_type == "dimensionality"){
 				save_row_temp_de.push(cube_temp[row_if_de[all_row_data[1]-1]])
 				
 			}else if(row_if_col == "row" && row_col_type == "measure"){
 				save_row_temp_me.push(cube_temp[row_if_me[all_row_data[0]-1]]);

 			}
	// .......................................
			// 存储列里的数据
			if(row_if_col == "column" && row_col_type == "dimensionality"){
				save_col_temp_de.push(cube_temp[col_if_de[all_col_data[1]-1]]);

			}else if(row_if_col == "column" && row_col_type == "measure"){
				save_col_temp_me.push(cube_temp[col_if_me[all_col_data[0]-1]]);

			}
			
			
 	}
 			//判断数组不为空存储
 			if(save_row_temp_de.length != 0){
 				save_row_de_wrap.push(save_row_temp_de);
 			}else if(save_row_temp_me.length != 0){
 				save_row_me_wrap.push(save_row_temp_me);
 			}else if(save_col_temp_me.length != 0){
 				save_col_de_wrap.push(save_col_temp_me);
 			}else if(save_col_temp_de != 0){
 				save_col_me_wrap.push(save_col_temp_de);
 			}
 				
				
				

console.log(row_if_me,row_if_de);
console.log(save_row_de_wrap,save_row_me_wrap);
console.log(save_col_de_wrap,save_col_me_wrap);
	

	//判断拖入方式展示不同图形
	//判断拖入行中展示图形
	if(row_if_col == "row"){
		var bar_data_save =[];
		//判断拖入度量展示柱状图
		if(row_col_type == "measure"){
			//保存数组求和后数据
			var row_me_add = [];
			//遍历度量数组进行求和运算
			for(var i =0;i <save_row_me_wrap.length;i++){
				var addTemp = save_row_me_wrap[i];
				row_me_add.push(addTemp.reduce(function(sum, value){return sum + value;},0));
				
				//柱状图的绘制的数据存储

				var bar_data_dict = {name:row_if_me[i],type:"bar",data:row_me_add}

				


			

			}

			
			bar_data_save.push(bar_data_dict);













console.log(bar_data_save)
			barChart("category","value",false,true,"category",row_if_me.join("/"),row_if_me,bar_data_save);
		}
	}

	//图形展示
function barChart(xType,yType,xShow,yShow,xTitle,yTitle,xText,bar_data_save){
	$("#main").css("display","block");

	//基于准备好的dom，初始化echarts
	var myChart = echarts.init(document.getElementById("main"));

	option = {
    title: {
        text: current_cube_name,
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    // legend: {
    //     data: ['包租费', '装修费', '保洁费', '物业费'],
    //     align: 'right',
    //     right: 10
    // },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [{
    	show:xShow,
        type: xType,
        name:xTitle,
        nameLocation:"middle",
         nameGap:"35",
        data: xText
    }],
    yAxis: [{
    	show:yShow,
        type: yType,
        name: yTitle,
        nameLocation:"middle",
        nameGap:"35",
        axisLabel: {
            formatter: '{value}'
        }
    }],
    series:bar_data_save
};

	//使用刚指定的配置项和数据显示图标
	myChart.setOption(option);



}



}