<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Wells_Fargo_Blog
 */

?>

	</div><!-- #content -->
	<footer id="colophon" class="site-footer wrapper">
		<div class="container flexed">
			<div class="grouped-items">
				<div class="socialIcons">
					<a class="iconFacebook external-link" title="Facebook" href="https://www.facebook.com/wellsfargo"><img src="https://www01.wellsfargomedia.com/assets/images/icons/socialmedia/facebook_icon.png" alt="Facebook" /></a>
					<a class="iconLinkedIn external-link" title="LinkedIn" href="https://www.linkedin.com/company/wellsfargo"><img src="https://www01.wellsfargomedia.com/assets/images/icons/socialmedia/linkedin_icon.png" alt="LinkedIn" /></a>
					<a class="iconInstagram external-link" title="Instagram" href="https://instagram.com/wellsfargo/"><img src="https://www01.wellsfargomedia.com/assets/images/icons/socialmedia/instagram_icon.png" alt="Instagram" /></a>
					<a class="iconPinterest external-link" title="Pinterest" href="https://www.pinterest.com/wellsfargo/"><img src="https://www01.wellsfargomedia.com/assets/images/icons/socialmedia/pinterest_icon.png" alt="Pinterest" /></a>
					<a class="iconYoutube external-link" title="YouTube" href="https://www.youtube.com/user/wellsfargo"><img src="https://www01.wellsfargomedia.com/assets/images/icons/socialmedia/youtube_icon.png" alt="Youtube" /></a>
					<a class="iconTwitter external-link" title="Twitter" href="https://twitter.com/wellsfargo"><img src="https://www01.wellsfargomedia.com/assets/images/icons/socialmedia/twitter_icon.png" alt="Twitter" /></a>
					<a class="iconRSS" href="<?php bloginfo('rss2_url'); ?>" title="<?php _e('Syndicate this site using RSS'); ?>"><img src="https://www.wellsfargomedia.com/assets/images/icons/socialmedia/rss_icon.png" alt="RSS Feed" title="RSS Feed" width="30" /></a>
				</div>

				<div class="site-info">
					<a href="<?php echo esc_url( __( 'https://wellsfargo.com/', 'wells-fargo-blog' ) ); ?>"><?php printf( esc_html__( 'WellsFargo.com', 'wells-fargo-blog' ) ); ?></a>
					<span class="sep"> | </span>
					<a href="https://www.wellsfargo.com/privacy-security">Privacy,&nbsp;cookies,&nbsp;security&nbsp;&amp;&nbsp;legal</a>
					<span class="sep"> | </span>
					<a href="https://blogs.wf.com/collegeplanning">College&nbsp;Planning&nbsp;blog</a>
					<p><?php printf( esc_html__( '© 2017 Wells Fargo. All rights reserved.', 'wells-fargo-blog' ) ); ?></p>
				</div><!-- .site-info -->
			</div><!-- .grouped-items" -->
			<div class="stagecoach">
				<img src="/wp-content/uploads/2016/07/stagecoach_blk_nowords2.png" alt="Together we'll go far" width="320" />
			</div><!-- .stagecoach -->
		</div><!-- .container -->
		<div class="container contest-legal">
				<hr>

			<p>SPONSOR: Wells Fargo Bank, N.A., 3201 N. 4th Avenue, MAC N9784-010, Sioux Falls, South Dakota 57104</p>
		</div><!--contest-legal-->

			<div class="container contest-legal">
			<h4 style="color: white;">Linking To Non-Wells Fargo Websites</h4>
			<p class="ext-link-disc">‡ We provide links to external websites for convenience. Wells Fargo does not endorse and is not responsible for their content, links, privacy or securities policies.</p>
			</div>

	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>
<script type="text/javascript">

		// Add width to <BR/> tags per accessibility
		jQuery("br, hr").attr("width", "100%");

	var button = jQuery('button.menu-toggle');
	// var menuContainer = jQuery('.main-navigation');
	var menu = jQuery('.main-navigation .container');
	var mainMenu = jQuery('#primary-menu');

	button.on('click', function() {
		button.toggleClass("opened");
		if (button.hasClass("opened")) {
			// button.text("Close");
			menu.animate({right: "0"});
			mainMenu.css("display", "block");
		}
		else {
			// button.text("Menu");
			menu.animate({right: "-500px"});
		}
	});


	 jQuery(".ef_flashcard").on('click', function() {
		jQuery(this).toggleClass("flipped");
	 });

	jQuery(".ef_flashcard").on('keypress', function (evt) {
		return (evt.keyCode === 13) && jQuery(this).click();
	});
