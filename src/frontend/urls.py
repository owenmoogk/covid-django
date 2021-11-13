from .views import *
from django.urls import path

urlpatterns = [
	path("", index),
	path('health', index),
	path('points', index),
	path('login/', index),
	path('signup/', index)
]