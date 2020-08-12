function selector_mode(element) {
	let val = django.jQuery(element).val()

	parent = django.jQuery(django.jQuery(element).closest('tr'))

	field1 = parent.find('.django_item_form_field1')
	field2 = parent.find('.django_item_form_field2')

	if (val == 2) {

		django.jQuery(field1).attr('rows', 10)
		django.jQuery(field2).attr('rows', 10)

	}

	if (val == 1) {

		django.jQuery(field1).attr('rows', 1)
		django.jQuery(field2).attr('rows', 1)

	}
}

window.onload = function() {

	django.jQuery(document).find('.django_item_form_mode').each(function(_, element){
		selector_mode(element)
	})
}

