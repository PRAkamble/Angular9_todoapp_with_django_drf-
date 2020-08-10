from rest_framework import serializers
from .models import TodoModel

# DRF serializer for json format data binding
class TodoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TodoModel
        fields = ('id','title','completed','scheduled','time','url')