/*
	jQuery(".ef_flashcard button").on('click', function() {
		jQuery(this).parents(".ef_flashcard").addClass("flipped");
	});
*/

	jQuery("#load-more-posts_button").attr("href", "javascript:void(0);");
	jQuery(".sow-slide-nav-next a").attr("alt", "Next Slide");
	jQuery(".sow-slide-nav-prev a").attr("alt", "Previous Slide");

var slideDots = jQuery('a[data-goto]');
for (i = 0; i < slideDots.length; i++) {
	if (!jQuery(slideDots[i]).attr("alt")) {
		jQuery(slideDots[i]).attr(
			"alt",
			"Slide " + (
				parseInt(jQuery(slideDots[i]).attr("data-goto")) + 1
			)
		);
	}
}

// Set focus of next slide's content when 'Next' button is clicked
// Slightly refactored
jQuery('.sow-slide-nav.sow-slide-nav-next').on('click', function() {
	jQuery(this)
		.siblings('ul')
		.find('.cycle-slide-active')
		.find('.sow-slider-image-wrapper')
		.focus();
});
// Old, gross version
/*
jQuery('.sow-slide-nav.sow-slide-nav-next').on('click', function() {
	var currentSlide = jQuery(this).prev().find('.sow-active a').text();
	jQuery(this).siblings('ul').find('.cycle-slide-active').find('.sow-slider-image-wrapper').focus();
});
*/

jQuery("#panel-54-0-0-3, #panel-54-0-0-5").on('click', function () {
  jQuery('.ex-reveal .sow-slider-base').attr('tabindex', 0);
});

	var blogTitle = jQuery('#blog-title-desktop');
	var navMenuContainer = jQuery('#site-navigation .container');
	navMenuContainer.prepend(blogTitle);

	function popupCenter(url, title, w, h) {
		var left = (screen.width/2)-(w/2);
		var top = (screen.height/2)-(h/2);
		return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
	}

// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
//span.onclick = function() {
//    modal.style.display = "none";
//}

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//    if (event.target == modal) {
//        modal.style.display = "none";
//    }
//}
</script>

<!--Sign-up Form -->

