(function( $ ){
	"use strict";

	var defOptionses, animated = false;

	var methods = {
		sliderAutoHeight : function(options) {

			return this.each(function(index, el){
			    var defOptions = $.extend({
			    	$el: this,
			    	sliderMenu: $('.slider__arrows', this),
			    	ul:   		$('.slider__items', this),
					li:   		$('.slider__items .slider__item', this),
					delay: 	    4000,
					visible: 	1, // кол-во блоков в видимой части
					step: 		1, // шаг смещения
					duration: 	600 // время анимации;
			    }, options);

			    if (defOptions.li.length <= defOptions.visible) {
			    	defOptions.sliderMenu.hide();
			    	return false;
			    } else {
			    	var status = 0;
			    	$(defOptions.$el).addClass('init').append('<div class="counter"><i class="current_count">' + ($('.item-active', defOptions.ul).index() + 1) + '</i>/' + defOptions.li.length + '</div>');
			    	defOptions.ul.css('height', $('.item-active', defOptions.ul).outerHeight());
			    }

				$('.slider__prev', defOptions.sliderMenu).addClass('noactive');

			  	$('.slider__btn', defOptions.sliderMenu).on('click', function() {
			  		if(defOptions.ul.is(':animated') ||  $(this).hasClass('noactive')){return false;}

			  		var $activeEL = $('.item-active', defOptions.ul);

			  		if ( $(this).hasClass('slider__prev') ) {
			  			--status;
			  			var $nextEL = $activeEL.prev();
		  				$('.slider__next', defOptions.sliderMenu).removeClass('noactive');
			  		} else if ( $(this).hasClass('slider__next') ) {
			  			++status;
			  			var $nextEL = $activeEL.next();
		  				$('.slider__prev', defOptions.sliderMenu).removeClass('noactive');
			  		}

	  				if (status == defOptions.li.length - defOptions.visible) {
	  					$('.slider__next', defOptions.sliderMenu).addClass('noactive');
	  				} else if(status == 0) {
	  					$('.slider__prev', defOptions.sliderMenu).addClass('noactive');
	  				}

	  				$('.current_count', defOptions.$el).text($nextEL.index() + 1);

	  				$nextEL.fadeIn(defOptions.duration, function() {
	  					$nextEL.addClass('item-active').attr('style', '');
	  					$activeEL.removeClass('item-active');
	  				});

			  		return false;
			  	});
			});
		}
	}
	jQuery.fn.multiCarousel = function(method, options) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
	    } else {
			$.error( 'Метод с именем ' +  method + ' не существует для jQuery.multiCarousel' );
	    } 
  	};;

})(jQuery);

