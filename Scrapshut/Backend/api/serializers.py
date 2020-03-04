from rest_framework import serializers

from .models import URL, Reviews,User_Credentials

class URLSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = URL
        fields = ('url')

class ReviewSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Reviews
        fields = ('type', 'rating', 'review', 'url')

class UserCredentialSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User_Credentials
        fields = ('email', 'password')