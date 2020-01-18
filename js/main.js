$(function () {
	$('[data-toggle="tooltip"]').tooltip()
	function readURL(input) {
		if (input.files && input.files[0]) {
		  var reader = new FileReader();
  
		  reader.onload = function(e) {
			$("#bgImage").css("background-image", "url(" + e.target.result + ")");
			$('#b_user_avatar').addClass("b-avatar--changed");
		  }
  
		  reader.readAsDataURL(input.files[0]);
		}
	}
	function uploadImage(img) {
		var fd = new FormData();
		var files = $(img)[0].files[0];
		fd.append('file',files);
		$.ajax({
			url: 'upload.php',
			type: 'post',
			data: fd,
			contentType: false,
			processData: false,
			success: function(response){
				if(response != 0) {
					$("#bgImage").css("background-image", "url(" + response + ")");
					$('#b_user_avatar').addClass("b-avatar--changed");
				}
				else {
					alert('Ошибка загрузки');
				}
			},
		});
	}
	$("#avatarUpload").change(function() {
		// Обновление аватара без Ajax
		readURL(this); 
		//

		// Обновление аватара c Ajax
		// uploadImage(this);
		//
		$('.b-avatar__upload').tooltip('hide');
	});
	$( ".b-avatar__cancel" ).click(function() {
		// Удаление аватара без Ajax
		$("#bgImage").css("background-image", "url(img/default_avatar.jpg)");
		$('#b_user_avatar').removeClass("b-avatar--changed");
		$("#avatarUpload").val("");
		//

		// Удаление аватара с Ajax
		// uploadImage($("#avatarUpload").data('src'));
		//
	});
})