<script type="text/javascript">

	function setgradtext(csr) {
		var cr = csr[csr.selectedIndex].value;
		//var rb = jQuery('#grad_text');
		var hs = jQuery('#highschoollist');
		var cl = jQuery('#collegelist');
		switch (cr) {
			case 'HS_STUDENT':
			case 'HS_PARENT':
			//      rb.html('High School Graduation Year:');
			hs.show();
			cl.hide();
			break;
			case 'COLL_STUDENT':
			case 'COLL_PARENT':
			//      rb.html('College Graduation Year:');
			hs.hide();
			cl.show();
			break;
		}
	}
	function returnval(tinp) {
		var len = tinp.length;
		if (typeof(len) != "undefined") {
			for (var i = 0; i < len; i++) {
				if (tinp[i].checked) {
					return tinp[i].value;
				}
			}
		}
		else {
			if (tinp.checked) {
				return tinp.value;
			}
		}
		return false;
	}
	function setform (mform) {
		var CS_EVENT = mform.CS_EVENT;
		var etype = mform.CS_TYPE_STUDENT_OR_PARENT[mform.CS_TYPE_STUDENT_OR_PARENT.selectedIndex].value;
		var csyear = mform['CS_GRADUATION_YEAR.2'][mform['CS_GRADUATION_YEAR.2'].selectedIndex].value;
		var schoolf = jQuery('#schoolf');
		schoolf.val('');
		switch (etype) {
			case 'COLL_STUDENT':
			CS_EVENT.value = '235213';
			schoolf.val('CS_COLLEGE_NAME|1|150|||Please enter a school name');
			break;
			case 'COLL_PARENT':
			CS_EVENT.value = '235212';
			schoolf.val('CS_COLLEGE_NAME|1|150|||Please enter a school name');
			break;
			case 'HS_STUDENT':
			switch (csyear) {
				case '2019':
				CS_EVENT.value = '235226';
				schoolf.val('CS_HIGHSCHOOL_NAME|1|150|||Please enter a school name');
				break;
				case '2018':
				CS_EVENT.value = '235245';
				schoolf.val('CS_HIGHSCHOOL_NAME|1|150|||Please enter a school name');
				break;
				case '2017':
				CS_EVENT.value = '235181';
				schoolf.val('CS_HIGHSCHOOL_NAME|1|150|||Please enter a school name');
				break;
				case '2016':
				CS_EVENT.value = '235243';
				schoolf.val('CS_HIGHSCHOOL_NAME|1|150|||Please enter a school name');
				break;
				default:
				CS_EVENT.value = '';
				schoolf.val('CS_HIGHSCHOOL_NAME|1|150|||Please enter a school name');
				break;
			}
			break;
			case 'HS_PARENT':
			switch (csyear) {
				case '2019':
				CS_EVENT.value = '235178';
				schoolf.val('CS_HIGHSCHOOL_NAME|1|150|||Please enter a school name');
				break;
				case '2018':
				CS_EVENT.value = '235244';
				schoolf.val('CS_HIGHSCHOOL_NAME|1|150|||Please enter a school name');
				break;
				case '2017':
				CS_EVENT.value = '235179';
				schoolf.val('CS_HIGHSCHOOL_NAME|1|150|||Please enter a school name');
				break;
				case '2016':
				CS_EVENT.value = '235242';
				schoolf.val('CS_HIGHSCHOOL_NAME|1|150|||Please enter a school name');
				break;
				default:
				CS_EVENT.value = '235703';
				schoolf.val('CS_HIGHSCHOOL_NAME|1|150|||Please enter a school name');
				break;
			}
			break;
			default:
			CS_EVENT.value = '';
			break;
		}
		//      alert (CS_EVENT.value);
		//      return false;
		return validate_year();
	}


	function validate_year() {
		var year_error = 0;
		var current_year = parseInt(new Date().getFullYear());

		if((jQuery("#CS_TYPE_STUDENT_OR_PARENT").val() == "HS_STUDENT" && parseInt(jQuery("#CS_GRADUATION_YEAR.2").val()) > current_year + 4)){
			year_error++;
		}
		else if((jQuery("#CS_TYPE_STUDENT_OR_PARENT").val() == "COLL_STUDENT" && parseInt(jQuery("#CS_GRADUATION_YEAR.2").val()) > current_year + 8)){
			year_error++;
		}

		// Commented out to remove validation of Employee checkbox
		// if(document.getElementById("EMPLOYEE").checked){
		//     year_error++;
		// }

		if(year_error > 0){
			jQuery("#year_error").removeClass("hidden");
			return false;
		}
		else {
			jQuery("#year_error").addClass("hidden");
			return true;
		}
	}

// SETUP

// Disable Submit button
jQuery('#student-form input[type="submit"]').attr('disabled', 'disabled');

// Hide counselor form
jQuery('#counselor-form').hide();

// Show counselor form and hide student form when button is clicked
jQuery('#switch-forms').on('click', function(e) { e.preventDefault(); jQuery('#student-form, #counselor-heading').hide(); jQuery('#student-form').empty(); jQuery('#counselor-form').show(); });

// Hide tooltips
jQuery('table.error_container').hide();

// LOGIC

// Show respective tooltip if person leaves input field empty
jQuery('#student-form input, #counselor-form input').on('blur', function(e) {
	if (e.target.value === '') {
		jQuery(this).closest('table.w290').find('table.error_container').show();
	}
	else {
		jQuery(this).closest('table.w290').find('table.error_container').hide();
	}
} );

function validateEmail(email) {
	var re = /^.*@.*\..*/;
	return re.test(email);
	//var re = /^(([^<>()[].,;:s@"]+(.[^<>()[].,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
	//return re.test(email);
}

function validateZip(zip) {
	var re = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
	return re.test(zip);
}

function validatePhone(phone) {
	var re = /^[+]?[(]?[0-9]{3}[)]? ?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
	return re.test(phone)
}

jQuery.fn.hasValue = function () {
  var me = jQuery(this),
	  ok = me.val();
  return !(ok === '0' || ok === '');
};


