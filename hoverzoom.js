/**
 * Place your JS-code here.
 */
(function($) {
	$(document).ready(function(){
		'use strict';
		var IMG_OFFSET = 20;
		var imgImg = new Image();
		var mousePos = {x : 0, y : 0};
		var imgSize = {height: 0, width: 0};
		var currentImage = null;
		var hideImage = false;

		$(imgImg).css({
			display: 'none',
			backgroundColor: '#FFF',
			position: 'fixed',
			border: '1px solid #CCC',
			padding: '2px',
			left: '0px',
			top: '0px',
		});

		$('body').append(imgImg);



		function getImageSize(height,width) {
			var imgHeight 		= height;
			var imgWidth 		= width;
			var documentHeight	= window.innerHeight;
			var documentWidth	= window.innerWidth;

			if(documentHeight-IMG_OFFSET < imgHeight) {
				imgHeight = documentHeight-IMG_OFFSET;
			}
			if(documentWidth-IMG_OFFSET < imgWidth) {
				imgWidth = documentWidth-IMG_OFFSET;
			}
			return {height:imgHeight, width: imgWidth};
		}

		function getImagePosition(img) {
			var imgTop 			= mousePos.y-(imgImg.height/2);
			var imgLeft 		= mousePos.x+IMG_OFFSET;
			var documentHeight	= window.innerHeight;
			var documentWidth	= window.innerWidth;

			// Make sure img doesn't goes above or below the screen.
			if(imgTop < 0) {
				imgTop = 0;
			} else if(imgTop+(imgSize.height) > documentHeight) {
				imgTop = documentHeight-imgSize.height;
			}

			// Make sure that the img doesn't go outside the screen to the left or the right.
			if((imgLeft+imgImg.width) > documentWidth-IMG_OFFSET) {
				imgLeft -= imgImg.width+IMG_OFFSET*2;
			}

			var retVal = {top:imgTop, left:imgLeft};
			return retVal;
		}

		function hideImg(e) {
			//Hide the image
			$(imgImg).hide(0,function(){
				//Remove the image for performance?
				$(imgImg).attr('src','');
			});
		}

		function showImg(e) {
			imgImg.src = currentImage.src;
			return;
		}

		imgImg.onload = function () {
			imgSize 	= getImageSize(imgImg.height,imgImg.width);
			var imgPos	= getImagePosition();
			var cssObj = {
				left: imgPos.left+'px',
				top: imgPos.top+'px',
				height: imgSize.height,
				maxWidth: (window.innerWidth)+'px',
				//width: imgSize.width,
			};
			$(this).css(cssObj);
			$(this).show(0);
		};
		$('img').mouseover(function(e) {
			currentImage = this;
			if(!hideImage) {
				showImg(e);
			}
		});
		$('img').mouseout(function(e) {
			currentImage = null;
			hideImg(e);
		});
		$('*').mousemove(function(e) {
			mousePos.x = e.clientX;
			mousePos.y = e.clientY;
			imgSize 	= getImageSize(imgImg.height,imgImg.width);
			var imgPos	= getImagePosition();
			$(imgImg).css({
				left: imgPos.left+'px',
				top: imgPos.top+'px',
				height: imgSize.height,
				maxWidth: (window.innerWidth)+'px',
				//width: imgSize.width,
			});
			return;
		});

		$('html').keydown(function(e) {
			if(e.keyCode == 88) {
				hideImage = !hideImage;
				if(hideImage) {
					if(!(currentImage === null)) {
						hideImg(e);
					}
				} else {
					if(!(currentImage === null)) {
						showImg(e);
					}
				}
			}
			if(e.keyCode == 84) {
				if(!(currentImage === null)) {
					window.open(currentImage.src,'_blank');
				}
			}
		});
	});
}(jQuery));