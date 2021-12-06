from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from .models import UserHealth

@api_view(['GET'])
def current_user(request):
    return Response({'username': request.user.username})


class Signup(APIView):

    permission_classes = (permissions.AllowAny,)

    def post(self, request):

        # CREATING USER
        if not request.data['username'] or not request.data['password']:
            return Response({'error': 'Field may not be empty'}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(username = request.data['username']).exists():
            return Response({'Error': "A user with this username already exists"},status=status.HTTP_400_BAD_REQUEST)
        new_user = User(username = request.data['username'])
        new_user.set_password(request.data['password'])
        new_user.save()

        # GETTING TOKEN
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(new_user)
        token = jwt_encode_handler(payload)
        
        return Response({'token': token, 'username': new_user.username})
        

class HealthData(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):

        try:
            request.data['date']
            request.data['temperature']
        except:
            return Response({"Status": "Please submit data with a DATE and TEMPERATURE"}, status=status.HTTP_200_OK)
        try:
            userHealth = UserHealth.objects.get(owner = request.user)
            userHealthData = userHealth.data
            userHealthData.append(request.data)
            userHealth.save()
        except:
            userHealth = UserHealth.objects.create(owner = request.user, data = [request.data])
            userHealthData = userHealth.data
        return Response({'data': userHealthData}, status=status.HTTP_200_OK)\

    def get(self, request, format=None):
        try:
            userHealthData = UserHealth.objects.get(owner = request.user).data
            return Response({'data': userHealthData}, status=status.HTTP_200_OK)
        except:
            return Response({'data': {}}, status=status.HTTP_200_OK)