jQuery('#student-form #CS_ZIP, #counselor-form #CS_ZIP').on('blur', function(e) {
	if (!validateZip(e.target.value)) {
		jQuery(this).closest('table.w290').find('table.error_container').show().find('p').text("Please enter a valid zip code.");
	}
});

jQuery('#student-form #email1, #counselor-form #email1').on('blur', function(e) {
	if (!validateEmail(e.target.value)) {
		jQuery(this).closest('table.w290').find('table.error_container').show().find('p').text("Please enter a valid email address.");
	}
});

jQuery('#CS_TYPE_STUDENT_OR_PARENT, #CS_GRADUATION_YEAR.2, #CS_STATE').on('blur', function(e) {
	if (!jQuery(e.target).hasValue()) {
	   jQuery(this).closest('table').prev().show();
	}
	else {
		jQuery(this).closest('table').prev().hide();
	}
});


// Update confirmation email tooltip if emails don't match.
jQuery('#student-form #email2').on('blur', function(e) {
	if (e.target.value !== jQuery('#student-form #email1').val()) {
		jQuery(this).closest('table.w290').find('table.error_container').show().find('p').text("Emails do not match.");
	}  else if(!validateEmail(e.target.value)) {
		jQuery(this).closest('table.w290').find('table.error_container').show().find('p').text("Please enter a valid email address.");
	}
});
jQuery('#counselor-form #email2').on('blur', function(e) {
	if (e.target.value !== jQuery('#counselor-form #email1').val()) {
		jQuery(this).closest('table.w290').find('table.error_container').show().find('p').text("Emails do not match.");
	}  else if(!validateEmail(e.target.value)) {
		jQuery(this).closest('table.w290').find('table.error_container').show().find('p').text("Please enter a valid email address.");
	}
});


jQuery('#student-form input, #student-form select').on('change keyup', function() {
	switch (false) {
		case (validateZip(jQuery('#CS_ZIP').val())):
		case (validateEmail(jQuery('#email1').val())):
		case (validateEmail(jQuery('#email2').val())):
		case (jQuery('#email1').val() === jQuery('#email2').val()):
		case (jQuery('#CS_TYPE_STUDENT_OR_PARENT').hasValue()):
		case (jQuery('#CS_GRADUATION_YEAR.2').hasValue()):
		case (jQuery('#CS_STATE').hasValue()):
			jQuery('#student-form input[type="submit"]').attr('disabled', 'disabled');
			return false;
	}
	jQuery('#student-form input[type="submit"]').removeAttr('disabled');
});

</script>

<script>
// jQuery formatted selector to search for focusable items
var focusableElementsString = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

// store the item that has focus before opening the modal window
var focusedElementBeforeModal;

jQuery(document).ready(function() {
	jQuery('#startModal').click(function(e) {
		showModal(jQuery('#modal'));
	});
	 jQuery('#cancel').click(function(e) {
	  window.location.href="#enrollment-tile";
	 });
	jQuery('#cancelButton').click(function(e) {
		hideModal();
	});
	jQuery('#enter').click(function(e) {
		enterButtonModal();
	});
	jQuery('#modalCloseButton').click(function(e) {
		hideModal();
	});
	jQuery('#myModal').keydown(function(event) {
		trapTabKey(jQuery(this), event);
	})
	jQuery('#myModal').keydown(function(event) {
		trapEscapeKey(jQuery(this), event);
	})

});

function trapEscapeKey(obj, evt) {

	// if escape pressed
	if (evt.which == 27) {

		// get list of all children elements in given object
		var o = obj.find('*');

		// get list of focusable items
		var cancelElement;
		cancelElement = o.filter("#cancel")

		// close the modal window
		// cancelElement.click();
	window.location.href="#enrollment-tile";
		// evt.preventDefault();
	}

}

