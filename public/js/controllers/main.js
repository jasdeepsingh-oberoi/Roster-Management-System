materialAdmin
    // =========================================================================
    // Base controller for common functions
    // =========================================================================

    .controller('materialadminCtrl', function($timeout, $state, growlService){
        //Welcome Message
        
        
        
        // Detact Mobile Browser
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
           angular.element('html').addClass('ismobile');
        }

        // By default Sidbars are hidden in boxed layout and in wide layout only the right sidebar is hidden.
        this.sidebarToggle = {
            left: false,
            right: false
        }

        // By default template has a boxed layout
        this.layoutType = localStorage.getItem('ma-layout-status');
        
        // For Mainmenu Active Class
        this.$state = $state;    
        
        //Close sidebar on click
        this.sidebarStat = function(event) {
            if (!angular.element(event.target).parent().hasClass('active')) {
                this.sidebarToggle.left = false;
            }
        }
        
        //Listview Search (Check listview pages)
        this.listviewSearchStat = false;
        
        this.lvSearch = function() {
            this.listviewSearchStat = true; 
        }
        
        //Listview menu toggle in small screens
        this.lvMenuStat = false;
        
        //Blog
        this.wallCommenting = [];
        
        this.wallImage = false;
        this.wallVideo = false;
        this.wallLink = false;
    })

    
    // =========================================================================
    // Tasks Controller
    // =========================================================================
    
    	.controller('appCtrl', function($scope,$http){
    // Get Best Selling widget Data
    		
    		$scope.task = false;	
    	console.log("Hi from task Controller");
    	
    	$http.get('/fetchTasks').success(function(response){
    		console.log(response);
    		$scope.overDueTasks = response;
    	});
    	
    	
    	$http.get('/fetchUpcomingTask').success(function(response){
    		console.log(response);
    		$scope.upcomingTasks = response;
    	});
    	
    	
    	$scope.addTask = function(){
        	console.log("Allowing to create new task now");
    		$http.get('/fetchTasks').success(function(response){
    			$scope.task=true;
        		
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
    	
    	
    	$http.get('/fetchName').success(function(response){
    		var name = response;
    		console.log("I am back in name controller");
    		$scope.firstName=response[0].firstName;
    		$scope.lastName=response[0].lastName;
    		console.log($scope.firstName);
    	});
    	
    	$scope.taskDone = function(taskId){
    		$http.post('/signofftask', {taskId:taskId}).success(function(response){
	    		console.log(response);
	    		window.location = '/loadTasksPage';
	    		
	    	});
    	}
   
    	})
    

    //=================================================
    //shopping
    //====================================================
    
      .controller('shoppingAjeet', function($scope,$http){
    	 console.log("Shopping List Controller is connected now");
    	 
    	 $scope.shopInput = false;
    	 
    	 $http.get('/fetchshopitems').success(function(response){
    	    	console.log("Fetching Items");
    	    	console.log(response);
    	    	$scope.dueItems = response;
    	    });
    	 
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
    })
    
    
    
    // =========================================================================
    // Stats Controller
    // =========================================================================

	.controller('statsCtrl', function($scope, $http){
	    console.log("This is from stats Controller");
	    
		$http.get('/taskStats2').success(function(response){
    		console.log(response);
    		$scope.emailIdStats = response;
    	});
		
		$scope.TaskWise = function(){
    		$http.get('/taskStats1').success(function(response){
        		console.log(response);
        		$scope.taskIdStats = response;
        	});
        	console.log("Hi this is from stats function");
    	}
	})
	
	
	 // =========================================================================
    // Groups Controller
    // =========================================================================

	.controller('groupsCtrl', function($scope, $http){
	    console.log("This is from Groups Controller");
	    $scope.group = false;
	    $scope.member = false;
	    
	    $scope.addGroup = function(){
	    	console.log("Allowing to create new group now");
			$http.get('/groups').success(function(response){
				$scope.group=true;
	    		
	    	});
	    }
	  
	    $scope.createGroup = function(){				//This function will create new Group
			var groupName = $scope.newgroup.groupName ;
	    	console.log("Adding a new group");
			$http.post('/groups/create',{groupName:groupName}).success(function(response){
				console.log("Group name sent to SQL");
				window.location = '/groupsPageLoad';
	    	});
	    }
	    
	    $scope.addMember = function(){				////This function will display the form to add new Group Members
	    	console.log("Allowing to add new group member now");
	    	$scope.member = true;
	    	$http.get('/groups').success(function(response){
	    	
	    	});
	    }
	    
		//This function will add new Group Members
		$scope.newMember = function(){
			var emailid = $scope.newgroup.emailid ;
	    	console.log("Adding a new member to the group");
			$http.post('/groups/addmember',{emailid:emailid}).success(function(response){  
				console.log("Group Member emailid sent to SQL");
				window.location = '/groupsPageLoad';
	    	});
	    }
		
	  
		
	})
	
	
	
	
    // =========================================================================
    // Polls Ajeet Controller
    // =========================================================================
	.controller('pollsAjeetCtrl', function($scope, $http){
	    console.log("This is from Polls Ajeet Controller");
	    
		$scope.pollsPage = function(){
	    	console.log("Confirmed into polls controller!");
	    	window.location = '/pollsPageLoad';
			/*$http.get('/pollsPageLoad').success(function(response){
	    		//window.location = '/pollsPageLoad';
	             console.log(response);
	    	});*/
	    }
		
		
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
    	
    	
    		
    	//Load Distinct Poll Choices 
    	$scope.pollChoice = function(poll_Id){
    		$scope.pollResp=false;
    		console.log("in controller " + poll_Id);
        	console.log("Allowing to choose options");
        	$http.post('/pollAnswers',{poll_Id:poll_Id, id:5}).success(function(responses){
    			console.log(responses);
    			$scope.pollAnswers = responses;
    			$scope.pollResp=true;
    		});
        }
    	
    	
    	//Select Poll Opinion    	
$scope.responseSubmit = function(){
    		
    		console.log("in controller  "  + "and response " + $scope.pollAnswers.response) ;
        	console.log("Poll option selected");
        	$http.post('/pollAnswerSelect',{response:$scope.pollAnswers.response, id:5}).success(function(responses){
    			console.log(responses);
    			$scope.pollSelect = responses;
    			$scope.pollResp=false;
    			
    		});
        }
    	
		
	})
    // =========================================================================
    // Header
    // =========================================================================
    .controller('headerCtrl', function($timeout, messageService){
    
         // Top Search
        this.openSearch = function(){
            angular.element('#header').addClass('search-toggled');
            //growlService.growl('Welcome back Mallinda Hollaway', 'inverse');
        }

        this.closeSearch = function(){
            angular.element('#header').removeClass('search-toggled');
        }
        
        // Get messages and notification for header
        this.img = messageService.img;
        this.user = messageService.user;
        this.user = messageService.text;

        this.messageResult = messageService.getMessage(this.img, this.user, this.text);


        //Clear Notification
        this.clearNotification = function($event) {
            $event.preventDefault();
            
            var x = angular.element($event.target).closest('.listview');
            var y = x.find('.lv-item');
            var z = y.size();
            
            angular.element($event.target).parent().fadeOut();
            
            x.find('.list-group').prepend('<i class="grid-loading hide-it"></i>');
            x.find('.grid-loading').fadeIn(1500);
            var w = 0;
            
            y.each(function(){
                var z = $(this);
                $timeout(function(){
                    z.addClass('animated fadeOutRightBig').delay(1000).queue(function(){
                        z.remove();
                    });
                }, w+=150);
            })
            
            $timeout(function(){
                angular.element('#notifications').addClass('empty');
            }, (z*150)+200);
        }
        
        // Clear Local Storage
        this.clearLocalStorage = function() {
            
            //Get confirmation, if confirmed clear the localStorage
            swal({   
                title: "Are you sure?",   
                text: "All your saved localStorage values will be removed",   
                type: "warning",   
                showCancelButton: true,   
                confirmButtonColor: "#F44336",   
                confirmButtonText: "Yes, delete it!",   
                closeOnConfirm: false 
            }, function(){
                localStorage.clear();
                swal("Done!", "localStorage is cleared", "success"); 
            });
            
        }
        
        //Fullscreen View
        this.fullScreen = function() {
            //Launch
            function launchIntoFullscreen(element) {
                if(element.requestFullscreen) {
                    element.requestFullscreen();
                } else if(element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if(element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if(element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            }

            //Exit
            function exitFullscreen() {
                if(document.exitFullscreen) {
                    document.exitFullscreen();
                } else if(document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if(document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }

            if (exitFullscreen()) {
                launchIntoFullscreen(document.documentElement);
            }
            else {
                launchIntoFullscreen(document.documentElement);
            }
        }
    
    })



    // =========================================================================
    // Best Selling Widget
    // =========================================================================

    .controller('bestsellingCtrl', function(bestsellingService){
        // Get Best Selling widget Data
        this.img = bestsellingService.img;
        this.name = bestsellingService.name;
        this.range = bestsellingService.range; 
        
        this.bsResult = bestsellingService.getBestselling(this.img, this.name, this.range);
    })

 
    // =========================================================================
    // Todo List Widget
    // =========================================================================

    .controller('todoCtrl', function(todoService){
        
        //Get Todo List Widget Data
        this.todo = todoService.todo;
        
        this.tdResult = todoService.getTodo(this.todo);
        
        //Add new Item (closed by default)
        this.addTodoStat = false;
    })


    // =========================================================================
    // Recent Items Widget
    // =========================================================================

    .controller('recentitemCtrl', function(recentitemService){
        
        //Get Recent Items Widget Data
        this.id = recentitemService.id;
        this.name = recentitemService.name;
        this.parseInt = recentitemService.price;
        this.riResult = recentitemService.getRecentitem(this.id, this.name, this.price);
        console.log("Hi from recentitem controller");
        $http.get('/fetchTasks').success(function(response){
        	console.log(response);
        	$scope.OverdueTasks = response;
        });
    })


    // =========================================================================
    // Recent Posts Widget
    // =========================================================================
    
    .controller('recentpostCtrl', function(recentpostService){
        
        //Get Recent Posts Widget Items
        this.img = recentpostService.img;
        this.user = recentpostService.user;
        this.text = recentpostService.text;
        
        this.rpResult = recentpostService.getRecentpost(this.img, this.user, this.text);
    })


    //=================================================
    // Profile
    //=================================================

    .controller('profileCtrl', function(growlService){
        
        //Get Profile Information from profileService Service
        
        //User
        this.profileSummary = "Sed eu est vulputate, fringilla ligula ac, maximus arcu. Donec sed felis vel magna mattis ornare ut non turpis. Sed id arcu elit. Sed nec sagittis tortor. Mauris ante urna, ornare sit amet mollis eu, aliquet ac ligula. Nullam dolor metus, suscipit ac imperdiet nec, consectetur sed ex. Sed cursus porttitor leo.";
    
        this.fullName = "Mallinda Hollaway";
        this.gender = "female";
        this.birthDay = "23/06/1988";
        this.martialStatus = "Single";
        this.mobileNumber = "00971123456789";
        this.emailAddress = "malinda.h@gmail.com";
        this.twitter = "@malinda";
        this.twitterUrl = "twitter.com/malinda";
        this.skype = "malinda.hollaway";
        this.addressSuite = "10098 ABC Towers";
        this.addressCity = "Dubai Silicon Oasis, Dubai";
        this.addressCountry = "United Arab Emirates";
    
    
        //Edit
        this.editSummary = 0;
        this.editInfo = 0;
        this.editContact = 0;
    
        
        this.submit = function(item, message) {            
            if(item === 'profileSummary') {
                this.editSummary = 0;
            }
            
            if(item === 'profileInfo') {
                this.editInfo = 0;
            }
            
            if(item === 'profileContact') {
                this.editContact = 0;
            }
            
            growlService.growl(message+' has updated Successfully!', 'inverse'); 
        }

    })



    //=================================================
    // LOGIN
    //=================================================

    .controller('loginCtrl', function($scope, $http){
        
        //Status
    
        this.login = 1;
        this.register = 0;
        this.forgot = 0;
        console.log("Hi i am in login controllerrrrrrrrrrrrrrrrrrr");
        //Login
        $scope.login = function(){
        	console.log("Hi i am in controller");
        	
        	
        	
        	console.log($scope.emailId);
        	console.log($scope.password);
    		$http.post('/login',{emailId:$scope.emailId, password : $scope.password}).success(function(response){
    			var result = response;
    			console.log("Hi i am back in controller");
    			console.log(result);
    			if(result == "fail"){
    				alert("Wrong EmailId - password");
    				window.location = '/';				
    				}
    			else{
    				window.location = '/loadTasksPage'
    				//window.location = '/home'
    			}
    			
    		});

    	};
    
    	
        //Signup
        $scope.signup = function(){
        	console.log("Hi i am in controller");
        	
        	this.register = 1;
        	
        	console.log($scope.signup.firstName);
        	console.log($scope.signup.lastName);
        	console.log($scope.signup.emailid);
        	console.log($scope.signup.password);
    		
        	$http.post('/signup',{firstName:$scope.signup.firstName, lastName:$scope.signup.lastName,   emailid:$scope.signup.emailid, password :$scope.signup.password}).success(function(response){
    			var result = response;
    			console.log("Hi i am back in controller");
    			console.log(result);
    			window.location = '/';				
    			
    		});

    	};
    	
    	
    	
    	
    
    })


    
    
    //=================================================
    // CALENDAR
    //=================================================
    
    .controller('calendarCtrl', function($modal){
    
        //Create and add Action button with dropdown in Calendar header. 
        this.month = 'month';
    
        this.actionMenu = '<ul class="actions actions-alt" id="fc-actions">' +
                            '<li class="dropdown" dropdown>' +
                                '<a href="" dropdown-toggle><i class="zmdi zmdi-more-vert"></i></a>' +
                                '<ul class="dropdown-menu dropdown-menu-right">' +
                                    '<li class="active">' +
                                        '<a data-calendar-view="month" href="">Month View</a>' +
                                    '</li>' +
                                    '<li>' +
                                        '<a data-calendar-view="basicWeek" href="">Week View</a>' +
                                    '</li>' +
                                    '<li>' +
                                        '<a data-calendar-view="agendaWeek" href="">Agenda Week View</a>' +
                                    '</li>' +
                                    '<li>' +
                                        '<a data-calendar-view="basicDay" href="">Day View</a>' +
                                    '</li>' +
                                    '<li>' +
                                        '<a data-calendar-view="agendaDay" href="">Agenda Day View</a>' +
                                    '</li>' +
                                '</ul>' +
                            '</div>' +
                        '</li>';

            
        //Open new event modal on selecting a day
        this.onSelect = function(argStart, argEnd) {            
            var modalInstance  = $modal.open({
                templateUrl: 'addEvent.html',
                controller: 'addeventCtrl',
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    calendarData: function() {
                        var x = [argStart, argEnd];
                        return x;
                    }
                }
            });
        }
    })

    //Add event Controller (Modal Instance)
    .controller('addeventCtrl', function($scope, $modalInstance, calendarData){
        
        //Calendar Event Data
        $scope.calendarData = {
            eventStartDate: calendarData[0],
            eventEndDate:  calendarData[1]
        };
    
        //Tags
        $scope.tags = [
            'bgm-teal',
            'bgm-red',
            'bgm-pink',
            'bgm-blue',
            'bgm-lime',
            'bgm-green',
            'bgm-cyan',
            'bgm-orange',
            'bgm-purple',
            'bgm-gray',
            'bgm-black',
        ]
        
        //Select Tag
        $scope.currentTag = '';
        
        $scope.onTagClick = function(tag, $index) {
            $scope.activeState = $index;
            $scope.activeTagColor = tag;
        } 
        
        //Add new event
        $scope.addEvent = function() {
            if ($scope.calendarData.eventName) {

                //Render Event
                $('#calendar').fullCalendar('renderEvent',{
                    title: $scope.calendarData.eventName,
                    start: $scope.calendarData.eventStartDate,
                    end:  $scope.calendarData.eventEndDate,
                    allDay: true,
                    className: $scope.activeTagColor

                },true ); //Stick the event

                $scope.activeState = -1;
                $scope.calendarData.eventName = '';     
                $modalInstance.close();
            }
        }
        
        //Dismiss 
        $scope.eventDismiss = function() {
            $modalInstance.dismiss();
        }
    })

    // =========================================================================
    // COMMON FORMS
    // =========================================================================

    .controller('formCtrl', function(){
    
        //Input Slider
        this.nouisliderValue = 4;
        this.nouisliderFrom = 25;
        this.nouisliderTo = 80;
        this.nouisliderRed = 35;
        this.nouisliderBlue = 90;
        this.nouisliderCyan = 20;
        this.nouisliderAmber = 60;
        this.nouisliderGreen = 75;
    
        //Color Picker
        this.color = '#03A9F4';
        this.color2 = '#8BC34A';
        this.color3 = '#F44336';
        this.color4 = '#FFC107';
    })


    // =========================================================================
    // PHOTO GALLERY
    // =========================================================================

    .controller('photoCtrl', function(){
        
        //Default grid size (2)
        this.photoColumn = 'col-md-2';
        this.photoColumnSize = 2;
    
        this.photoOptions = [
            { value: 2, column: 6 },
            { value: 3, column: 4 },
            { value: 4, column: 3 },
            { value: 1, column: 12 },
        ]
    
        //Change grid
        this.photoGrid = function(size) {
            this.photoColumn = 'col-md-'+size;
            this.photoColumnSize = size;
        }
    
    })


    // =========================================================================
    // ANIMATIONS DEMO
    // =========================================================================
    .controller('animCtrl', function($timeout){
        
        //Animation List
        this.attentionSeekers = [
            { animation: 'bounce', target: 'attentionSeeker' },
            { animation: 'flash', target: 'attentionSeeker' },
            { animation: 'pulse', target: 'attentionSeeker' },
            { animation: 'rubberBand', target: 'attentionSeeker' },
            { animation: 'shake', target: 'attentionSeeker' },
            { animation: 'swing', target: 'attentionSeeker' },
            { animation: 'tada', target: 'attentionSeeker' },
            { animation: 'wobble', target: 'attentionSeeker' }
        ]
        this.flippers = [
            { animation: 'flip', target: 'flippers' },
            { animation: 'flipInX', target: 'flippers' },
            { animation: 'flipInY', target: 'flippers' },
            { animation: 'flipOutX', target: 'flippers' },
            { animation: 'flipOutY', target: 'flippers'  }
        ]
         this.lightSpeed = [
            { animation: 'lightSpeedIn', target: 'lightSpeed' },
            { animation: 'lightSpeedOut', target: 'lightSpeed' }
        ]
        this.special = [
            { animation: 'hinge', target: 'special' },
            { animation: 'rollIn', target: 'special' },
            { animation: 'rollOut', target: 'special' }
        ]
        this.bouncingEntrance = [
            { animation: 'bounceIn', target: 'bouncingEntrance' },
            { animation: 'bounceInDown', target: 'bouncingEntrance' },
            { animation: 'bounceInLeft', target: 'bouncingEntrance' },
            { animation: 'bounceInRight', target: 'bouncingEntrance' },
            { animation: 'bounceInUp', target: 'bouncingEntrance'  }
        ]
        this.bouncingExits = [
            { animation: 'bounceOut', target: 'bouncingExits' },
            { animation: 'bounceOutDown', target: 'bouncingExits' },
            { animation: 'bounceOutLeft', target: 'bouncingExits' },
            { animation: 'bounceOutRight', target: 'bouncingExits' },
            { animation: 'bounceOutUp', target: 'bouncingExits'  }
        ]
        this.rotatingEntrances = [
            { animation: 'rotateIn', target: 'rotatingEntrances' },
            { animation: 'rotateInDownLeft', target: 'rotatingEntrances' },
            { animation: 'rotateInDownRight', target: 'rotatingEntrances' },
            { animation: 'rotateInUpLeft', target: 'rotatingEntrances' },
            { animation: 'rotateInUpRight', target: 'rotatingEntrances'  }
        ]
        this.rotatingExits = [
            { animation: 'rotateOut', target: 'rotatingExits' },
            { animation: 'rotateOutDownLeft', target: 'rotatingExits' },
            { animation: 'rotateOutDownRight', target: 'rotatingExits' },
            { animation: 'rotateOutUpLeft', target: 'rotatingExits' },
            { animation: 'rotateOutUpRight', target: 'rotatingExits'  }
        ]
        this.fadeingEntrances = [
            { animation: 'fadeIn', target: 'fadeingEntrances' },
            { animation: 'fadeInDown', target: 'fadeingEntrances' },
            { animation: 'fadeInDownBig', target: 'fadeingEntrances' },
            { animation: 'fadeInLeft', target: 'fadeingEntrances' },
            { animation: 'fadeInLeftBig', target: 'fadeingEntrances'  },
            { animation: 'fadeInRight', target: 'fadeingEntrances'  },
            { animation: 'fadeInRightBig', target: 'fadeingEntrances'  },
            { animation: 'fadeInUp', target: 'fadeingEntrances'  },
            { animation: 'fadeInBig', target: 'fadeingEntrances'  }
        ]
        this.fadeingExits = [
            { animation: 'fadeOut', target: 'fadeingExits' },
            { animation: 'fadeOutDown', target: 'fadeingExits' },
            { animation: 'fadeOutDownBig', target: 'fadeingExits' },
            { animation: 'fadeOutLeft', target: 'fadeingExits' },
            { animation: 'fadeOutLeftBig', target: 'fadeingExits'  },
            { animation: 'fadeOutRight', target: 'fadeingExits'  },
            { animation: 'fadeOutRightBig', target: 'fadeingExits'  },
            { animation: 'fadeOutUp', target: 'fadeingExits'  },
            { animation: 'fadeOutUpBig', target: 'fadeingExits'  }
        ]
        this.zoomEntrances = [
            { animation: 'zoomIn', target: 'zoomEntrances' },
            { animation: 'zoomInDown', target: 'zoomEntrances' },
            { animation: 'zoomInLeft', target: 'zoomEntrances' },
            { animation: 'zoomInRight', target: 'zoomEntrances' },
            { animation: 'zoomInUp', target: 'zoomEntrances'  }
        ]
        this.zoomExits = [
            { animation: 'zoomOut', target: 'zoomExits' },
            { animation: 'zoomOutDown', target: 'zoomExits' },
            { animation: 'zoomOutLeft', target: 'zoomExits' },
            { animation: 'zoomOutRight', target: 'zoomExits' },
            { animation: 'zoomOutUp', target: 'zoomExits'  }
        ]

        //Animate    
        this.ca = '';
    
        this.setAnimation = function(animation, target) {
            if (animation === "hinge") {
                animationDuration = 2100;
            }
            else {
                animationDuration = 1200;
            }
            
            angular.element('#'+target).addClass(animation);
            
            $timeout(function(){
                angular.element('#'+target).removeClass(animation);
            }, animationDuration);
        }
    
    })

