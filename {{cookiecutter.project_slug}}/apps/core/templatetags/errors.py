from django import template
register = template.Library()


@register.filter('error_message')
def error_message(obj):
    return obj["message"]
