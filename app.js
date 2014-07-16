/*-----------------------------------
//	Tyler Hedegard
//	06-26-14
//	Thinful.com API Hack Project
//	The DOW NOW
//---------------------------------*/

$(document).ready(function() {
	//clear out any old data
	stockData = [];
	//request a quote for each DOW company
	for (var i = 0;i<dow.length;i++) {
		quotes(dow[i]);
	}
});

$(document).on("click","#header",function() {
	if (stockData.length < 30) {
		alert("Please wait.  The qoutes are not complete yet.");
	}
	findGains();
	reorderStocks();
});

//Ticker symbols for eadh Dow company
var dow = [
	"MMM","AXP","T","BA","CAT","CVX","CSCO","DD","XOM",
	"GE","GS","HD","INTC","IBM","JNJ","JPM","MCD","MRK",
	"MSFT","NKE","PFE","PG","KO","TRV","UTX","UNH","VZ",
	"V","WMT","DIS"
];

//global variables
var stockData = [];
var gains = [];
var finalStocks = [];

//AJAX call to get real time information on a stock ticker
var quotes = function(ticker) {
	var quote = $.ajax({
		url: "http://finance.google.com/finance/info?client=ig",
		data: {
			q: ticker},
		dataType: "jsonp",
		type: "GET",
		})
	.done(function(quote){
		storeData(quote);
	})
	.fail(function(jqXHR, error, errorThrown){
		console.log(error);
	});
};

function Stock(ticker, exchange, price, change, changePercent) {
	this.ticker = ticker;
	this.exchange = exchange;
	this.price = price;
	this.change = change;
	this.changePercent = changePercent;
};

var storeData = function(quote) {
	stockData.push(new Stock(quote[0].t, quote[0].e, quote[0].l, quote[0].c, quote[0].cp));
};

//function finds the gains for each stock quote and orders them max to min
var findGains = function() {
	gains = [];
	for (var i=0;i<stockData.length;i++) {
		gains.push(eval(stockData[i].changePercent));
	}
	gains.sort().reverse();
	//Sort doesn't order negative numbers properly
	//This code finds the negative values and reorders them
	var negGains = [];
	for (var i=29;i>=0;i--) {
		if (gains[i]<0) {
			negGains.push(gains[i]);
			gains.pop();
		}
	}
	gains = gains.concat(negGains);
};

//Function reorders the stock array in order of descending change percent
var reorderStocks = function() {
	for (var i=0;i<gains.length;i++) {
		//Variable to handle duplicate gains
		var duplicateCount = 0;
		//Count how many matching gains
		for (var z=0;z<gains.length;z++) {
			if (gains[i]==gains[z]) {
				duplicateCount++;
			}
		}
		//Find stocks that match the gains amount
		for (var j=0;j<stockData.length;j++) {
			if (gains[i] == eval(stockData[j].changePercent)) {
				finalStocks.push(stockData[j]);
				//handle duplicate gains
				while (duplicateCount > 1) {
					for (var l=j+1;l<stockData.length;l++) {
						if (gains[i] == eval(stockData[l].changePercent)) {
							finalStocks.push(stockData[l]);
							duplicateCount--; //decrement count 
							j++; //increment j to finish finding duplicates
							i++; //increment i by 1 since you just pushed another value
							break; //break out of loop
						}
					}
				}
				break;  //break out of loop
			}
		}
	}
};


