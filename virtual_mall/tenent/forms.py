from django.contrib.auth.forms import UserCreationForm
from .models import Tenent

class TenentUserCreationForm(UserCreationForm):
    """
    A form that creates a user, with no privileges, from the given email and
    password.
    """

    def __init__(self, *args, **kargs):
        super(TenentUserCreationForm, self).__init__(*args, **kargs)
        # del self.fields['username']

    class Meta:
        model = Tenent
        fields = ("email",)