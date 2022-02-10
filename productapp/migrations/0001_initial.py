# Generated by Django 3.2.7 on 2021-09-16 03:52

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('product_id', models.AutoField(primary_key=True, serialize=False)),
                ('product_uuid', models.CharField(max_length=200)),
                ('create_time', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_updateTime', models.DateTimeField(default=django.utils.timezone.now)),
                ('product_type', models.CharField(max_length=200)),
                ('product_state', models.CharField(max_length=200)),
                ('product_name', models.CharField(max_length=200)),
                ('product_address', models.CharField(max_length=200)),
                ('product_body', models.CharField(max_length=200)),
                ('product_describe', models.CharField(max_length=200)),
            ],
            options={
                'db_table': 'product_info',
            },
        ),
    ]
