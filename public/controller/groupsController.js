angular
  .module('MyApp')
  .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log, $http) {
	  
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };
        
  
   	
  //This function will display the form to add new Group
	$scope.group = false;
	$scope.addGroup = function(){
    	console.log("Allowing to create new group now");
		$http.get('/groups').success(function(response){
			$scope.group=true;
    		
    	});
    }
  
	
	//This function will create new Group
	$scope.createGroup = function(){
		var groupName = $scope.newgroup.groupName ;
    	console.log("Adding a new group");
		$http.post('/groups/create',{groupName:groupName, id:5}).success(function(response){
			console.log("Group name sent to SQL");
			window.location = '/groupsPageLoad';
    	});
    }
	
	
	
	
	  //This function will display the form to add new Group Member
	$scope.member = false;
	$scope.addMember = function(){
    	console.log("Allowing to add new group member now");
    	$scope.member = true;
    	$http.get('/groups').success(function(response){
    	
    	});
    }
  
	
	//This function will add new Group Members
	$scope.newMember = function(){
		var emailid = $scope.newgroup.emailid ;
    	console.log("Adding a new member to the group");
		$http.post('/groups/addmember',{emailid:emailid, id:5}).success(function(response){
			console.log("Group Member emailid sent to SQL");
			window.location = '/groupsPageLoad';
    	});
    }
	
	
	
	
    
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
  