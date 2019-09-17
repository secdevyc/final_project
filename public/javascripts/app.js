const app = angular.module("Fitbook", []);

app.controller("MainController", ["$http", function($http){
  const controller = this;
  this.indexOfEditForm = false;


  this.getPosts = () => {
    $http({
      method: "GET",
      url: "/posts"
    }).then((response) => {
      this.posts = response.data;
    }, (error) => {
      console.log(error);
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
                controller.getPosts();
              }, function(error) {
                  console.log(error);
    });
  }

  this.deletePost = (post) => {
    $http({
      method: "DELETE",
      url: "/posts/" + post._id
    }).then((response) => {
      this.getPosts();
    }, (err) => {
      console.log(error);
    });
  };

  this.editPost = (post) => {
    $http({
      method: "PUT",
      url: "/posts/" + post._id,
      data: {
        name: this.updatedName,
        image: this.updatedImage,
        workout: this.updatedWorkout,
        intensity: this.updatedIntensity,
        feel_good: this.updatedFeelGood,
        new_goal: this.updatedNewGoal
      }
    }).then((response) => {
      console.log(response.data);
      this.indexOfEditForm = !this.indexOfEditForm;
      this.getPosts();
    }, (error) => {
      console.log(error);
    })
  }

this.getPosts();

}]);
