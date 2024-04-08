from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth import views as auth_views

from organizations.utils import create_organization

from .forms import RegistrationForm


class LoginView(auth_views.LoginView):
    def render_to_response(self, context, **response_kwargs):
        """
        Return a response, using the `response_class` for this view, with a
        template rendered with the given context.

        Pass response_kwargs to the constructor of the response class.
        """
        if context["form"].errors:
            status = 422
        else:
            status = 200

        response_kwargs.setdefault("content_type", self.content_type)
        return self.response_class(
            request=self.request,
            template=self.get_template_names(),
            context=context,
            using=self.template_engine,
            status=status,
            **response_kwargs,
        )


def register(request):
    form = RegistrationForm()
    status = 200

    if request.method == "POST":
        form = RegistrationForm(request.POST)

        if form.is_valid():
            user = form.save()
            create_organization(
                user,
                request.POST["organization_name"],
                org_user_defaults={"is_admin": True},
            )
            login(request, user)
            messages.success(request, "Registration successful.")
            return redirect("/")

        messages.error(request, "Unsuccessful registration. Invalid information.")
        status = 422

    return render(
        request=request,
        status=status,
        template_name="registration/new.html",
        context={"form": form},
    )
