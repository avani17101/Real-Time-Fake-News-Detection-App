from django.db import models


class Reviews(models.Model):
    user=models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    rating = models.CharField(max_length=5)
    review = models.CharField(max_length=100000000000000)
    url = models.CharField(max_length=255)
    objects = models.Manager()
    def __str__(self):
        return self.url

class User_Credentials(models.Model):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=1000)
    objects = models.Manager()
    def __str__(self):
        return self.email