# Generated by Django 4.2 on 2023-05-09 02:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Services',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location', models.CharField(max_length=200)),
                ('category', models.CharField(max_length=250)),
                ('product', models.CharField(max_length=200)),
            ],
            options={
                'verbose_name': 'Service',
            },
        ),
    ]
