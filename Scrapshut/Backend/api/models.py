from django.db import models

class URL(models.Model):
    url = models.CharField(max_length=255)
    objects = models.Manager()
   
    def __str__(self):
        return self.url

class Reviews(models.Model):
    type = models.CharField(max_length=255)
    rating = models.CharField(max_length=5)
    review = models.CharField(max_length=100000000000000)
    url = models.CharField(max_length=255)
    objects = models.Manager()
    def __str__(self):
        return self.url

class User_Credentials(models.Model):
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=5)
    objects = models.Manager()
    def __str__(self):
        return self.email