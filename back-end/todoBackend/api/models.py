from django.db import models

# Todo model
class TodoModel(models.Model):
    title = models.CharField(max_length=250)
    completed = models.BooleanField(default=False, blank=True)
    scheduled = models.BooleanField(default=False, blank=True)
    time = models.CharField(max_length=250) 
    