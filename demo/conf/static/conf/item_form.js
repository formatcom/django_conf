function populateSelectField(field, choices) {
	django.jQuery(field).empty()

	django.jQuery.each(choices, function(_, option) {
		django.jQuery(field).append(django.jQuery(document.createElement("option")).attr("value", option[0]).text(option[1]));
	});
}

function selector_mode(element) {
	let val = django.jQuery(element).val()

	parent = django.jQuery(django.jQuery(element).closest('tr'))

	typeField = parent.find('.django_item_form_type')
	var typeFieldValue = django.jQuery(typeField).val()

	if (val == 2) {
		// Obtener los choices del campo type si el mode es M2
		// a partir del data, pero como string '((1, "T1"), (2, "T2"))'.
		let strTypeChoices = django.jQuery(element).data('m2-type-options')

		// Para poder parsear el string a un array, uso la función JSON.parse, pero esta
		// función no acepta strings con los caracteres (,),', por lo que debo reemplazaros
		// por [,],".
		let typeChoices = JSON.parse(strTypeChoices.replace(/\(/g, "[").replace(/\)/g, "]").replace(/\'/g, "\""))

		populateSelectField(typeField, typeChoices)
	}

	if (val == 1) {
		// Aquí obtengo los choices del campo type si el mode es M1
		// a partir del data, pero como string '((1, "T1"), (2, "T2"))'.
		let strTypeChoices = django.jQuery(element).data('m1-type-options')

		// Parsear string de choices a un array de js.
		let typeChoices = JSON.parse(strTypeChoices.replace(/\(/g, "[").replace(/\)/g, "]").replace(/\'/g, "\""))

		populateSelectField(typeField, typeChoices)
	}

	if (!val) {
		populateSelectField(typeField, [["", "---------"]])
	}

	django.jQuery(typeField).val(typeFieldValue)
}

function selector_type(element) {
	let val = django.jQuery(element).val()

	var strTypeMap = django.jQuery(element).data("type-map")

	let typeMap = JSON.parse(strTypeMap.replace(/\(/g, "[").replace(/\)/g, "]").replace(/\'/g, "\""))
	let selectedType = typeMap[val]

	if (!selectedType) {
		return
	}

	parent = django.jQuery(django.jQuery(element).closest('tr'))

	field1 = parent.find('.django_item_form_field1')
	field2 = parent.find('.django_item_form_field2')

	django.jQuery(field1).attr('placeholder', selectedType[1])
	django.jQuery(field2).attr('placeholder', selectedType[2])

	if (selectedType[0] == 'textarea') {

		django.jQuery(field1).attr('rows', 10)
		django.jQuery(field2).attr('rows', 10)

	}

	if (selectedType[0] == 'input') {

		django.jQuery(field1).attr('rows', 1)
		django.jQuery(field2).attr('rows', 1)

	}
}

window.onload = function() {

	django.jQuery(document).find('.django_item_form_mode').each(function(_, element){
		selector_mode(element)
	})

	django.jQuery(document).find('.django_item_form_type').each(function(_, element){
		selector_type(element)
	})

}

