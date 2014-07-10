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

//Ticker symbols for eadh Dow company
var dow = [
	"MMM","AXP","T","BA","CAT","CVX","CSCO","DD","XOM",
	"GE","GS","HD","INTC","IBM","JNJ","JPM","MCD","MRK",
	"MSFT","NKE","PFE","PG","KO","TRV","UTX","UNH","VZ",
	"V","WMT","DIS"
];

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
		//need code to order by % gain

	})
	.fail(function(jqXHR, error, errorThrown){
		console.log(error);
	});
};

//Initiate main variable where the data will be stored
var stockData = [];

function Stock(ticker, exchange, price, change, changePercent) {
	this.ticker = ticker;
	this.exchange = exchange;
	this.price = price;
	this.change = change;
	this.changePercent = changePercent;
};

var storeData = function(quote) {
	stockData.push(new Stock(quote[0].t, quote[0].e, quote[0].l, quote[0].c, quote[0].cp));
	console.log(stockData);
};
