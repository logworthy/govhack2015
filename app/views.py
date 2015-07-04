import json

from django.http import HttpResponse

def api(request):
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

    return HttpResponse(json.dumps(mock), content_type="application/json")
