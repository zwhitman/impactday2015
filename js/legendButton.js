$("#legendButton").click(function () {
    $("#legend").toggle("medium", function () {
        $("#legendButton").html(function (_, html) {
            return $.trim(html) == '<i class="fa fa-minus-circle"></i>' ? '<i class="fa fa-plus-circle"></i>' : '<i class="fa fa-minus-circle"></i>';
        });
    });
});	
