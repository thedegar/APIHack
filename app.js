/*-----------------------------------
//	Tyler Hedegard
//	06-26-14
//	Thinful.com API Hack Project
//	The DOW NOW
//---------------------------------*/

$(document).ready(function() {
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
		//need code here to handle each quote, extract ticker, price, etc

		console.log(quote[0].t, quote[0].l, quote[0].cp);
	})
	.fail(function(jqXHR, error, errorThrown){
		console.log(error);
	});
};
