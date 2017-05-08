/*

  Show and hide followup fields for radio buttons and checkboxes
*/

$(document).ready(function() {
  var hidden_class = "usa-extend--hidden";


  $("input:radio").change(function () {


    // Find other radios that match the set
    // Find if any have a followup trigger
    // Determine if the follupw is checked or unchecked
    // Run function for the followup.


    var name = $(this).attr("name");
    var $el = $('input:radio[name="'+ name +'"]');

    $el.each(function(){
      $(this).addClass('d');
      var target = $(this).attr('data-followup');
      if ($(this).is(":checked")) {
        $('#' + target).removeAttr("aria-hidden").removeClass(hidden_class);
      }
      else {
        $('#' + target).attr("aria-hidden", "true").addClass(hidden_class);
      }
    });


  });

});
