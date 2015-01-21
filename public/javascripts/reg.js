(function(window, document, undefined) {

	function register(info) {
		console.log(info)
		return $.ajax({
			type: 'POST',
			url: 'signup',
			data: {
				info: JSON.stringify(info)
			},
			processData: true,
			dataType: 'json',
		
		})
	}

	$('input[type=file]').on('change', function(e){
		files = e.target.files;
		$(".imgval").val(files[0].name)
	});

	 $('#register').submit(function(e) {
		e.preventDefault();
		$(".btn-load-ico").css({'display':'inline'})
		var file = document.getElementById("imglol").files[0],
			firstname = $(".firstname").val();
			lastname  = $(".lastname").val();
			email	   = $(".email").val();
			password  = $(".password").val();
			passwordconfirm = $(".confpassword").val();
			password = passwordconfirm ? true : (function() {
				$(".notice").text("Passwords don't match, man");
				return false;

			}());

			info = {
				firstname: firstname,
				lastname: lastname,
				email: email,
				password: password,
			}
			//need to seperately upload image (fuck)
	        $(this).ajaxSubmit({
	            error: function(xhr) {
	                console.log('Error: ' + xhr.status);
	            },
	            success: function(res) {
	            $(".btn-load-ico").css({'display':'none'})
				    if (res !== true) {
		         		if (res.emailTaken) {
		         			$(".notice").text("email already taken");
		         			$(".email").addClass(".has-error");
		         		} 
		         		else if (res.usernameTaken) {
		         			$(".notice").text("Handle already taken");
		         			$(".handle").addClass(".has-error")
		         		}	
		            } else {
		            	window.location.href="/login"
		            }
		        }
	    	});
			return false;
    });   
}(this,document));
