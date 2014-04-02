/*
	Process
	1. Detect HTML5 video compatibility
	2. Login
	3. Valid login returns json object w/ all video data
*/

;(function($) {
	
	$.fn.videoeditor = function(options) {
		
		var options,
			len,
			editor,
			videoPanel,
			videoPanelId = 'editor-video-panel',
			durationPanel,
			durationPanelId = 'editor-duration-panel',
			sliderPanel,
			sliderPanelId = 'editor-slider-panel',
			video,
			data,
			dataUrl = 'json/videodata.json',
			isOldIe = false,
			isMobile = false,
			isSafari6 = true,
			videoPanelW = 960,
			videoPanelH = 540,
			slideW = 40,
			initSlideTransform = 0,
			maxSlideTransform = 0,
			deviceType,
			setTime = false,
			vidDuration = 0,
			seekTo = 0,
			seekTimer,
			lastSeekTo,
			dragStart = 'mousedown',
			dragStop = 'mouseup',
			dragMove = 'mousemove',
			transformProp = 'transform',
			mRegEx = /-(.*?),/;
		
		this.init = function() {
			editor = $(this);
			// Browser checks
			deviceType = detectDeviceType();
			isOldIe = detectOldIe();
			isSafari6 = detectSafari6();
			// Only runs on HTML Video supported browsers… use Modernizr to detect?
			if (Modernizr.video.h264 === 'probably' || Modernizr.video.ogg === 'probably') {
				loadData();
			} else {
				// Need to display message that editor not supported
			}
			// Detect touch-enabled browsers
			if (Modernizr.touch) {
				dragStart = 'touchstart';
				dragStop = 'touched';
				dragMove = 'touchmove';
			}
			// Display something for smaller device mobile browsers
			// Detect for -webkit-transform
			if (!Modernizr.testProp('transform')) {
				transformProp = '-webkit-transform';
			}
			return this;
		}
		
		function loadData() {
			$.getJSON(encodeURI(dataUrl), function(d) {
				data = d;
				buildEditor();
			});
		}
		
		function buildEditor() {
			// Create video panel
			editor.append('<div id="' + videoPanelId + '" />');
			videoPanel = $('#' + videoPanelId);
			// Create duration panel
			editor.append('<div id="' + durationPanelId + '" />');
			durationPanel = $('#' + durationPanelId);
			// Create slider panel
			editor.append('<div id="' + sliderPanelId + '" />');
			sliderPanel = $('#' + sliderPanelId);
			// Video panel html
			vidDuration = parseInt(data.duration);
			var poster = data.poster,
				w = videoPanelW,
				h = videoPanelH,
				mp4 = data.mp4,
				ogg = data.ogg;
			videoPanel.append(
				// '<video id="video" poster="' + poster + '" width="' + w +'" height="' + h +'" onclick="this.play();">' +
				'<video id="video" poster="' + poster + '" width="' + w +'" height="' + h +'">' +
				'<source src="' + mp4 + '" type="video/mp4">' +
				'<source src="' + ogg + '" type="video/ogg">' +
				'</video>'
			);
			video = document.getElementById('video');
			// iOS fix
			video.addEventListener('timeupdate', onTimeUpdate);
			// Slider panel html
			var s = '<div class="slide-holder"><div class="slider">';
			for (i in data.thumbs) {
				s += '<div class="slide" style="background-image: url(' + data.thumbs[i] + ');" />';
			}
			// Add shim w/ padding, close div
			s += '<div class="slide" style="padding-right: ' + (videoPanelW - slideW * 2) + 'px;" /></div></div>';
			sliderPanel.append(s);
			sliderPanel.find('.slide-holder').iosSlider({
				desktopClickDrag: true,
				snapToChildren: false,
				infiniteSlider: false,
				snapSlideCenter: false,
				autoSlide: false,
				scrollbar: false,
				scrollbarMargin: '0',
				scrollbarBorderRadius: '0',
				keyboardControls: true,
				responsiveSlides: false,
				onSlideStart: onSlideStart,
				onSlideComplete: onSlideComplete
			});
			initSlideTransform = (slideW * (parseInt(i) + 1) + (videoPanelW - slideW * 2));
			maxSlideTransform = initSlideTransform + (initSlideTransform - videoPanelW);
			//
			s = '<div class="duration" /><div class="dragger"><div class="inner" /></div>';
			durationPanel.append(s);
			// Duration events
			var lb = editor.offset().left;
			var rb = lb + videoPanelW;
			$('.dragger').on(dragStart, function() {
				$(window).on(dragMove, function(e) {
					var val = Math.min(rb, Math.max(lb, e.pageX)) - lb;
					$('.dragger').css({'left': val});
					$('.duration').css({'width': val});
					return false;
				}).on(dragStop, function() {
					$(window).off(dragMove);
				});
			});
		}
		
		function onSlideStart() {
			seekTimer = setInterval(seek, 33);
		}
		
		function onSlideComplete() {
			clearInterval(seekTimer);
		}
		
		function seek() {
			var m =  parseInt($('.slider').css(transformProp).match(mRegEx)[1]);
			var at = (m - initSlideTransform) / (maxSlideTransform - initSlideTransform);
			var val = Math.floor(Math.min(vidDuration, (Math.max(0, vidDuration * at))));
			if (lastSeekTo === val) {
				return;
			}
			video.play(); // by playing the video we are ensuring we hit the timeupdate listener
			setTime = true;
			seekTo = lastSeekTo = val;
		}
		
		function onTimeUpdate() {
			if (setTime) {
				setTime = false;
				video.currentTime = seekTo;
				video.pause();
			}
		}
		
		function detectOldIe() {
			if (document.getElementsByTagName('html')[0].className.indexOf('oldIE') != -1) {
				return true;
			}
			return false;
		}
		
		function detectSafari6() {
			if (deviceType === '') {
				var a = navigator.userAgent.match(/(version\/.*?)(?= safari)/i);
				if (a != null) {
					var s = a[0].split('/')[1];
					if (s != null) {
						if (parseInt(s) < 6) {
							return false;
						}
					}
				}
			}
			return true;
		}
		
		function detectDeviceType() {
			if (navigator.userAgent.toLowerCase().indexOf('android') != -1) {
				if (navigator.userAgent.toLowerCase().indexOf('mobile') != -1) {
					return 'mobile';
				} else {
					return 'tablet';
				}
			}
			if (navigator.platform.indexOf('iPhone') != -1) {
				return 'mobile';
			}
			if (navigator.platform.indexOf('iPad') != -1) {
				return 'tablet';
			}
			if ('ontouchstart' in document.documentElement) {
				return 'mobile';
			}
			return '';
		}
		
		return this.init();
	}

}(jQuery));