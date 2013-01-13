from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save


#class UserProfile(models.Model):
 #   user = models.OneToOneField(User)

#def create_user_profile(sender, instance, created, **kwargs):
 #   if created:
  #      profile, created = UserProfile.objects.get_or_create(user=instance)  
   # post_save.connect(create_user_profile, sender=User)

#User.profile = property(lambda u: UserProfile.objects.get_or_create(user=u)[0])


class CustomUser(AbstractUser):
    acc_token = models.CharField(max_length=250)
    total_attempts = models.IntegerField(default=0)
    success = models.IntegerField(default =0)

