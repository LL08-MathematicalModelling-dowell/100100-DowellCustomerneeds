# Generated by Django 4.2 on 2023-06-22 08:29

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
                ('q1', models.CharField(max_length=200)),
                ('q2', models.CharField(max_length=250)),
                ('q3', models.CharField(max_length=200)),
            ],
            options={
                'verbose_name': 'Service',
            },
        ),
    ]
