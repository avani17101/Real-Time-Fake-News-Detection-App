from rest_framework import viewsets
from rest_framework.parsers import JSONParser 
from django.http import HttpResponse
from django.http.response import JsonResponse
from .serializers import URLSerializer, ReviewSerializer,UserCredentialSerializer
from .models import URL, Reviews, User_Credentials
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
import requests
import json

@csrf_exempt 
def url_verification(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        
        try:
            request = requests.get(data['url'])
            answer={'exists':'yes'}
        except:
            answer={'exists':'no'}
        return JsonResponse(answer) 

@csrf_exempt 
def add_review(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        data_serializer = ReviewSerializer(data=data)
        if data_serializer.is_valid():
            data_serializer.save()
        answer = {'ans' : 'added'}

        return JsonResponse(answer)

@csrf_exempt 
def user_signup(request):
    print("hello")
    answer = {'ans' : 'not added'}
    if request.method == 'POST':
        data = JSONParser().parse(request)
        users = User_Credentials.objects.filter(email = data['email'])
        print(users)
        if users.exists():
            answer = {'ans':'not added'}
        else:
            data_serializer = UserCredentialSerializer(data=data)
            if data_serializer.is_valid():
                data_serializer.save()
            print("hsahdjasdb")
            answer = {'ans': 'added'}
            print(answer)

    return JsonResponse(answer)

@csrf_exempt 
def user_signup_wwww(request):
    print("hello")
    answer = {'ans' : 'not added'}
    if request.method == 'POST':
        data = JSONParser().parse(request)
        users = User_Credentials.objects.filter(email = data['email'])
        print(users)
        if users.exists():
            answer = {'ans':'not added'}
        else:
            data_serializer = UserCredentialSerializer(data=data)
            if data_serializer.is_valid():
                data_serializer.save() 
            answer = {'ans': 'added'}
            print(answer)

    return JsonResponse(answer)

@csrf_exempt 
def user_login(request):
    answer = {'ans' : 'not logged in'}
    if request.method == 'POST':
        data = JSONParser().parse(request)
        users = User_Credentials.objects.filter(email = data['email'],password = data['password'])
        print(users)
        if users.exists():
            answer = {'ans':'loggedin'}
            print(answer)
        else:
            answer = {'ans': 'not logged in'}
            print(answer)

    return JsonResponse(answer)
        


# class URLViewSet(viewsets.ModelViewSet):
#     queryset = URL.objects.all().order_by('url')
#     serializer_class = URLSerializer