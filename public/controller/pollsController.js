angular
  .module('MyApp')
  .controller('pollsCtrl', function ($scope, $timeout, $mdSidenav, $log, $http, $compile) {
	  
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };
    
    
//    	$http.get('/fetchName').success(function(response){
//    		var name = response;
//    		console.log("I am back in name controller");
//    		console.log(name);
//    		$scope.firstName=response[0].firstName;
//    		$scope.lastName=response[0].lastName;
//    	});
    	
    	
    	//This function will display the form to add new poll question
    	$scope.poll = false;
    	$scope.addPoll = function(){
        	console.log("Allowing to create new poll now");
    		$http.get('/polls').success(function(response){
    			$scope.poll=true;
        		
        	});
        }
    
    	//This function will submit new poll question
    	$scope.createPoll = function(question){
        	console.log("Adding a new poll question");
    		$http.post('/polls/create',{question:question, id:5}).success(function(response){
    			console.log("Poll question sent to SQL");
    			window.location = '/pollsPageLoad';
        	});
        }

    	
    	// This function will load all the poll questions
    	$scope.pollQuestions = true;
    	$http.get('/polls').success(function(response){
    		$scope.question=response;
    		console.log(response);
    	});
    
    	$http.get('/polls/:name').success(function(response){
    		console.log("Free load");
    		$scope.answer=response;
    		console.log(response);
    	});
    	
    	
    
    	// Polls Sidenav Function
    	$scope.polls = function(){
        	console.log("Confirmed into polls controller!");
    		$http.get('/polls').success(function(response){
    			window.location = '/pollsPageLoad';
    			//$scope.question=response;
        		//console.log(response);
        	});
        }
    	
    	//This function will fetch poll details
    	$scope.polldetail = function(poll_Id){
    		console.log("in controller " + poll_Id);
    		$http.post('/pollDetails',{poll_Id:poll_Id, id:5}).success(function(response){
    			console.log(response);
    			$scope.pollResponses = response;
    			
    		});
    	}
    	
    	
    	
    	//This function will display the form to add new poll response
    	$scope.pollResp = false;
    	$scope.pollResponse = function(){
        	console.log("Allowing to respond to this poll");
    		$http.get('/polls').success(function(response){
    			$scope.pollResp=true;
        		
        	});
        }
    	
    	
    		
    	//Radio Button for 
    	  $scope.data = {
    		      group1 : 'Banana',
    		      group2 : '2',
    		      group3 : 'avatar-1'
    		    };
    		    $scope.avatarData = [{
    		        id: "avatars:svg-1",
    		        title: 'avatar 1',
    		        value: 'avatar-1'
    		      },{
    		        id: "avatars:svg-2",
    		        title: 'avatar 2',
    		        value: 'avatar-2'
    		      },{
    		        id: "avatars:svg-3",
    		        title: 'avatar 3',
    		        value: 'avatar-3'
    		    }];
    		    $scope.radioData = [
    		      { label: '1', value: 1 },
    		      { label: '2', value: 2 },
    		      { label: '3', value: '3', isDisabled: true },
    		      { label: '4', value: '4' }
    		    ];
    		    $scope.submit = function() {
    		      alert('submit');
    		    };
    		    $scope.addItem = function() {
    		      var r = Math.ceil(Math.random() * 1000);
    		      $scope.radioData.push({ label: r, value: r });
    		    };
    		    $scope.removeItem = function() {
    		      $scope.radioData.pop();
    		    };

    	
    	
    	
    	
    	
    	
    	
    	
    
    
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
  