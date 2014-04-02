// Requires jquery, modernizr
(function ($, window, document, undefined) {
	$(function () {
		var app = new App();
		app.init();		
	});
})(jQuery, window, document);

var App = function App() {
	
	var editor;
	
	this.init = function() {
		editor = $('#ra-video-editor').videoeditor();
	};
	
	
	
	
	return this;
}