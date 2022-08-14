from .views import RoomView
from django.urls import path

urlpatterns = [
    # path('', main)
    path('room', RoomView.as_view())
]
