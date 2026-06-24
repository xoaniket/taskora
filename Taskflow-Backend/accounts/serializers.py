# Imports Django's built-in User model.
from django.contrib.auth.models import User 


from rest_framework import serializers


class RegisterSerializer(serializers.ModelSerializer): #autocreate  fields from model
    password = serializers.CharField(write_only=True)

    class Meta:  
        model = User

        fields = [
            "username",
            "email",
            "password",
        ]

    def create(self, validated_data):  #contain cleaned JSON data
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )   

        return user 
    

class LoginSerializer(serializers.Serializer):
        username = serializers.CharField()
        password=serializers.CharField(write_only=True)


# for CRUD operation,,,,,,,,.
class ProfileSerializer(serializers.ModelSerializer):
     
   class Meta:  
     model = User      # pre built fields.....
     fields = [
          "id",
          "username",
          "email",
     ]
             