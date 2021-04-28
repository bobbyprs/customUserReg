from django.urls import path,include
# from .views import  TenentDetails,TenentList
from .views import  TenentViewSet,login
from rest_framework.routers import DefaultRouter
from tenent import views
from django.conf.urls import url
from django.conf.urls.static import static



router = DefaultRouter()
router.register('tuser',TenentViewSet,basename='tenent')


urlpatterns = [
    path('tenent/',include(router.urls)),
    path('login/', views.login),
    # path('sendmail', sendmail, name='sendmail'),
    # path('Tenents/<int:id>/',TenentDetails.as_view()),
    # path('Tenents/',TenentList.as_view()),

]