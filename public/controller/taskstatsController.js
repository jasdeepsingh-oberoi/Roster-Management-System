angular
  .module('MyApp')
  .controller('StatsCtrl', function ($scope, $timeout, $mdSidenav, $log, $http) {
	  
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };
        
    console.log("Hi i am in task Stat Controller");
    	
    $scope.stats = function(){
		$http.get('/taskStats2').success(function(response){
    		console.log(response);
    		$scope.emailIdStats = response;
    	});
    	console.log("Hi this is from stats function");
	}
    	
    	$scope.TaskWise = function(){
    		$http.get('/taskStats1').success(function(response){
        		console.log(response);
        		$scope.taskIdStats = response;
        	});
        	console.log("Hi this is from stats function");
    	}
    
    
    	$scope.loadTasks = function(){
        	console.log("In load task page controller");
        	window.location = '/loadTasksPage';
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
  