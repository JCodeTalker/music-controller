from .views import CreateRoomView, GetRoom, RoomView
from django.urls import path

urlpatterns = [
    # path('', main)
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view())
]
