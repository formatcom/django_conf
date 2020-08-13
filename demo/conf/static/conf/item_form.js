function populateSelectField(field, choices) {
	django.jQuery(field).empty()

	django.jQuery.each(choices, function(_, option) {
		django.jQuery(field).append(django.jQuery("<option></option>").attr("value", option[0]).text(option[1]));
	});
}

function selector_mode(element) {
	let val = django.jQuery(element).val()

	parent = django.jQuery(django.jQuery(element).closest('tr'))

	field1 = parent.find('.django_item_form_field1')
	field2 = parent.find('.django_item_form_field2')

	typeField = parent.find('.django_item_form_type')

	if (val == 2) {

		django.jQuery(field1).attr('rows', 10)
		django.jQuery(field2).attr('rows', 10)

		// Aquí obtengo los choices a partir del data, pero como string '((1, "T1"), (2, "T2"))'.
		let strTypeChoices = django.jQuery(element).data('m2-type-options')

		// Para poder parsear el string a un array, uso la función JSON.parse, pero esta
		// función no acepta strings con los caracteres (,),', por lo que debo reemplazaros
		// por [,],".
		let typeChoices = JSON.parse(strTypeChoices.replace(/\(/g, "[").replace(/\)/g, "]").replace(/\'/g, "\""))

		populateSelectField(typeField, typeChoices)
	}

	if (val == 1) {

		django.jQuery(field1).attr('rows', 1)
		django.jQuery(field2).attr('rows', 1)

		// Aquí obtengo los choices a partir del data, pero como string '((1, "T1"), (2, "T2"))'.
		let strTypeChoices = django.jQuery(element).data('m1-type-options')
		let typeChoices = JSON.parse(strTypeChoices.replace(/\(/g, "[").replace(/\)/g, "]").replace(/\'/g, "\""))

		populateSelectField(typeField, typeChoices)
	}

}

window.onload = function() {

	django.jQuery(document).find('.django_item_form_mode').each(function(_, element){
		selector_mode(element)
	})
}

