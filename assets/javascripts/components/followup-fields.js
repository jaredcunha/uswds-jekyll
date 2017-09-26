/*

  Show and hide followup fields for radio buttons and checkboxes
  Todo: we need to DRY up the code a little bit.
*/

$(document).ready(function() {
  var hidden_class = "usa-extend--hidden",
      aria_hidden_attr = "aria-hidden",
      $radio = $("input:radio"),
      $checkbox = $('input:checkbox[data-followup]'),
      $selectbox = $('select');

  var showFollowup = function(e, required) {
    console.log(required);
    e.removeAttr("aria-hidden, hidden");
    if (required == "true"){
      e.find('input, select').attr('required', 'true');
    }
  }

  var hideFollowup = function(e, required) {
    e.attr({ aria_hidden_attr: "true", hidden: ''});
    if (required == "true"){
      e.find('input, select, textarea').removeAttr('required');
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
  $selectbox.on('click focus keydown', function(){
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
