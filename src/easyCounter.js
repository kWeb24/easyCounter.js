/*!
* @license easyCounterJS
* Visit [https://github.com/kWeb24/easyCounter.js] for documentation, updates and examples.
*
* Copyright (c) 2017 kamilweber.pl
*
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/

;( function( $, window, document, undefined ) {

	"use strict";
		var pluginName = "easyCounter",
			defaults = {
				'duration': 1000,
       	'delay': 0,
				'decimals': 0,
				'runonce': false,
				'disableoverride': false,
				'autorun': true,
       	'direction': 'asc',
       	'attrmin': 'ec-min',
       	'attrmax': 'ec-max',
				'attrdecimals': 'ec-decimals',
				'attrduration': 'ec-duration',
				'attrdelay': 'ec-delay',
				'attrdirection': 'ec-direction',
				'attrrunonce': 'ec-run-once',
				'attrdisableoverride': 'ec-disable-override',
				'attrautorun': 'ec-auto-run'
			};

		function Plugin ( element, options ) {
			this._name = pluginName;
			this.element = element;
			this._defaults = defaults;

			this.options = options;
			this.settings = $.extend( {}, defaults, options );

			this.defaultText = $(this.element).text();

			this.keyValues = {
				'min': 0,
				'max': 0,
				'isVisible': false,
				'isFloat': false,
				'isExecuted': false,
				'isExecuting': false,
				'autorun': this.settings.autorun,
				'disableOverride': this.settings.disableoverride,
				'runonce': this.settings.runonce,
				'decimals': this.settings.decimals,
				'duration': this.settings.duration,
				'delay': this.settings.delay,
				'direction': this.settings.direction
			};
			this.init();
			this.clearValues();
		}

		$.extend( Plugin.prototype, {
			init: function() {
				var el = this.element;
				var self = this;
				this.checkAttributes(el);

				$(window).scroll(function() { self.isOnScreen(el); });
				$(document).ready(function() { self.isOnScreen(el); });
				$(window).on( "ec-element-enter-screen", {}, function(event, el) {
					if (el === self.element && self.shouldRun()) {
						self.keyValues.isExecuting = true;
						self.countUp(el, self);
					}
				});

				$(window).on( "ec-element-leave-screen", {}, function(event, el) {
				});
			},

			checkAttributes: function(item) {
				var attributes = {
					'min': $(item).attr(this.settings.attrmin),
					'max': $(item).attr(this.settings.attrmax),
					'decimals': $(item).attr(this.settings.attrdecimals),
					'duration': $(item).attr(this.settings.attrduration),
					'delay': $(item).attr(this.settings.attrdelay),
					'direction': $(item).attr(this.settings.attrdirection),
					'runonce': $(item).attr(this.settings.attrrunonce),
					'autorun': $(item).attr(this.settings.attrautorun),
				};

				for (var x in attributes) {
					if (typeof attributes[x] !== typeof undefined && attributes[x] !== false) {
						this.keyValues[x] = this.validate(attributes[x], x);
					} else {
						if (x == 'min' || x == 'max') { this.throwError('init.checkAttributes', 'attr' + x + ' attribute not found'); return false; }
						if (x == 'decimals' && (typeof this.options.decimals === typeof undefined)) {
							this.keyValues.min = this.setValueAttributes(attributes.min);
							this.keyValues.max = this.setValueAttributes(attributes.max);
						} else {
							this.keyValues[x] = this.validate(this.settings[x], x);
						}
					}
				}
			},

			validate: function(item, name) {
				var result = item.toString().replace(' ', '').replace(',','.');
				if (name == 'direction' && (item != 'asc' && item != 'desc')) {
					this.throwError('init.validate', 'attr' + name + ' must be ASC or DESC');
					return false;
				}
				if (!$.isNumeric(result) && (name != 'direction') && (name != 'runonce') && (name != 'autorun')) {
					this.throwError('init.validate', 'attr' + name + ' is not numeric');
					return false;
				}

				if (name == 'runonce' || name == 'disableoverride' || name == 'autorun') {
					var tmp = null;
					if (item == 'true' || item == '1') tmp = true;
					if (item == 'false' || item == '0') tmp = false;
					if (tmp !== true && tmp !== false) {
						this.throwError('init.validate', 'attr' + name + ' must be true or false');
						return false;
					}
					result = tmp;
				}
				if (name == 'min' || name == 'max') this.setValueAttributes(result);
				return result;
			},

			setValueAttributes: function(val) {
				if (Math.floor(val) != val) {
					this.keyValues.isFloat = true;
					var decimalsTmp = (val.split('.')[1] || []).length;
					if (decimalsTmp > this.keyValues.decimals) this.keyValues.decimals = decimalsTmp;
				}
				return val;
			},

			isOnScreen: function(el) {
				var win = $(window);

		    var viewport = {
		        top : win.scrollTop(),
		        left : win.scrollLeft()
		    };

		    viewport.right = viewport.left + win.width();
		    viewport.bottom = viewport.top + win.height();
				var bounds = { top: $(el).offset().top, bottom: $(el).offset().bottom, right: $(el).offset().right, left: $(el).offset().left };
		    bounds.right = bounds.left + $(el).outerWidth();
		    bounds.bottom = bounds.top + $(el).outerHeight();

		    var result = (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

				if (result) {
	        if (!this.keyValues.isVisible) {
            $(window).trigger('ec-element-enter-screen', [el]);
            this.keyValues.isVisible = true;
	        }
		    } else if (this.keyValues.isVisible) {
					$(window).trigger('ec-element-leave-screen', [el]);
	        this.keyValues.isVisible = false;
		    }
		    return result;
			},

			countUp: function(target, self) {
				var min = (self.keyValues.isFloat) ? parseFloat(self.keyValues.min) : parseInt(self.keyValues.min);
				var max = (self.keyValues.isFloat) ? parseFloat(self.keyValues.max) : parseInt(self.keyValues.max);
				var delay = self.keyValues.delay;

				if (self.keyValues.direction == 'desc') {
					var tmp = min;
					min = max;
					max = tmp;
				}
				var t = setTimeout(function(){
			    $({countNum: min}).stop(true, true).animate({countNum: max}, {
			        duration: parseInt(self.keyValues.duration),
			        easing:'linear',
							start: function() {
								$(window).trigger('ec-animation-start', [target]);
								self.keyValues.isExecuting = true;
							},
			        step: function() {
			            if (!self.keyValues.isFloat) $(target).text(Math.floor(this.countNum));
			            else $(target).text(this.countNum.toFixed(self.keyValues.decimals));
			        },
			        complete: function() {
			            if (!self.keyValues.isFloat) $(target).text(Math.floor(this.countNum));
			            else $(target).text(this.countNum.toFixed(self.keyValues.decimals));
			        },
							done: function() {
								$(window).trigger('ec-animation-end', [target]);
								self.keyValues.isExecuting = false;
								self.keyValues.isExecuted = true;
							}
			    });
				}, delay);
			},

			shouldRun: function() {
				if (!this.keyValues.isExecuting && this.keyValues.autorun) {
					if ((this.keyValues.runonce && !this.keyValues.isExecuted) || !this.keyValues.runonce) return true;					
				}
				return false;
			},

			clearValues: function() {
				var text = (this.keyValues.direction == 'asc') ? this.keyValues.min : this.keyValues.max;
				if ($(this.element).text().length > 0) $(this.element).text(this.defaultText);
				if (!this.keyValues.disableOverride && !$(this.element).text()) $(this.element).text(text);
				if (this.keyValues.disableOverride && !$(this.element).text()) $(this.element).text('&nbsp;');
			},

			fire: function(el) {
				if (el === this.element && !this.keyValues.isExecuting) {
					this.keyValues.isExecuting = true;
					this.countUp(el, this);
				}
			},

			throwError: function(method, msg) {
				console.error('%cError: easyCounter.js [' + method + '] -> ' + msg, 'background: #c0392b; color: white;');
			},
			throwWarning: function(method, msg) {
				console.error('%cWarning: easyCounter.js [' + method + '] -> ' + msg, 'background: #d35400; color: white;');
			}
		} );

		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new Plugin( this, options ) );
				}
			} );
		};

		$.fn.ecfire = function() {
			if(!this.data('plugin_easyCounter')) {
				console.error('%cError: easyCounter.js [fire] -> Given element does not have easyCounter.js attached to it. Initialize first.', 'background: #c0392b; color: white;');
				return false;
			} else {
				this.data('plugin_easyCounter').fire(this[0]);
			}
		};

} )( jQuery, window, document );
