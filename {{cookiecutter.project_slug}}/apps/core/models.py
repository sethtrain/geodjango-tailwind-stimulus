from django.contrib.auth.models import AbstractUser


class AppUser(AbstractUser):
    def initials(self):
        return f"{self.first_name[0]}{self.last_name[0]}"
