from django.db import models
from django.contrib.auth.models import User,AbstractBaseUser,BaseUserManager
from django.core.validators import RegexValidator
from phonenumber_field.modelfields import PhoneNumberField
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.mail import send_mail,EmailMessage
from django.http import HttpResponse
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
import random
import string
from django.utils.http import urlquote
from django.utils.translation import ugettext_lazy as _

# Create your models here.


# TODO add this manager to a new file
class MyTenentManger(BaseUserManager):
    def create_user(self,email,username,phone_number,shop_name,is_active,category,password=None):
        if not email:
            raise ValueError("Users must have an email address")
        if not username:
            raise ValueError("User must have an username")
        if not phone_number:
            raise  ValueError("User must have an phone number")
        

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            phone_number=phone_number,
            category=category,
            shop_name=shop_name
        )
        
        use_password=get_random_string(length=12)
        user.set_password(use_password)
        send_mail(
            'Subject',
            use_password,
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
        )
        user.is_active =True
        user.save(using=self._db)
        return user
        
    def create_superuser(self,username, email,phone_number,password):

        # if not email:
        #     raise ValueError("Users must have an email address")

        # if not username:
        #     raise ValueError("User must have an username")

        # if password is None:
        #     raise TypeError('Superusers must have a password.')

        user = self.create_user(
           email=self.normalize_email(email),
            username=username,
            password=password,
            phone_number=phone_number,
            
            )
        user.set_password(password)
        user.is_superuser = True
        user.is_staff = True
        user.is_admin = True
        user.save(using=self._db)

        return user
        


class Tenent(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    shop_name=models.CharField(max_length=60,null=True,blank=True)
    email = models.EmailField(verbose_name="email",max_length=60,unique=True)
    username = models.CharField(max_length=30,unique=True)
    phone_number = PhoneNumberField(null=False, blank=False, unique=True)
    password=models.CharField(null=True,max_length=128)
    date_joined =models.DateTimeField(verbose_name='date_joined',auto_now_add=True)
    last_login =models.DateTimeField(verbose_name="last_login",auto_now=True)
    category=models.CharField(max_length=60,null=True,blank=True)
    is_admin =models.BooleanField(default=False)
    is_active =models.BooleanField(help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.',default=True)
    is_staff =models.BooleanField(default=False)
    is_superuser =models.BooleanField(default=False)
    
    USERNAME_FIELD ='email'
    REQUIRED_FIELDS =['username','phone_number']
    objects =MyTenentManger()

    # class Meta:
    #     verbose_name = _('user')
    #     verbose_name_plural = _('users')

    # def get_absolute_url(self):
    #     return "/users/%s/" % urlquote(self.email)

    # def create_password(request,self):
    #     password=User.objects.make_random_password()
    #     user = self.model(
    #         email=self.email,
    #         username=self.username,
    #         phone_number=self.phone_number,
            
            
    #     )
    #     user.set_password(''.join([random.choice(string.digits + string.letters) for i in range(0, 10)]))
    #     user.save()
        

    # def sendmail(request,self):
    #     send_mail(
    #         'Subject',
    #         'self.password',
    #         settings.EMAIL_HOST_USER,
    #         [self.email],
    #         fail_silently=False,
    #     )
    #     return HttpResponse('Mail successfully sent')

    def __str__(self):
        return self.username

    def has_perm(self,perm,obj=None):
        return self.is_admin
    def has_module_perms(self,app_lable):
        return True