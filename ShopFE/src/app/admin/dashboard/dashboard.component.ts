import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  chart: any;
  sales: number = 0;
  income: number = 0;
  users: number = 0;
  orders: number = 0;
  loaded1: boolean = false;
  loaded2: boolean = false;
  chartOptions = {
	animationEnabled: true,
	theme: "light2",
	title:{
	  text: "Revenue Analysis"
	},
	axisY: {
	  title: "Number of Orders",
	  includeZero: true
	},
	axisY2: {
	  title: "Total Revenue",
	  includeZero: true,
	  labelFormatter: (e:any) => {
		  var suffixes = ["", "K", "M", "B"];

		  var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		  if(order > suffixes.length - 1)
			  order = suffixes.length - 1;

		  var suffix = suffixes[order];
		  return '$' + (e.value / Math.pow(1000, order)) + suffix;
	  }
	},
	toolTip: {
	  shared: true
	},
	legend: {
	  cursor: "pointer",
	  itemclick: function (e: any) {
		  if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			  e.dataSeries.visible = false;
		  } else {
			  e.dataSeries.visible = true;
		  } 
		  e.chart.render();
	  }
	},
	data: [{
	  type: "column",
	  showInLegend: true,
	  name: "Revenue",
	  axisYType: "secondary",
	  yValueFormatString: "$#,###",
	  dataPoints: [
		  { label: "Jan", y: 250000 },
		  { label: "Feb", y: 431000 },
		  { label: "Mar", y: 646000 },
		  { label: "Apr", y: 522000 },
		  { label: "May", y: 464000 },
		  { label: "Jun", y: 470000 },
		  { label: "Jul", y: 534000 },
		  { label: "Aug", y: 407000 },
		  { label: "Sep", y: 484000 },
		  { label: "Oct", y: 465000 },
		  { label: "Nov", y: 424000 },
		  { label: "Dec", y: 231000 }
	  ]
	},{
	  type: "spline",
	  showInLegend: true,
	  name: "No of Orders",
	  dataPoints: [
		  { label: "Jan", y: 372 },
		  { label: "Feb", y: 412 },
		  { label: "Mar", y: 572 },
		  { label: "Apr", y: 224 },
		  { label: "May", y: 246 },
		  { label: "Jun", y: 601 },
		  { label: "Jul", y: 642 },
		  { label: "Aug", y: 590 },
		  { label: "Sep", y: 527 },
		  { label: "Oct", y: 273 },
		  { label: "Nov", y: 251 },
		  { label: "Dec", y: 331 }
	  ]
	}]
  }	
  constructor(public userService: UserService){
	this.userService.getIncome().subscribe(data=>this.income = data)
	this.userService.getSales().subscribe(data=>this.sales = data)
	this.userService.getUserCount().subscribe(data=>this.users = data)
	this.userService.getTotalOrders().subscribe(data=>this.orders = data)
	this.userService.getIncomeMonths().subscribe(
		data=>{
			this.chartOptions.data[0].dataPoints.forEach((value,index)=>{
				value.y = data[index];
			})
			console.log(this.chartOptions.data[0].dataPoints)
			this.loaded1= true;
		}
	)
	this.userService.getTotalOrdersByMonths().subscribe(
		data=>{
			this.chartOptions.data[1].dataPoints.forEach((value,index)=>{
				value.y = data[index];
			})
			console.log(this.chartOptions.data[0].dataPoints)
			this.loaded2=true;
		}
	)


  }
	
}
