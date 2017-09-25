$(document).ready(function() {
  filterContent = function(key,selected_filter) {
    $('*['+ key +']').each(function(){
      filter_list = $.makeArray($('*['+ key +']').attr(key).split(" "));
      console.log(selected_filter);
      if (filter_list.indexOf(eval(selected_filter)) >= 0)  {
        /* Do Nothing */
      }
      else {
        $(this).remove();
      }
    });
  }

  jQuery.extend(jQuery.expr[':'], {
    attrStartsWith: function (el, _, b) {
        for (var i = 0, atts = el.attributes, n = atts.length; i < n; i++) {
            if(atts[i].nodeName.toLowerCase().indexOf(b[3].toLowerCase()) === 0) {
                return true;
            }
        }

        return false;
    }
  });

  var yourArray = [];
  $('*:attrStartsWith("data-filter-")').each(function(){
    var e = $(this).prop('outerHTML')
    var start_pos = e.indexOf("data-filter-") + 12;
    var end_pos = e.indexOf('=',start_pos);
    var key_to_filter = e.substring(start_pos,end_pos);

    var data_attribute = "data-filter-" + key_to_filter;
    var data_attribute_value = $(this).attr("data-filter-" + key_to_filter);

    yourArray.push(data_attribute);
  });

  var uniqueNames = [];
  $.each(yourArray, function(i, el){
      if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
  });


  $.each(uniqueNames, function(i, el) {
    var key_to_filter = el.replace('data-filter-','');
    var data_attribute_value = key_to_filter;

    console.log(el, key_to_filter);
    filterContent(el, data_attribute_value);
  });




});
