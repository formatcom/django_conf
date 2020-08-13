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

    TYPE1 = 1
    TYPE2 = 2
    TYPE3 = 3
    TYPE4 = 4

    MODE1_TYPE_CHOICES = (
        (TYPE1, 'T1'),
        (TYPE2, 'T2'),
    )

    MODE2_TYPE_CHOICES = (
        (TYPE3, 'T3'),
        (TYPE4, 'T4'),
    )

    TYPE_MAP = {
        TYPE1: ("input", "Type1Field1", "Type1Field2"),
        TYPE2: ("input", "Type2Field1", "Type2Field2"),
        TYPE3: ("textarea", "Type3Field1", "Type3Field3"),
        TYPE4: ("textarea", "Type4Field1", "Type4Field4"),
    }

    mode   = models.IntegerField(choices=MODE_CHOICES)
    item_type = models.IntegerField(choices=MODE1_TYPE_CHOICES + MODE2_TYPE_CHOICES)

    field1 = models.TextField()
    field2 = models.TextField()

    conf = models.ForeignKey(Conf, on_delete=models.CASCADE)

    def __str__(self):
        return '{}|{}'.format(self.field1, self.field2)
