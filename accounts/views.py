# Create your views here.
from django.shortcuts import render, render_to_response, redirect
from django.http import HttpResponseRedirect
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login as auth_login, logout
from forms import LoginForm
from django.contrib.auth.views import logout_then_login

def login(request):
    msg=[]
    if request.method == 'POST': # If the form has been submitted.
        form = LoginForm(request.POST) #form bound to POST data
        if form.is_valid(): # All validation rules pass
            # Process the data in form.cleaned_data
            username = request.POST['username']
	    password = request.POST['password']
	    user = authenticate(username=username, password=password)
            if user is not None:
                if user.is_active:
                    auth_login(request, user)
            	    # Redirect to a success page.
                    return redirect('thanks.html',context_instance= RequestContext(request)) # Redirect after POST
        	else:
            	    # Return a 'disabled account' error message
                    msg.append('Disabled account')
            else:
                msg.append('User Error: Invalid Login')
    form = LoginForm() # An unbound form
    return render_to_response('accounts/login.html', {
        'form': form, 'msg': msg,
    },context_instance= RequestContext(request))

#def register(request):
 #   if reqest.method == 'POST':
  #      form = UserCreationForm(request.POST)
   #     if form.is_valid():
#	    
 #   form = UserCreationForm()

@login_required(login_url='/accounts/login.html')
def thanks(request):
    return render_to_response('accounts/thanks.html') # Redirect after POST

@login_required(login_url='/accounts/login.html')
def logout_user(request):
    return logout_then_login(request,'/accounts/login.html')

