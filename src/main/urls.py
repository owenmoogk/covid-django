from rest_framework_jwt.views import obtain_jwt_token
from django.contrib import admin
from django.urls import path
from django.urls import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", include("frontend.urls")),
    path('token-auth/', obtain_jwt_token),
    path('users/', include('users.urls')),
    path('api/', include('api.urls'))
]
