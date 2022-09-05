from django.http.response import HttpResponse
from django.shortcuts import render
from .models import Gradesdata
from . import views
import json
from django.core import serializers
# Create your views here.

def index(request):
    q = request.GET.get("q")
    if(len(q) == 4):
        classes = Gradesdata.objects.filter(dept__search=q).order_by('num', 'prof', 'yr')
    else:
        j = int(q[4: 7])
        q = q[0: 4]
        if q:
            classes = Gradesdata.objects.filter(dept__search=q).filter(num=j).order_by('prof', 'yr')
        else:
            classes = None
    qs_json = serializers.serialize('json', classes)
    return HttpResponse(qs_json, content_type='application/json')