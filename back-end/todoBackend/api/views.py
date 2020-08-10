from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import TodoModel

# Created TodoViewSet by inheriting parent class i.e. ModelViewSet
class TodoViewSet(viewsets.ModelViewSet):
    queryset = TodoModel.objects.all().order_by('id')
    serializer_class = TodoSerializer

# Create your views here.
