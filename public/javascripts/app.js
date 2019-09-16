const app = angular.module("Fitbook", []);

app.controller("MainController", ["$http", function($http){

  this.getPosts = () => {
    $http({
      method: "GET",
      url: "/posts"
    }).then((response) => {
      this.posts = response.data;
    }, (err) => {
      console.log(err);
    });
  }

  this.createPost = () => {
    $http({
      method: "POST",
      url: "/posts",
      data: {
                name: this.name,
                image: this.image,
                workout: this.workout,
                intensity: this.intensity,
                new_goal: this.new_goal,
                feel_good: this.feel_good
              }
    }).then(function(response) {
      console.log(response);
                this.name = null;
                this.image = null;
                this.workout = null;
                this.intensity = null;
                this.new_goal = null;
                this.getPosts();
              }, function(error) {
                  console.log(error);
    });
  }

this.getPosts();

}]);
