from django import forms
from django.db import models


class Conf(models.Model):
    name = models.CharField(max_length=300)

    def __str__(self):
        return self.name

class Item(models.Model):

    MODE1 = 1
    MODE2 = 2

    MODE_CHOICES = (
            (MODE1, 'M1'),
            (MODE2, 'M2'),
    )

    mode   = models.IntegerField(choices=MODE_CHOICES)

    field1 = models.TextField()
    field2 = models.TextField()

    conf = models.ForeignKey(Conf, on_delete=models.CASCADE)

    def __str__(self):
        return '{}|{}'.format(self.field1, self.field2)


