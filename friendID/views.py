# Create your views here.
from django.shortcuts import render, render_to_response, redirect
from django.http import HttpResponseRedirect
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login as auth_login, logout
from django.contrib.auth.views import logout_then_login

@login_required(login_url='/accounts/login.html')
def disp_all_friends(request):
    return render_to_response('friendID/allFriends.html') # Redirect after POST
