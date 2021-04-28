from rest_framework import serializers
from .models import Tenent
from rest_framework.validators import UniqueValidator
from rest_framework.authtoken.views import Token
from django.contrib.auth.password_validation import validate_password
# from django.contrib.auth.models import User
from django.conf import settings

# remove all commentend code add write comments
class TenentSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=Tenent.objects.all())]
            )
    is_active =serializers.BooleanField(default=False)
    class Meta:
        model = Tenent
        fields =['id','shop_name','username', 'password','email','date_joined','phone_number','category','last_login','is_active']
        extra_kwargs ={'password':{
            'write_only':True,
           
        }}

    def create(self,validated_data):
        tenent=Tenent.objects.create_user(**validated_data)
        print(tenent)
        return tenent
