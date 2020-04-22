from rest_framework import viewsets
from rest_framework.parsers import JSONParser 
from django.http import HttpResponse
from django.http.response import JsonResponse
from .serializers import ReviewSerializer,UserCredentialSerializer
from .models import Reviews, User_Credentials
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from passlib.hash import pbkdf2_sha256 as pass_handler
from django.core.mail import send_mail
from .scraper import scraper
import requests
import json

@csrf_exempt 
def url_verification(request):
    answer={'exists':'no'}
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
        answer={'ans':'not added'}
        data = JSONParser().parse(request)
        Reviews.objects.filter(user=data['user'],url=data['url']).delete()
        review_data = Reviews(user=data['user'], type=data['type'], rating=data['rating'], review=data['review'], url=data['url'])
        review_data.save()
        answer = {'ans' : 'added'}

        return JsonResponse(answer)


@csrf_exempt 
def user_signup(request):
    answer = {'ans' : 'not added'}
    if request.method == 'POST':
        data = JSONParser().parse(request)
        users_email = User_Credentials.objects.filter(email = data['email'])
        users_username = User_Credentials.objects.filter(username = data['username'])
        print(users_email)
        if users_email.exists():
            answer = {'ans':'same email'}
        elif users_username.exists():
            answer = {'ans':'same username'}
        else:
            enc_password = pass_handler.hash(data['password'])
            user_data=User_Credentials(name=data['name'],email=data['email'], username=data['username'], password=enc_password)
            user_data.save()
            answer = {'ans': 'added'}
            print(answer)

    return JsonResponse(answer)

@csrf_exempt 
def user_login(request):
    answer = {'ans' : 'Not Logged In'}
    if request.method == 'POST':
        data = JSONParser().parse(request)
        users = User_Credentials.objects.filter(email = data['email'])
        if users.exists():
            user_data = User_Credentials.objects.get(email = data['email'])
            if(pass_handler.verify(data['password'], user_data.password)):
                answer = {'ans':'Logged In', 'username': user_data.username}
            else:
                answer = {'ans':'Not Logged In'}
        else:
            answer = {'ans': 'Not Logged In'}

    return JsonResponse(answer)

@csrf_exempt 
def check_url(request):
    data = JSONParser().parse(request)
    output=scraper(data['url'])
    answer = {'ans':output}
    return JsonResponse(answer)

@csrf_exempt
def credential_check(request):
    answer = {'ans':'ok'}
    data = JSONParser().parse(request)
    users_email = User_Credentials.objects.filter(email = data['email'])
    users_username = User_Credentials.objects.filter(username = data['username'])
    print(users_email)
    if users_email.exists():
        answer = {'ans':'same email'}
    elif users_username.exists():
        answer = {'ans':'same username'}
    else:
        answer = {'ans':'ok'}
    return JsonResponse(answer)

@csrf_exempt
def otp_mail(request):
    print("here")
    answer={'ans':'done'}
    data = JSONParser().parse(request)
    msg = " Hello "+ data['username']+",\n To Verify Account Please Enter OTP Provided Below\n You OTP For Account Verification : " + data['otp']
    send_mail("OTP Verification", msg, "scrapshut-dass@outlook.com", [data['email']], fail_silently=False)
    return JsonResponse(answer)

@csrf_exempt
def get_user_reviews(request):
    data=JSONParser().parse(request)
    user_reviews = Reviews.objects.filter(user = data['username'])
    user_review_data= {
       'user_reviews' : list(user_reviews.values())
    }
    print (user_review_data)
    return JsonResponse(user_review_data)

@csrf_exempt
def send_contact_info(request):
    answer={'ans':'done'}
    data = JSONParser().parse(request)
    msg = "Name : "+ data['name']+"\n\nEmail : " + data['email'] + "\n\nSubject : " + data['subject'] + "\n\nMessage : " + data['message']
    send_mail("Query/Contact From " + data['name'], msg, "scrapshut-dass@outlook.com", ["scrapshut-dass@outlook.com"], fail_silently=False)
    return JsonResponse(answer)
