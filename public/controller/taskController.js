angular
  .module('MyApp')
  .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log, $http) {
	  
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };
        
    console.log("Hi i am in task Controller");
    
    
  //This function will display the form to add new poll question
	$scope.task = false;
	$scope.addTask = function(){
    	console.log("Allowing to create new poll now");
		$http.get('/fetchTasks').success(function(response){
			$scope.task=true;
    		
    	});
    }
    
    
    
    	$http.get('/fetchName').success(function(response){
    		var name = response;
    		console.log("I am back in name controller");
    		$scope.firstName=response[0].firstName;
    		$scope.lastName=response[0].lastName;
    		console.log($scope.firstName);
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
    	
    	

    	   	
	    	$http.get('/fetchTasks').success(function(response){
	    		console.log(response);
	    		$scope.overDueTasks = response;
	    	});
	    	
	    	$http.get('/fetchUpcomingTask').success(function(response){
	    		console.log(response);
	    		$scope.upcomingTasks = response;
	    	});
	    	
	    	$scope.taskDone = function(taskId){
	    		$http.post('/signofftask', {taskId:taskId}).success(function(response){
		    		console.log(response);
		    		window.location = '/loadTasksPage';
		    		
		    	});
	    	}
	    	
	    	$scope.createNewTask = function(){
	    		console.log($scope.newTaskName);
	    		console.log($scope.newTaskDate);
	    		console.log($scope.newTaskTime);
	    		console.log($scope.newTaskTimeTaken);
	    		console.log($scope.repetition);
	    		var newtime =  $scope.newTaskTime;
	    		var newtime1 = newtime + " ";
	    		var dueTime = newtime1.slice(15,24);
	    		console.log(dueTime);
	    		$http.post('/createtask',
	    				{taskName:$scope.newTaskName, dueDate:$scope.newTaskDate, dueTime:dueTime, timeTaken:$scope.newTaskTimeTaken, repetition: $scope.repetition }).success(function(response){
	    			console.log(response);
	    		});
	    		$scope.newTaskName = "";
	    		$scope.newTaskDate = "";
	    		$scope.newTaskTime = "";
	    		$scope.newTaskTimeTaken = "";
	    		$scope.repetition = "";
	    	}
	    	
	    	$scope.addMember = function(){
	    		console.log($scope.precedence);
	    		console.log($scope.emailId);
	    		$http.post('/addmember',{precedence:$scope.precedence, emailId:$scope.emailId}).success(function(response){
		    		console.log(response);
		    		$scope.overDueTasks = response;
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
  