function trapTabKey(obj, evt) {

	// if tab or shift-tab pressed
	if (evt.which == 9) {

		// get list of all children elements in given object
		var o = obj.find('*');

		// get list of focusable items
		var focusableItems;
		focusableItems = o.filter(focusableElementsString).filter(':visible')

		// get currently focused item
		var focusedItem;
		focusedItem = jQuery(':focus');

		// get the number of focusable items
		var numberOfFocusableItems;
		numberOfFocusableItems = focusableItems.length

		// get the index of the currently focused item
		var focusedItemIndex;
		focusedItemIndex = focusableItems.index(focusedItem);

		if (evt.shiftKey) {
			//back tab
			// if focused on first item and user preses back-tab, go to the last focusable item
			if (focusedItemIndex == 0) {
				focusableItems.get(numberOfFocusableItems - 1).focus();
				evt.preventDefault();
			}

		} else {
			//forward tab
			// if focused on the last item and user preses tab, go to the first focusable item
			if (focusedItemIndex == numberOfFocusableItems - 1) {
				focusableItems.get(0).focus();
				evt.preventDefault();
			}
		}
	}

}

function setInitialFocusModal(obj) {
	// get list of all children elements in given object
	var o = obj.find('*');

	// set focus to first focusable item
	var focusableItems;
	focusableItems = o.filter(focusableElementsString).filter(':visible').first().focus();

}

function enterButtonModal() {
	// BEGIN logic for executing the Enter button action for the modal window
	alert('form submitted');
	// END logic for executing the Enter button action for the modal window
	hideModal();
}

function setFocusToFirstItemInModal(obj){
	// get list of all children elements in given object
	var o = obj.find('*');

	// set the focus to the first keyboard focusable item
	o.filter(focusableElementsString).filter(':visible').first().focus();
}

function showModal(obj) {
	jQuery('#mainPage').attr('aria-hidden', 'true'); // mark the main page as hidden
	jQuery('#modalOverlay').css('display', 'block'); // insert an overlay to prevent clicking and make a visual change to indicate the main apge is not available
	jQuery('#modal').css('display', 'block'); // make the modal window visible
	jQuery('#modal').attr('aria-hidden', 'false'); // mark the modal window as visible
	jQuery('body').addClass('modal-shown');

	// attach a listener to redirect the tab to the modal window if the user somehow gets out of the modal window
	jQuery('body').on('focusin','#mainPage',function() {
		setFocusToFirstItemInModal(jQuery('#modal'));
	})

	// save current focus
	focusedElementBeforeModal = jQuery(':focus');

	setFocusToFirstItemInModal(obj);
}

function hideModal() {
	jQuery('#modalOverlay').css('display', 'none'); // remove the overlay in order to make the main screen available again
	jQuery('#modal').css('display', 'none'); // hide the modal window
	jQuery('#modal').attr('aria-hidden', 'true'); // mark the modal window as hidden
	jQuery('#mainPage').attr('aria-hidden', 'false'); // mark the main page as visible
	jQuery('body').removeClass('modal-shown');

	// remove the listener which redirects tab keys in the main content area to the modal
	jQuery('body').off('focusin','#mainPage');

	// set focus back to element that had it before the modal was opened
	focusedElementBeforeModal.focus();
}
</script>



<!--<script src="http://10.94.69.182/tempkit/0/scripts/expander.js"></script>-->
<!--<script src="http://10.94.69.182/tempkit/0/scripts/grocer.js"></script>-->
<!--<script src="http://10.94.69.182/tempkit/0/scripts/revealer.js"></script>-->
<!--<script src="http://10.94.69.182/tempkit/0/scripts/modal.js"></script>-->
<!--<script src="http://10.94.69.182/tempkit/0/scripts/dialog.js"></script>-->
<!--<script src="http://10.94.211.163/tempkit/0/scripts/autoreveal.js"></script>-->

<script type="text/javascript">

