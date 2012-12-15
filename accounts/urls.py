from django.conf.urls import patterns, include, url

urlpatterns = patterns('accounts.views',
    url(r'^login.html$','login'),
    url(r'^logout$','logout'),
    url(r'^thanks.html$','thanks'),
)
