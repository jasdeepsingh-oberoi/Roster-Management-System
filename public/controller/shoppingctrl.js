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
    
    	$scope.loadTasks = function(){
        	console.log("In load task page controller");
        	window.location = '/loadTasksPage';
        }
    	
    	$scope.loadshopping = function(){
        	console.log("In load shopping page controller");
        	window.location = '/loadshoppingPage';
        }
    	
    	
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
    
    
    //Shopping Functions
    
    
  //This function will display the form to add new shopping item
	$scope.shopInput = false;
	$scope.addShoppingView = function(){
    	console.log("Allowing to add new shopping item");
		$http.get('/loadshoppingPage').success(function(response){
			$scope.shopInput=true;
    		
    	});
    }
    
    
    
    $scope.addShop = function(){
    	ItemName = $scope.ItemName;
    	console.log(ItemName);
    $http.post('/shoppinglist',{ItemName:ItemName}).success(function(response){
    console.log("Into the function");
    window.location = '/loadshoppingPage'
     });
    }
    
    
    $scope.shopComplete = function(itemId){
    	//itemId = $scope.itemId;
    	console.log(itemId);
    $http.post('/shoppinglist/complete',{itemId:itemId}).success(function(response){
    console.log("Into the function");
    console.log(response);
        window.location = '/loadshoppingPage';
     });
    }
    
    
     
    $http.get('/fetchshopitems').success(function(response){
    	console.log("Fetching Items");
    	console.log(response);
    	$scope.dueItems = response;
    });
    
    
    
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
  