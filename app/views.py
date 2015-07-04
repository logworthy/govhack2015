import json

from django.http import HttpResponse
from django.shortcuts import render_to_response
from app.models import Story

def home(request):
    search = request.GET.get('search', None)
    return render_to_response('index.html')


def api(request):
    search = request.GET.get('search', None)
    limit = request.GET.get('limit', 10)
    if search:
        story_list = Story.objects.search(search)[:limit]
    else:
        story_list = Story.objects.all().order_by('-date')[:limit]

    story_dicts = [{
        'title': s.title
        , 'url': s.url
        , 'date': s.date.strftime('%d/%m/%Y')
        , 'primary_image': s.primary_image
        , 'subjects': s.subjects
        , 'latitude': s.location.coords[0]
        , 'longitude': s.location.coords[1] 
    } for s in story_list]

    response = HttpResponse(
        json.dumps(story_dicts), content_type="application/json")
    response['Access-Control-Allow-Origin'] = '*'
    return response

"""
    mock = [{
        'title': 'Mittagong Greeny Flat shows eco-living made easy',
        'url': 'http://www.abc.net.au/local/photos/2014/05/26/4012255.htm',
        'date': '26/05/2014',
        'primary_image': 'http://www.abc.net.au/reslib/201405/r1280295_17329764.jpg',
        'subjects': ['blah', 'something', 'another'],
        'latitude': -34.4516,
        'longitude': 150.4445
    }, {
        'title': 'Yadda',
        'url': 'http://www.abc.net.au/local/photos/2014/05/26/4012255.htm',
        'date': '26/05/2014',
        'primary_image': 'http://www.abc.net.au/reslib/201405/r1280295_17329764.jpg',
        'subjects': ['blah', 'something', 'another'],
        'latitude': -54.4516,
        'longitude': 160.4445
    }, 
    {
        'title': 'Yadda 2',
        'url': 'http://www.abc.net.au/local/photos/2014/05/26/4012255.htm',
        'date': '26/05/2014',
        'primary_image': 'http://www.abc.net.au/reslib/201405/r1280295_17329764.jpg',
        'subjects': ['blah', 'something', 'another'],
        'latitude': -64.4516,
        'longitude': 170.4445
    }]
"""
