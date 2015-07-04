from django.db import models
from django.contrib.gis.db.models import PointField
from django.contrib.postgres.fields import ArrayField


class Story(models.Model):
    title = models.CharField()
    url = models.URLField()
    date = models.DateField()
    primary_image = models.URLField()
    primary_image_caption = models.CharField()
    primary_image_rights_information = models.CharField()
    subjects = ArrayField(models.CharField())
    station = models.CharField()
    state = models.CharField()
    place = models.CharField()
    keywords = ArrayField(models.CharField())
    location = PointField()