(function (factory) {
  'use strict';
  var V = '0.1.0';
  var W = (W && W.window || window);

  if (!(typeof define === 'function' && define.amd)) {
	console.warn('shim:autoreveal.js', V);
	W.autoreveal = factory(jQuery);
  } else {
	console.info('AMD:autoreveal.js', V);
	define(['jquery'], factory);
  }
}(function ($) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});

  // - - - - - - - - - - - - - - - - - -

  return function (Reveal) {
	var qty, qel, util;

	if (!Reveal) {
	  Reveal = W._rev; // if not passed in look to global Reveal instance
	  C.warn('autoreveal', 'no Reveal passed, trying global space');
	}

	util = {
	  parseSearch: function () { // turn search string into object
		var obj = {};
		var qry = W.location.search.slice(1).split('&');

		qry.forEach(function (seg) {
		  seg = seg.split('=');
		  if (seg[0]) { // must have key (optional val)
			obj[seg[0]] = seg[1];
		  }
		});
		return obj;
	  },
	  getNextMultiple: function (base, step) { // first higher multiple
		var high = base;
		if (step) {
		  high = Math.ceil(base / step) * step;
		}
		return high;
	  },
	  revealPast: function (Rev, num) { // assume Reveal instance
		var tot = Rev.total();
		var step = Rev.inc();
		var shown = Rev.showing();

		if (num > shown) {
		  var top = util.getNextMultiple(num, step);

		  num = (num ? top : tot) - shown; // without a count, show all
		  Rev.next(num);
		}
	  },
	  expandSoon: function (ele) { // wait for reveals a moment
		setTimeout(function () {
		  $(ele).find('.ex-target').click();
		}, 500);
	  },
	};

	qel = $('#' + util.parseSearch().id); // query for target element
	qty = Number(qel.data('ExpanderIndex')) + 1; // turn index into quantity

	if (qty) {
	  util.revealPast(Reveal, qty);
	  util.expandSoon(qel);
	}
  };
}));


</script>

<script>

(function($) {
   var W = (W && W.window || window);
   W._lo = W.Loader(3e3, /* 3 sec buffer */
	 [function () {
	   // var els = $('div.external-blog').children();
	   var host = 'https://blogs.wf.com/collegeplanning';
	   // var filters = '?filter[posts_per_page]=4';
	   // W._groc = W.Grocer(host).fillerUp(filters, els);
	   var els = $('div.external-blog article');
	   var i = 1;
	   var filters = '?per_page=1&page=';
	   $.each(els, function() {
		 W.Grocer(host).fillerUp(filters + i, $(this));
		 i++;
	   });
	 }, function () {
	   W._mod = W.Modal.init('#main div.modal', {
		   force: true
		 });
	   W._dia = W.Dialog.bind('.external-link');
	 }, function () {
	   W._exp = W.Expander(
		 '#grid-preview .ex-init',
		 '#grid-content .widget:not(:first-child)', {
		   align: 'top'
		 }
	   );
	 }, function () {
	   W._rev = W.Revealer(
		 '.load_more-button', '#grid-preview .widget', 7
	   );
	// W._lo.start();
		setTimeout(function () {
		  W.autoreveal(W._rev);
		  // W._lo.stop();
		}, 2222);
	 }, function() {
		$('.so-panel[data-index="0"] video.sow-background-element').get(0).play();
	 }]
   );
})(jQuery);

</script>

<script>
(function($) {
	function checkIE() {

		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");

		if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11./)) {
			$('html').addClass('uagent-ie');
		}

		return false;
	}

	checkIE();

})(jQuery);
</script>

<script>
(function($) {
	$('.panel-widget-style').on('keyup', function(e) {
		var panel = $(this).parent('.so-panel');
		if (e.which == 13 && panel.hasClass('ex-panded'))
			$(this).parent('.so-panel').find('.ex-reveal').focus();
	});

	$(document).on('keydown', function(e) {
		$('body').addClass('key-nav');
	}).on('mousedown', function(e) {
		$('body').removeClass('key-nav');
	});

	// external links management
	$('.ext-link').each(function() {
		var elem = $(this);
		var cont = elem.html();
		if (cont == "" || cont.indexOf('img') >= 0)
			elem.addClass('no-icon');
	});

	if ($('.ext-link').length > 0)
		$('.ext-link-disc').show();
	else
		$('.ext-link-disc').hide();

	$('.abh_social div:nth-of-type(1), .addtoany_share_save_container .addtoany_header').addClass('show-ext-link-icon');

	// HTML Tables
	$('.show-tbl-link').click(function(e) {
		e.preventDefault();
		var target1 = $(this).attr('data-target-1');
		var target2 = $(this).attr('data-target-2');
		$(target1).slideToggle();
		$(target2).slideToggle();
		$(this).closest('.so-panel').css('margin-top', 0);
	});

	$('.transparent-box > a.tile-title').on('click', function(e) {
		e.preventDefault();
	});
})(jQuery);
</script>

</body>
</html>
