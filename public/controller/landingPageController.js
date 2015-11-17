angular.module('MyApp').controller('DemoCtrl', function($scope, $http) {
    $scope.user = {
      title: 'ajeet',
      email: '',
      firstName: '',
      lastName: '',
      company: 'Google',
      address: '1600 Amphitheatre Pkwy',
      city: 'Mountain View',
      state: 'CA',
      biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
      postalCode: '94043'
    };
    
    $scope.login = function(){
    	console.log("Hi i am in controller");
    	console.log($scope.user.email);
    	console.log($scope.user.password);
		$http.post('/login',{emailId : $scope.user.email, password : $scope.user.password}).success(function(response){
			var result = response;
			console.log("Hi i am back controller");
			console.log(result);
			
		});

	};

    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function(state) {
        return {abbrev: state};
      })
      
  })
  .config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  });
        
        