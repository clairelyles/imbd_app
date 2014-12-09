$(function() {

// ---------------------- Ajax Delete Button ---------------------- //

	$('.deleteFavorite').on('click',function(event) {
		// preventDefault from linking to a href = "#"
		event.preventDefault();
		console.log("Testing...");

		// alert($(this).data('id'));

		var thisDeleteButton = $(this);

		$.ajax({
			url:"/watchlist/"+thisDeleteButton.data('id'),
			type:"DELETE",
			success: function(result) {
				thisDeleteButton.closest('.deleteFavoriteWrapper').fadeOut("slow", function() {
					$(this).remove();
				})
			}
		})
	})

// ---------------------- Ajax Add Button ---------------------- //

	$('.addFavorite').click(function(event) {
		console.log("Clicked it");
		event.preventDefault();

		var thisAddButton = $(this);
		var addButtonImbd = $(this).data("imbd_code");
		var addButtonTitle = $(this).data("title");
		var addButtonYear = $(this).data("year");

		console.log(addButtonImbd);
		console.log(addButtonTitle);
		console.log(addButtonYear);

		$.post("/"+addButtonImbd, {
			title: addButtonTitle,
			year: addButtonYear, 
			imdb_code: addButtonImbd
		}, function(data){
			thisAddButton.closest('.addButtonWrapper').remove()
			alert("It's been added!");
		})
	})
})