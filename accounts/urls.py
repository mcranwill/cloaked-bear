from django.conf.urls import patterns, include, url

urlpatterns = patterns('accounts.views',
    url(r'^login.html$','login'),
#    url(r'^register.html','register'),
    url(r'^logout$','logout_user'),
    url(r'^thanks.html$','thanks'),
)
