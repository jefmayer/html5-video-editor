<!doctype html>
<html class="no-js">
	<head>
	<!--
	
	__/\\\\\\\\\\\\\\\______/\\\\\\\\\____        
	 _\/////////////\\\____/\\\///////\\\__       
	  ____________/\\\/____\/\\\_____\/\\\__      
	   __________/\\\/______\///\\\\\\\\\/___     
	    ________/\\\/_________/\\\///////\\\__    
	     ______/\\\/__________/\\\______\//\\\_   
	      ____/\\\/___________\//\\\______/\\\__  
	       __/\\\/______________\///\\\\\\\\\/___ 
	        _\///__________________\/////////_____
	
	-->

	<meta charset="utf-8">
	<title>HTML5 Video Editor</title>
	
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<script src="js/vendor/modernizr-2.6.2.min.js"></script>
	
	<style>
		body {
			background: #000;
			font-family: Arial, Helvetica, sans-serif;
			font-size: 16px;
			font-weight: normal;
		}
		
		* {
			margin: 0;
			padding: 0;
		}
		
		#ra-video-editor {
			width: 960px;
			margin: 0 auto;
		}
		
		#editor-video-panel {
			width: 100%;
			height: 540px;
			float: left;
		}
		
		#editor-duration-panel {
			float: left;
			clear: both;
			position: relative;
			width: 100%;
			height: 10px;
			background-color: #333;
			z-index: 2;
		}
			
			#editor-duration-panel .duration {
				position: absolute;
				top: 0;
				left: 0;
				width: 200px;
				height: 10px;
				background-color: #ffff00;
				z-index: 1;
			}
			
			#editor-duration-panel .dragger {
				position: absolute;
				top: 0;
				left: 200px;
				z-index: 2;
				cursor: pointer;
			}
			
			#editor-duration-panel .dragger .inner {
				position: absolute;
				top: -5px;
				left: -10px;
				width: 20px;
				height: 20px;
				background-color: #888;
			}
			
		
		#editor-slider-panel {
			width: 100%;
			height: 80px;
			float: left;
			clear: both;
			position: relative;
			z-index: 1;
		}
		
			#editor-slider-panel .slide-holder {
				overflow: hidden;
				position: relative;
				width: 100%;
				height: 100%;
			}
		
			#editor-slider-panel .slider {
				position: absolute;
				left: 0;
				top: 0;
				height: 80px;
			}
		
			#editor-slider-panel .slider .slide {
				position: absolute;
				top: 0;
				width: 40px;
				height: 100%;
				background-position: 50% 0;
				background-repeat: no-repeat;
			}
		
	</style>
	
	</head>
	
	<body>
		<div id="ra-video-editor"></div>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		<script type="text/javascript" src="js/vendor/iosslider.js"></script>
		<script type="text/javascript" src="js/app.js"></script>
		<script type="text/javascript" src="js/jquery.videoeditor.js"></script>
	</body>
</html>