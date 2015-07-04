# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import djorm_pgfulltext.fields
import django.contrib.gis.db.models.fields


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Story',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.TextField()),
                ('url', models.URLField()),
                ('date', models.DateField()),
                ('primary_image', models.URLField(null=True)),
                ('primary_image_caption', models.TextField(null=True)),
                ('primary_image_rights_information', models.TextField(null=True)),
                ('subjects', models.TextField(null=True)),
                ('station', models.TextField(null=True)),
                ('state', models.TextField(null=True)),
                ('place', models.TextField(null=True)),
                ('keywords', models.TextField(null=True)),
                ('location', django.contrib.gis.db.models.fields.PointField(srid=4326)),
                ('search_index', djorm_pgfulltext.fields.VectorField(default=b'', serialize=False, null=True, editable=False, db_index=True)),
            ],
        ),
    ]
