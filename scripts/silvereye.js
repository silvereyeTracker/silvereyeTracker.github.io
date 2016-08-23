// ********************************************************************
//
// Javascript for KKLabs' SilverEye Web
// Author: SybiL
//
// ********************************************************************

// UI framework Generators
var wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 0,
    mobile: true,
    live: true
});
wow.init();

// UI click event

// Check the form required field
function checkRequired() {
	var userName = $('#userName').val();
	var userEmail = $('#userEmail').val();
	var userMessage = $('#userMessage').val();

 	if(userName=="") {
 		$('#alertBox01').fadeIn({
 			animation: 'fade up',
 		});
		// alert('Please enter your name.');
		$('#alertBox01').fadeOut(3000);
		$('#alertBox02').hide();
		$('#alertBox03').hide();
		$('#alertBox04').hide();
		$('#alertBox05').hide();
		$('#alertBox06').hide();

		return false;
	}

	else if(userEmail=="") {
		$('#alertBox02').fadeIn({
 			animation: 'fade up',
 		});
		// alert('Please enter your Email.');

		$('#alertBox01').hide();
		$('#alertBox02').fadeOut(3000);
		$('#alertBox03').hide();
		$('#alertBox04').hide();
		$('#alertBox05').hide();
		$('#alertBox06').hide();

		return false;
	}

	else if(userMessage=="") {
		$('#alertBox03').fadeIn({
 			animation: 'fade up',
 		});
		// alert('Please enter your Message.');

		$('#alertBox01').hide();
		$('#alertBox02').hide();
		$('#alertBox03').fadeOut(3000);
		$('#alertBox04').hide();
		$('#alertBox05').hide();
		$('#alertBox06').hide();

		return false;
	}

	else 
		checkEmail();
}

function checkEmail() {
	var userEmail = $('#userEmail').val();
	var index = userEmail.indexOf('@', 0);	

	//must including @
	if (index==-1){
		$('#alertBox04').fadeIn({
 			animation: 'fade up',
 		});
		// alert('Email must has "@".');

		$('#alertBox01').hide();
		$('#alertBox02').hide();
		$('#alertBox03').hide();
		$('#alertBox04').fadeOut(3000);
		$('#alertBox05').hide();
		$('#alertBox06').hide();

		return false;
	}

	//before@ must not empty string
	else if (index==0){
		$('#alertBox05').fadeIn({
 			animation: 'fade up',
 		});
		// alert('Before@ must not empty string.');

		$('#alertBox01').hide();
		$('#alertBox02').hide();
		$('#alertBox03').hide();
		$('#alertBox04').hide();
		$('#alertBox05').fadeOut(3000);
		$('#alertBox06').hide();

		return false;
	}

	//@after must not empty string
	else if (index==userEmail.length-1){
		$('#alertBox06').fadeIn({
 			animation: 'fade up',
 		});
		// alert('@after must not empty string.');

		$('#alertBox01').hide();
		$('#alertBox02').hide();
		$('#alertBox03').hide();
		$('#alertBox04').hide();
		$('#alertBox05').hide();
		$('#alertBox06').fadeOut(3000);

		return false;
	}

	else

		$('#alertBox01').hide();
		$('#alertBox02').hide();
		$('#alertBox03').hide();
		$('#alertBox04').hide();
		$('#alertBox05').hide();
		$('#alertBox06').hide();

		sendMailMandrill();
	
}

// Submit the form mandrill app service (using AJAX).
function sendMailMandrill() {
	
	$.ajax({
	  	
	  	type: "POST",
	  	url: "https://mandrillapp.com/api/1.0/messages/send.json",
	  	
	  	data: {
		    'key': 'G8pvlL11pM97gEAph_2F8w',
		    'message': {
		    'from_email': $('#userEmail').val(),
		    'to': [
		          {
		            'email': 'service@kkbooks.tw',
		            'name': 'SilverEye',
		            'type': 'to'
		          }
		        ],
		    'autotext': 'true',
		    'subject': 'SilverEye Inquiry'+'- '+$("#userName").val(),
		    'html': 'My Company:'+' '+$('#userCompany').val()+'<br/><br/>'+$('#userMessage').val()
		    }
	  	}

	}).done(function(response) {
	   console.log(response); 

	   // alert('mail sent');
	   $('#alertBox07').transition('fade up').transition('fade up',2000);

	   		//$(formMessage).removeClass('error');
	 		// $(formMessage).addClass('success');

	 		// Clear the form.
	 		$('#userName').val('');
	 		$('#userCompany').val('');
	 		$('#userEmail').val('');
	 		$('#userMessage').val('');


	});	

	closeForm();

}


// UI click effect 
function openFormUiSizeChange() {

	// for desktop layout
	$("#contactArea").css("height","700px");
	$(".rowZ").css("height","700px");
	$("#footerArea").css("top","-28%");


	// for iPad & mobile layout 
	detectedWidth = $(window).width();
    detectedHeight = $(window).height();

    if ( detectedWidth <= 414)
    {	
		$("#footerArea").css("top","-20%");
    }

}

function closeFormUiSizeChange() {

	// for desktop layout
	$("#contactArea").css("height","280px");
	$(".rowZ").css("height","280px");
	$("#footerArea").css("top","-11%");

	// for iPad & mobile layout 
	detectedWidth = $(window).width();
    detectedHeight = $(window).height();

    if ( detectedWidth <= 414)
    {	
		$("#footerArea").css("top","-18%");
    }

}

function openForm() {

	openFormUiSizeChange();

	$(".contactStuff").transition({
		animation: 'horizontal flip',
		duration   : '0.01s'
	});

	$(".contactStuff").hide();

	$(".contactForm").transition('vertical flip');
	$(".formBorder").transition('drop');
	
}

function closeForm() {

	
	
	$(".contactStuff").transition('horizontal flip');
	$(".contactStuff").show();

	$(".contactForm").transition('vertical flip');
	$(".formBorder").transition('drop');

	closeFormUiSizeChange();

}

function scrollToForm() {
	
	var timerClick=null;
	timerClick=window.setTimeout("openForm()",500);

}

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {

    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  });
});