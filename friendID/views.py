# Create your views here.
from django.shortcuts import render, render_to_response, redirect
from django.http import HttpResponseRedirect, HttpResponseBadRequest, HttpResponse
from django.utils import simplejson
import json
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login as auth_login, logout
from django.contrib.auth.models import User
from accounts.models import CustomUser
from django.contrib.auth.views import logout_then_login
from forms import gameForm

@login_required(login_url='/accounts/login.html')
def disp_all_friends(request):
#    if(request.method=='POST'):
    user = User.objects.get(pk=request.user.id) #get the userProfiles that we will update
    username = request.user.username
    message = ''
    try:
        custUser = CustomUser.objects.get(username=user.username)
    except (DoesNotExist):
	return HttpResponse("Failed")
 #   prof = user.get_profile()
    #Unpack the json 'result' from the request
#    print request.GET.get('result')
    if request.method == 'POST':
#       json_data = simplejson.loads(request.raw_post_data)
        try:
           result = (request.POST.get('result',None))
        except (KeyError):
            HttpResponseServerError("Malformed data!")
        if result == 'pass':
            custUser.success += 1
        if result == None:
    	    custUser.success -= 1
        custUser.total_attempts += 1
        custUser.save()
#	for each in request.POST.items():
#	    message = message + each[1]
 #       message = message +' OK' + result
#       return render_to_response('friendID/allFriends.html',{'response':message,'username':username},context_instance = RequestContext(request)) # Redirect after POST
        return HttpResponse(json.dumps(message),content_type="application/json" )
    return render_to_response('friendID/allFriends.html',{'response':message,'username':username},context_instance = RequestContext(request)) # Redirect after POST

#	form = gameForm(request.POST)
#	if form.is_valid():
#	    selection = request.POST.getlist('selection')
#	    chosen = request.POST['chosen']
 #   print user.username
   #     try:
     #       custUser = CustomUser.objects.get(username=user.username)
    #    except (CustomUser.DoesNotExist):
#	    return render_to_response('friendID/allFriends.html',simplejson.dumps(result), mimetype='application/json')
 #   prof = user.get_profile()
    #Unpack the json 'result' from the request
#    print request.GET.get('result')
 #       try:
#	    result = request.GET.get('result')
#	    print result
 #       except (KeyError):
#	    return render_to_response('friendID/allFriends.html',context_instance=RequestContext(request))
 # 	if result is None:
#	    return HttpResponseBadRequest()
#	if result == 'pass':
#	    custUser.success = custUser.success + 1
#	custUser.total_attempts = custUser.total_attempts + 1
#	custUser.save()
#enter sequence to add 1 to success
#	return HttpResponseRedirect('results.html?'+str(custUser.success))

def process(request):
    user = User.objects.get(pk=request.user.id) #get the userProfiles that we will update
 #   print user.username
    try:
        custUser = CustomUser.objects.get(username=user.username)
    except (DoesNotExist):
	return HttpResponse("Failed")
 #   prof = user.get_profile()
    #Unpack the json 'result' from the request
#    print request.GET.get('result')
    if request.is_ajax():
	if request.method == 'POST':
	    js_data = simplejson.loads(request.raw_post_data)
	    try:
		dat = js_data['result']
	    except (KeyError):
		HttpResponseServerError("Malformed data!")
	    if result == 'pass':
	        custUser.success += 1
    	    custUser.total_attempts += 1
    	    custUser.save()
	    return HttpResponse("Got json data")
    return HttpResponse("Failed")
    #try:
#	result = request.GET.get('result')
 #   except(KeyError):
#	return HttpResponseBadRequest()
##	return HttpResponse('it failed',mimetype='application/json')
  #  if result is None:
   #     return HttpResponse(simplejson.dumps('it failed'), mimetype='application/json')
#    if result == 'pass':
 #       custUser.success += 1
  #  custUser.total_attempts += 1
   # custUser.save()
#enter sequence to add 1 to success
    #return HttpResponse(simplejson.dumps('should have worked'), mimetype='application/json')

def results(request):
    u = User.objects.get(pk=request.user.id)
    err_message = ''
#    prof = u.get_profile()
    try:
        custUser = CustomUser.objects.get(username=u.username)
    except (DoesNotExist):
	err_message = "User is not logged in properly"
    return render_to_response('friendID/results.html',
	{'username':custUser.username,
	'successes':custUser.success,
	'total_attempts':custUser.total_attempts,
	'err_message':err_message},
	context_instance = RequestContext(request))
