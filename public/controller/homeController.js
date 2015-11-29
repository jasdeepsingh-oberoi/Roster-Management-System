angular
  .module('MyApp')
  .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log, $http) {
	  
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };
    
    
    	$http.get('/fetchName').success(function(response){
    		var name = response;
    		console.log("I am back in name controller");
    		console.log(name);
    		$scope.firstName=response[0].firstName;
    		$scope.lastName=response[0].lastName;
    	});
    
    	
    	$scope.pollsPage = function(){
        	console.log("Confirmed into polls controller!");
        	window.location = '/pollsPageLoad';
    		/*$http.get('/pollsPageLoad').success(function(response){
        		//window.location = '/pollsPageLoad';
                 console.log(response);
        	});*/
        }
    	
    	
    	$scope.groupsPage = function(){
        	console.log("Confirmed into groups controller!");
        	window.location = '/groupsPageLoad';
    		/*$http.get('/pollsPageLoad').success(function(response){
        		//window.location = '/pollsPageLoad';
        		console.log(response);
        	});*/
        }
    	
    	
    $scope.tasks = function(){
    	$http.get('/fetchTasks').success(function(response){
    		console.log(response);
    	});
    }
    
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }
  })
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });

    };
  })
  