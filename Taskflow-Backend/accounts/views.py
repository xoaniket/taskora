from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

from .serializers import RegisterSerializer,LoginSerializer, ProfileSerializer


# Create your views here.

class RegisterView(APIView):

    def post(self, request):

        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response(
                {
                    "message": "User registered succesfully"
                },
                status=status.HTTP_201_CREATED
            )
        
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )
    

class LoginView(APIView) :

    def post(self, request):

        serializer = LoginSerializer (data=request.data) 

        if serializer.is_valid():

            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]

            user = authenticate(username=username, password=password)

            if user is None:
                return Response(
                    {"error": "Invalid credential"},
                    status=400,
                )
            
            refresh = RefreshToken.for_user(user)

            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                }
            )
        
        return Response(serializer.errors, status=400)

class ProfileView(APIView):
  
    permission_classes = [IsAuthenticated]

    def get(self, request): # Get()means want data... Put() update
        
        serializer = ProfileSerializer(request.user) 

        return Response(serializer.data) 
    
    def put(self, request):

        serializer = ProfileSerializer(
            request.user,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()
            return Response(serializer.data)
        
        return Response(
            serializer.errors, status=400
        )