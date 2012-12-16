from django.conf.urls import patterns, include, url

urlpatterns = patterns('friendID.views',
    url(r'^allFriends.html$','disp_all_friends'),
#    url(r'^register.html','register'),
#    url(r'^logout$','logout_user'),
#    url(r'^thanks.html$','thanks'),
)
