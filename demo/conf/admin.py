from django.contrib import admin
from django.forms import ModelForm
from django.forms import forms

from .models import Conf
from .models import Item

class ItemForm(ModelForm):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['mode'].widget.attrs.update(**{
            'class': 'django_item_form_mode',
            'onchange':'selector_mode(this)',
        })

        oldclass = self.fields['field1'].widget.attrs['class']

        self.fields['field1'].widget.attrs.update(**{
            'class': '{} django_item_form_field1'.format(oldclass),
            'cols': 40,
            'rows': 1,
        })

        self.fields['field2'].widget.attrs.update(**{
            'class': '{} django_item_form_field2'.format(oldclass),
            'cols': 40,
            'rows': 1,
        })

    class Meta:
        model = Item
        fields = '__all__'

class ItemInline(admin.TabularInline):
    model = Item
    form = ItemForm


@admin.register(Conf)
class ConfAdmin(admin.ModelAdmin):
    inlines = (ItemInline, )

    class Media:
        js = ('conf/item_form.js',)
