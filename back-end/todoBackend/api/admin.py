from django.contrib import admin
from .models import TodoModel

# Registering a todo model into admin
admin.site.register(TodoModel)
