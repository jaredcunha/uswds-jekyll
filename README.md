# USWDS + Jekyll

This is a boilerplate for using **Version 1.4.1** of the [U.S. Web Design Standards](https://standards.usa.gov/) to build static websites and prototypes with [Jekyll](https://jekyllrb.com/).

Before you begin here, get acquianted with documentation for both the U.S. Web Design Standards and Jeykll.
- [USWDS Documentation](https://standards.usa.gov/getting-started/)
- [Jekyll Documentation](https://jekyllrb.com/docs/home/)

The U.S. Web Design Standards’ entire feature set is included. You can find code snippets to copy and paste in:

```
assets/uswds/html
```

For Jekyll, there’s not much here since it’s up to you to build this out as you see fit. Only the example pages and posts have been removed.

## Dependencies (Coming Soon)
You will need to install the following before you get started:
- [Jekyll](https://jekyllrb.com/docs/installation/)
- [Sass](http://sass-lang.com/install)

## CSS
Using Sass to write your CSS is highly recommended. Your main CSS file is `assets/stylesheets/application.scss` Do not write any CSS selectors on this page. Instead, link to them with `@import` statements.

The U.S. Web Design Standards CSS files are located in `assets/uswds/stylesheets`. You may use any Sass variables from the U.S. Web Design Standards in your project SCSS. To get familiar with the variables, you can read them in `assets/uswds/stylesheets/core/_variables.scss`

Your project CSS is located in  `assets/stylesheets/`. The `core`, `elements`, and `components` directories have been added to mirror U.S. Web Design Standards structure, but you may use whatever system you are comfortable with.

## Javascript
jQuery and the full USWDS JS file has been included. This can probably be improved a bit since both of these libraries will add significant weight and performance hits to your page. All JavaScript are imported and concatinated into a single file, `assets/javascripts/application.js`. Importants are handled with Jekyll’s `include_relative` method. Place your scripts in `assets/javascripts/scripts` and link to them in `assets/javascripts/application.js`.

## How to run
Using the command line, the following commands should be able to get you up and running. You will need to clone this repo, remove `origin` as a remote branch, and run on local host.

```
$ git clone git@github.com:usds/uswds-jekyll.git
$ cd uswds-jekyll
$ git remote remove origin //Only if you want to remove connection from this branch.
$ bundle install
$ bundle exec jekyll serve
```

When the application is running, you can view the site in the browser at http://localhost:4000

## Form Prototyping

When submitting the form, data will be pushed to session storage and pulled back immediate so that based on answers, you can link to different pages or perform other kinds of actions.

To do this, you'll need to have this snippet at the bottom of each page:

```
<script>
  $(document).ready(function() {
    $('form').on('submit', function() {
      if (!checkValidityIfSupported($('form').get(0))) {
        return false;
      }
      else {
        nextPage("next-page.html");
        return false;
      }
    });
  });
</script>
```

When we run `updateStoredData()`, we are taking the `value` entered in any type of input and placing that in the session storage as a key/value pair. The **key** is saved as a variable. So lets you want to drive people named "Bob" to one page and everyone else to another page. You would need to have this input in your form:

```
<input id="first_name" name="first_name" type="text" >
```

Then in the `<script>` at the bottom you can do:
```
<script>
  $(document).ready(function() {
    $('form').on('submit', function() {
      if (!checkValidityIfSupported($('form').get(0))) {
        return false;
      }
      else {
        updateStoredData();

        if (first_name == "Bob") {
          nextPage("bob.html");
        }
        else {
          nextPage("others.html");
        }
        return false;
      }
    });
  });
</script>
```

### Follow-up questions
In some forms, you may want to ask an inline follow-up if a user selects a specific answer. This is enabled on radios, select boxes, and checkboxes using a mix of `data` attributes and `id` attributes.

On the form element that triggers a follow-up, use the `data-followup` attribute with a value that corresponds to the `id` of element you wish toggle on and off. The follow-up can appear in any part of the DOM and can include any type of content.

To make form elements required in the follow-up, place `data-followup-required="true"` on the element that triggers the follow-up to appear.

```
<input id="other" type="radio" name="historical_figure" value="Other" data-followup="historical-figure-followup" data-followup-required="true" required>
<label for="other">Other</label>
<div id="historical-figure-followup" hidden aria-hidden="true">
    <label for="other-hero">Specify</label>
    <input type="text" id="other-hero" >
</div>
```

#### Select Boxes
For Select boxes, put the `data-followup` on the `<option>`.

```
<label for="additional_field">Additional Field?</label>
<select name="additional_field" id="additional_field">
  <option value=""></option>
  <option value="no">No</option>
  <option value="yes" data-followup="additional_field_q">Yes</option>
</select>
<div id="additional_field_q" hidden aria-hidden="true">
    <label for="g">What is it?</label>
    <input type="text" id="g" >
</div>
```

### Printing Form Data
Form data can be printed in either inputs or HTML elements using the `data-print` attribute. The value of that attribute should equal the ID of the corresponding input. So, if we wanted to greet Bob on his page, we would write:

```
<p>Welcome to your very own page, <span data-print="first_name"></span><p>
```

If you were persisting data in a form, you can add the `data-print` attribute to an input. The ID doesn't have to match:
```
<input id="first_name" name="first_name" type="text" data-print="first_name">
```

[This is work in progress. See review.html for all currently available printing options. ]

### URL Parameters
Any page loaded with a URL parameter or parameters will be stored as key/value pairs in `sessionStorage`. For example, when you visit a page as `http://site.com?foo=bar`, your sessionStorage will be updated with `foo: "bar"` to use later.

### Filtering Content on the page
Filtering content will allow you to handle multiple states on a single page. For example, let's say you have a page that would show some content that is conditional upon some stored data. You can use the data attribute `data-filter-[STORED_ID]="[STORED_ID_VALUE]"` to keep it on the page. If the `STORED_ID_VALUE` attribute does not match what is in your session data, the element will be removed from the DOM.

If filtering content, **use underscores as separators, note hyphens**

```
// Session Data { foo: "bar" }

<div data-filter-foo="bar">     // Element stays on page
<div data-filter-foo="baz">     // Element is removed
<div data-filter-foo="bar baz"> // Element stays on page
```

This system works well with the URL parameters above.
