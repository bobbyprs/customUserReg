from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from tenent.models import Tenent
from .forms import TenentUserCreationForm
from django.utils.translation import ugettext_lazy as _

class TenentAdmin(UserAdmin):
    list_display = ('username','email','date_joined','last_login','is_active','is_staff')
    search_fields =('email','username')
    readonly_fields =('id','date_joined','last_login')
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ( 'username','email','phone_number','is_active')}
        ),
        
    )

    filter_horizontal =()
    list_filter =('email','username')
    fieldsets =()
    add_form = TenentUserCreationForm

admin.site.register(Tenent,TenentAdmin)
