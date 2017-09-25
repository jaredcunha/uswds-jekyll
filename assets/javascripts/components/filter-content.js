/*
  This function will search for elements with
  attribute of data-filter-*, with * corresponding to an
  item stored in sessionStorage.

  For example, if first_name => "Larry"

  <div data-filter-first_name="Bob Ricky"> is removed
  <div data-filter-first_name="Larry Ricky"> is preserved
*/

$(document).ready(function() {
  runPageFilters = function(){
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

    /*
      This function will traverse the DOM for elements by
      attribute string. This will be used next to find
      anything with 'data-filter-'
    */

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


    /* Finds all data-filter-* elements on the page */
    var all_data_filters = [];
    $('*:attrStartsWith("data-filter-")').each(function(){
      var e = $(this).prop('outerHTML')
      var start_pos = e.indexOf("data-filter-") + 12;
      var end_pos = e.indexOf('=',start_pos);
      var filter_name = e.substring(start_pos,end_pos);

      var data_attribute = "data-filter-" + filter_name;
      var data_attribute_value = $(this).attr("data-filter-" + filter_name);

      all_data_filters.push(data_attribute);
    });

    var unique_data_filters = [];
    $.each(all_data_filters, function(i, el){
        if($.inArray(el, unique_data_filters) === -1) unique_data_filters.push(el);
    });


    $.each(unique_data_filters, function(i, el) {
      var filter_name = el.replace('data-filter-','');
      filterContent(el, filter_name);
    });

  }


});
