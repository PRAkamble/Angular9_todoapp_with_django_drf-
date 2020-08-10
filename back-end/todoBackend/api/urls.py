from rest_framework import routers
from django.urls import path,include
from . import views


# Created router for all crud endpoints specified by TodoViewSet
router = routers.DefaultRouter()
router.register('',views.TodoViewSet)

urlpatterns = [
        path('',include(router.urls))
]