'use strict';

var ipc = require('ipc');

ipc.on('load-revealjs', function (mdFilePath) {
	var mdSection = '<section data-markdown="' + mdFilePath + '" ';
	mdSection += 'data-separator="^\n\n\n" ';
	mdSection += 'data-separator-vertical="^\\n\\n" ';
	mdSection += 'data-separator-notes="^Note:" ';
	mdSection += 'data-charset="utf-8"></section>';
	
	document.querySelector('.slides').innerHTML = mdSection;
	document.title = mdFilePath;
	
	Reveal.initialize({

			// Display controls in the bottom right corner
			controls: true,

			// Display a presentation progress bar
			progress: true,

			// Display the page number of the current slide
			slideNumber: true,

			// Push each slide change to the browser history
			history: false,

			// Enable keyboard shortcuts for navigation
			keyboard: true,

			// Enable the slide overview mode
			overview: true,

			// Vertical centering of slides
			center: true,

			// Enables touch navigation on devices with touch input
			touch: true,

			// Loop the presentation
			loop: false,

			// Change the presentation direction to be RTL
			rtl: false,

			// Turns fragments on and off globally
			fragments: true,

			// Flags if the presentation is running in an embedded mode,
			// i.e. contained within a limited portion of the screen
			embedded: false,

			// Flags if we should show a help overlay when the questionmark
			// key is pressed
			help: true,

			// Flags if speaker notes should be visible to all viewers
			showNotes: false,

			// Number of milliseconds between automatically proceeding to the
			// next slide, disabled when set to 0, this value can be overwritten
			// by using a data-autoslide attribute on your slides
			autoSlide: 0,

			// Stop auto-sliding after user input
			autoSlideStoppable: true,

			// Enable slide navigation via mouse wheel
			mouseWheel: false,

			// Hides the address bar on mobile devices
			hideAddressBar: true,

			// Opens links in an iframe preview overlay
			previewLinks: false,

			// Transition style
			transition: 'default', // none/fade/slide/convex/concave/zoom

			// Transition speed
			transitionSpeed: 'default', // default/fast/slow

			// Transition style for full page slide backgrounds
			backgroundTransition: 'default', // none/fade/slide/convex/concave/zoom

			// Number of slides away from the current that are visible
			viewDistance: 3,

			// Parallax background image
			parallaxBackgroundImage: '', // e.g. "'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg'"

			// Parallax background size
			parallaxBackgroundSize: '', // CSS syntax, e.g. "2100px 900px"

			// Amount to move parallax background (horizontal and vertical) on slide change
			// Number, e.g. 100
			parallaxBackgroundHorizontal: '',
			parallaxBackgroundVertical: '',
			
			dependencies: [
				{ src: '../node_modules/reveal.js/lib/js/classList.js', condition: function() { return !document.body.classList; } },
				{ src: '../node_modules/reveal.js/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
				{ src: '../node_modules/reveal.js/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
				{ src: '../node_modules/reveal.js/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
				{ src: '../node_modules/reveal.js/plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
				{ src: '../node_modules/reveal.js/plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } },
				{ src: '../node_modules/reveal.js/plugin/remotes/remotes.js', async: true },
				{ src: '../node_modules/reveal.js/plugin/math/math.js', async: true }
			]
	});
});