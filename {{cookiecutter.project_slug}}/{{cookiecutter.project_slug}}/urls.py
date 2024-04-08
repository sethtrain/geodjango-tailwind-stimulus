from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.contrib.auth.decorators import login_required
from django.views.generic.base import TemplateView

from apps.core import views as core


urlpatterns = [
    path("admin/", admin.site.urls),
    path("accounts/register/", core.register, name="register"),
    path("accounts/login/", core.LoginView.as_view(), name="login"),
    path("accounts/", include("django.contrib.auth.urls")),
    path(
        "",
        login_required(
            TemplateView.as_view(
                template_name="base.html", extra_context={"current": "dashboard"}
            )
        ),
        name="dashboard",
    ),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += [path("__debug__/", include("debug_toolbar.urls"))]

admin.site.site_header = "{{cookiecutter.project_name}} administration"
admin.site.site_tite = "{{cookiecutter.project_name}} site admin"
