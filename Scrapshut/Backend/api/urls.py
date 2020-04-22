# myapi/urls.py
from django.urls import include, path
from django.conf.urls import url
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
# router.register(r'urls', views.URLViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^url_verification',views.url_verification),
    url(r'^add_review',views.add_review),
    url(r'^user_login',views.user_login),
    url(r'^user_signup',views.user_signup),
    url(r'^check_url',views.check_url),
    url(r'^credential_check',views.credential_check),
    url(r'^otp_mail',views.otp_mail),
    url(r'^get_user_reviews',views.get_user_reviews),
    url(r'^send_contact_info',views.send_contact_info)
    # path('', include(router.urls)),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]