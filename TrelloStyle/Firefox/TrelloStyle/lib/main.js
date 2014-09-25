// main.js

var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
	include: "*.trello.com",
	contentScriptFile: [data.url("jquery-1.11.1.min.js"), data.url("jquery-1.11.1.min.map"), data.url("content-script.js")]
});