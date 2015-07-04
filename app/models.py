from django.db import models
from django.contrib.gis.db.models import PointField
from django.contrib.postgres.fields import ArrayField


class Story(models.Model):
    title = models.TextField()
    url = models.URLField()
    date = models.DateField()
    primary_image = models.URLField()
    primary_image_caption = models.TextField()
    primary_image_rights_information = models.TextField()
    subjects = models.TextField()
    station = models.TextField()
    state = models.TextField()
    place = models.TextField()
    keywords = models.TextField()
    location = PointField()