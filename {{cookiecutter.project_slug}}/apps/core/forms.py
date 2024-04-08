import pytz
from django import forms
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import UserCreationForm
from organizations.models import Organization

from .models import AppUser


class RegistrationForm(UserCreationForm):
    organization_name = forms.CharField(
        label="Organization Name", required=True, max_length=100
    )
    tz = forms.ChoiceField(
        label="Preferred Timzone",
        required=True,
        choices=[(z, z) for z in pytz.common_timezones]
    )
    full_name = forms.CharField(label="Name", required=True, max_length=100)
    email = forms.EmailField(required=True)

    class Meta:
        model = AppUser
        fields = ("email", "tz", "password1", "password2")

    field_order = [
        "organization_name",
        "full_name",
        "email",
        "tz",
        "password1",
        "password2",
    ]

    def clean_organization_name(self) -> None:
        org = Organization.objects.filter(name=self.cleaned_data["organization_name"])
        if org:
            raise ValidationError("Organization with this name already exists.")

    def save(self, commit=True) -> AppUser:
        user = super(RegistrationForm, self).save(commit=False)
        user.username = self.cleaned_data["email"]
        user.email = self.cleaned_data["email"]
        user.first_name = self.cleaned_data["full_name"].split(" ")[0]
        user.last_name = self.cleaned_data["full_name"].split(" ")[1]

        if commit:
            user.save()

        return user
