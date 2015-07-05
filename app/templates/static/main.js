var apiUrl = "http://api.ourlocalstories.co"

var mainApp = angular.module('mainApp', ['uiGmapgoogle-maps', 'ngAnimate'])

.value("rndAddToLatLon", function () {
  return Math.floor(((Math.random() < 0.5 ? -1 : 1) * 2) + 1);
})

.config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
  GoogleMapApi.configure({
//    key: 'your api key',
    v: '3.17',
    libraries: 'weather,geometry,visualization'
  });
}])

.run(['$templateCache', function ($templateCache) {
  $templateCache.put('control.tpl.html', '<button class="btn btn-sm btn-primary" ng-class="{\'btn-warning\': danger}" ng-click="controlClick()">{{controlText}}</button>');
}])

mainApp.controller('MainCtrl', ['$scope', '$timeout', 'uiGmapLogger', '$http', 'rndAddToLatLon','uiGmapGoogleMapApi'
        , function ($scope, $timeout, $log, $http, rndAddToLatLon,GoogleMapApi) {

  $scope.loading = true;
  $scope.articles = [];
  $scope.query = "";
  $scope.year = "";
  $scope.activeArticle = null;
  $scope.sideBarToggle = true;

  var timeoutPromise;


  $http.get(apiUrl).
    success(function(data, status, headers, config) {
      addIcons(data);
      mapInit(data);

      $scope.articles = data;
      $scope.loading = false;
    }).
    error(function(data, status, headers, config) {
      console.log("error", data);
    });

  function addIcons(data){
    for(var i=0;i<data.length;i++){
      if(data[i].primary_image)
        data[i].icon="http://ourlocalstories.co:8082/unsafe/35x35/smart/"+data[i].primary_image;
    }
  }

  $scope.searchNearby = function(article) {
    $scope.query = null;
    $scope.search({
      point: article.latitude + "," + article.longitude,
      distance: 300});
  };

  $scope.search = function(params) {
    var start = null;
    var end = null;

    if (!params) {
      if ($scope.year) {
        start = $scope.year + "-01-01";
        end = (parseInt($scope.year) + 1) + "-01-01";
      };

      var params = {
        search: $scope.query,
        start: start,
        end: end
      };
    };

    params['limit'] = 100;

    $timeout.cancel(timeoutPromise);

    timeoutPromise = $timeout(function() {
      $scope.loading = true;

      $http({
        url: apiUrl,
        params: params,
        method: 'GET'
      })
        .success(function(data, status, headers, config) {
          console.log("data", data);
          if(data.length===0){
            $scope.articles = [{
              title:"No results found",
              primary_image_caption: "Please try another search query"
            }];
          } else{
            $scope.articles = data;
          }
          $scope.map.markers = data;
          $scope.loading = false;
        })
        .error(function(data, status, headers, config) {
          $scope.loading = false;
        });
    }, 800);
  }

  $scope.fillModal = function(article) {
    $scope.activeArticle = article;
  }

  $log.currentLevel = $log.LEVELS.debug;

  GoogleMapApi.then(function(maps) {
    $scope.googleVersion = maps.version;
    maps.visualRefresh = true;
    $log.info('$scope.map.rectangle.bounds set');

  });

  var onMarkerClicked = function (marker) {
    marker.showWindow = true;
    $scope.$apply();
    //window.alert("Marker: lat: " + marker.latitude + ", lon: " + marker.longitude + " clicked!!")
  }

  function mapInit(data){
      angular.extend($scope, {
        example2: {
          doRebuildAll: false
        },
        clickWindow: function () {
          $log.info('CLICK CLICK');
          Logger.info('CLICK CLICK');
        },
        map: {
          show: true,
          control: {},
          center: {
            latitude: -26,
            longitude: 135
          },
          options: {
            streetViewControl: false,
            panControl: false,
            maxZoom: 20,
            minZoom: 3
          },
          zoom: 4,
          dragging: false,
          bounds: {},
          markers: data,
          clickedMarker: {
            id: 0,
            options:{
            }
          },
          events: {
            //This turns of events and hits against scope from gMap events this does speed things up
            // adding a blacklist for watching your controller scope should even be better
            //        blacklist: ['drag', 'dragend','dragstart','zoom_changed', 'center_changed'],
            tilesloaded: function (map, eventName, originalEventArgs) {
            },
            click: function (mapModel, eventName, originalEventArgs) {
              // 'this' is the directive's scope
              // $log.info("user defined event: " + eventName, mapModel, originalEventArgs);
              // var e = originalEventArgs[0];
              // var lat = e.latLng.lat(),
              //   lon = e.latLng.lng();
              // console.log("test", lat, lon);
              //scope apply required because this event handler is outside of the angular domain
              //$scope.$apply();
            },
            zoom_changed: function (mapModel, eventName, originalEventArgs) {
              // 'this' is the directive's scope
              console.log("user defined event: " + eventName, mapModel, originalEventArgs);
              console.log(window.event);
              if(window.event.altKey){
                var southwest = mapModel.bounds.southwest;
                var northeast = mapModel.bounds.northeast;
                console.log("bounds", southwest.latitude, southwest.longitude, northeast.latitude, northeast.longitude);
                //searchSpaceBox(southwest.latitude, southwest.longitude, northeast.latitude, northeast.longitude);
              }
              $scope.$apply();
            },
          }
        },
        toggleColor: function (color) {
          return color == 'red' ? '#6060FB' : 'red';
        }

      });

    _.each($scope.map.markers, function (marker) {
      marker.closeClick = function () {
        marker.showWindow = false;
        $scope.$evalAsync();
      };
      marker.onClicked = function () {
        onMarkerClicked(marker);
      };
    });

  }

  $scope.refreshMap = function () {
    //optional param if you want to refresh you can pass null undefined or false or empty arg
    $scope.map.control.refresh({latitude: 32.779680, longitude: -79.935493});
    $scope.map.control.getGMap().setZoom(11);
    return;
  };

  $scope.getMapInstance = function () {
    alert("You have Map Instance of" + $scope.map.control.getGMap().toString());
    return;
  }

  $scope.onMarkerClicked = onMarkerClicked;

  $scope.story = function (marker, eventName, model) {
    console.log("id", model.id);
    $scope.sideBarToggle = false;
    $timeout(function() {
      pushToTop(model.id);
      $scope.sideBarToggle =true;
    }, 300);
  };

  function pushToTop(id){
    var temp = $scope.articles[0];
    var idNum = 0;
    for(var i=0;i<$scope.articles.length;i++){
      if($scope.articles[i].id===id){
        $scope.articles[0]=$scope.articles[i];
        idNum=i
      }
    }
    $scope.articles[idNum]=temp;

  }

}]);
