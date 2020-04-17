from rest_framework import serializers

from .models import Reviews,User_Credentials

class ReviewSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Reviews
        fields = ('user','type', 'rating', 'review', 'url')

class UserCredentialSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User_Credentials
        fields = ('email', 'password')