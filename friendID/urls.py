from django.conf.urls import patterns, include, url

urlpatterns = patterns('friendID.views',
    url(r'^allFriends.html$','disp_all_friends'),
#    url(r'^allFriends.html/(?P<result>[\w-]+)/$', 'disp_all_friends'),
    url(r'^process.html$','process'),
    url(r'^results.html','results'),
#    url(r'^register.html','register'),
#    url(r'^logout$','logout_user'),
#    url(r'^thanks.html$','thanks'),
)
