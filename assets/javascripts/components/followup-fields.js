/*

  Show and hide followup fields for radio buttons and checkboxes
*/

$(document).ready(function() {
  var hidden_class = "usa-extend--hidden";
      $radio = $("input:radio");
      $checkbox = $('input:checkbox[data-followup]'),
      $selectbox = $('select');

  var showFollowup = function(e, required) {
    console.log(required);
    e.removeAttr("aria-hidden").removeClass(hidden_class);
    if (required == "true"){
      e.find('input, select').attr('required', 'true');
    }
  }

  var hideFollowup = function(e, required) {
    e.attr("aria-hidden", "true").addClass(hidden_class);
    if (required == "true"){
      e.find('input, select').removeAttr('required');
    }
  };

  // Handle Radio Buttons
  $radio.change(function () {
    var name = $(this).attr("name");
    var $el = $('input:radio[name="'+ name +'"]');

    $el.each(function(){
      var target = $(this).attr('data-followup'),
          required = $(this).attr('data-followup-required');
      if ($(this).is(":checked")) {
        showFollowup($('#' + target), required);
      }
      else {
        hideFollowup($('#' + target), required);
      }
    });
  });

  // Handle Checkboxes
  $checkbox.change(function(){
    var target = $(this).attr('data-followup'),
        required = $(this).attr('data-followup-required');
    if ($(this).is(":checked")) {
      showFollowup($('#' + target), required);
    }
    else {
      hideFollowup($('#' + target), required);
    }
  });

  // Handle Selct Boxes
  var previous;
  $selectbox.on('click focus', function(){
    previous = $(this).find(':selected').attr('data-followup'),
    previous_required = $(this).find(':selected').attr('data-followup-required');
  }).change(function(){
    console.log(previous)
    var selected_val = $(this).find('option[data-followup]:selected').val();
    var target = $(this).find(':selected').attr('data-followup'),
        required = $(this).find(':selected').attr('data-followup-required');

    if ($(this).find(':selected').val() == selected_val) {
      showFollowup($('#' + target), required);
    }
    if (selected_val != previous) {
      hideFollowup($('#' + previous), previous_required);
    }
  });

});
