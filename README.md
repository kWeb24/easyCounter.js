# easyCounter.js

EasyCounter.js is a library to make working with animated counters easier. It provides lightweight API that allows you to easily create and manage counters on your webpage. Requires jQuery.

**For running exampels and documentation visit this page** [easyCounter.js docs and examples](http://kamilweber.pl/bundle/easycounterjs/example)

With this library you can easily attach counter to any element on your website and fire it when user scroll to the target element. All settings are available via HTML custom attributes so you could simply start your journey with:

```html
<div class="easycounter" ec-min="0" ec-max="123456789" ec-duration="2000"></div>
```

and then:

```javascript
$('.easycounter').easyCounter({});
```

# Options

EasyCounter.js comes with many configurable options to let you manage your counters both globaly and localy. Before you start you have to know that the html inline attributes like `ec-duration` will override the same value specified at initialization but only in their own element.

## Available initialization options

Library may be initialized with options shown below:

```javascript
$('.easycounter').easyCounter({
		'duration': 1000,
		'delay': 500,
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
	});
```

* `duration` - Duration of animation in miliseconds,
* `delay` - Time in miliseconds that must elapse before animation starts after element in in viewport.
* `decimals` - Integer number of decimal places to show in animation. Note: Library by default if not set both decimals and inline decimal attribute will take highest decimal places from `attrmin` and `attrmax`
* `runonce` - Have to be true or false. By defaults animation starts each time after element gets into viewport. If set to true, animation fire only once and stay in complete state.
* `disableoverride` - Have to be true or false. Define if the library can override default element text before start or not. Note: Library by default overrides default element text with `attrmin` value so when delay is set start value will be visible. After set to true library will not change element text untill animation starts.
* `autorun` - Have to be true or false. If false counters will not start automatically and have to be fired using `$(target).ecfire()` method.
* `direction` - Must be 'asc' or 'desc'. Defines animation direction, for 'asc' - count from lowest to highest val, for 'desc' - count from highest to lowest.
* `attrmin` - HTML inline attribute for minimal animation value. Default `ec-min` Overrides initialization options.
* `attrmax` - HTML inline attribute for maximal animation value. Default `ec-max` Overrides initialization options.
* `attrdecimals` - HTML inline attribute for decimal places. Default `ec-decimals` Overrides initialization options.
* `attrduration` - HTML inline attribute for duration time. Default `ec-duration` Overrides initialization options.
* `attrdelay` - HTML inline attribute for animation delay time. Default `ec-delay` Overrides initialization options.
* `attrdirection` - HTML inline attribute for animation direction. Default `ec-direction` Overrides initialization options.
* `attrrunonce` - HTML inline attribute for runOnce flag. Default 1 Overrides initialization options.
* `attrdisableoverride` - HTML inline attribute for disableOverride flag. Default `ec-disable-override` Overrides initialization options.
* `attrautorun` - HTML inline attribute for autorun flag. Default `ec-auto-run` Overrides initialization options.

# Events

EasyCounter.js fires events each time when element isVisible flag or animation state change. Available events:

```javascript
	$(window).on( "ec-element-enter-screen", {}, function(event, el) {
	});

	$(window).on( "ec-element-leave-screen", {}, function(event, el) {
	});

	$(window).on( "ec-animation-start", {}, function(event, el) {
	});

	$(window).on( "ec-animation-end", {}, function(event, el) {
	});
```

* `ec-element-enter-screen` - Fires once when element enters viewport. Element object given,
* `ec-element-leave-screen` - Fires once when element enters viewport. Element object given,
* `ec-animation-start` - Fires once when animation starts. After delay (if set). Element object given,
* `ec-animation-start` - Fires once when animation is done. Element object given,

# Examples

For running exampels and documentation visit this page [easyCounter.js docs and examples](http://kamilweber.pl/bundle/easycounterjs/example)

## Easy start

Setup basic counter fired when user scrolls to element

```html
	<div class="easycounter" ec-min="0" ec-max="15000"></div>
	<script type="text/javascript" src="../src/easyCounter.js"></script>
	<script>
		$('.easycounter').easyCounter({});
	</script>
```

## Values going back

Same as previous example but counter runs backward

```html
	<div class="easycounter" ec-min="0" ec-max="15000" ec-direction="desc"></div>
	<script type="text/javascript" src="../src/easyCounter.js"></script>
	<script>
		$('.easycounter').easyCounter({});
	</script>
```

## Decimals taken from element

Same as first example but with decimal places

```html
	<div class="easycounter" ec-min="0" ec-max="1000.1234"></div>
	<script type="text/javascript" src="../src/easyCounter.js"></script>
	<script>
		$('.easycounter').easyCounter({});
	</script>
```

## Decimals override by inline attribute

Same as previous example but with decimal places set in attribute

```html
	<div class="easycounter" ec-min="0" ec-max="1000.1234"></div>
	<script type="text/javascript" src="../src/easyCounter.js"></script>
	<script>
		$('.easycounter').easyCounter({});
	</script>
```

## Run once with delay

Same as first example but fire only once with 5 seconds delay

```html
	<div class="easycounter" ec-min="0" ec-max="15000" ec-run-once="true" ec-delay="5000"></div>
	<script type="text/javascript" src="../src/easyCounter.js"></script>
	<script>
		$('.easycounter').easyCounter({});
	</script>
```

## Disabled autorun

Same as first example but counter will not start automatically, fired with 'fire' button

```html
	<div id="manualfire" class="easycounter" ec-min="0" ec-max="1000" ec-auto-run="false"></div>
	<button onclick="run('#manualfire')">Fire!</button>
	<script type="text/javascript" src="../src/easyCounter.js"></script>
	<script>
		$('.easycounter').easyCounter({});
		function run(el) {
			$(el).ecfire();
		}
	</script>
```

# License

[MIT License](https://opensource.org/licenses/mit-license.html)

Copyright 2017 [Kamil Weber](http://kamilweber.pl/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
