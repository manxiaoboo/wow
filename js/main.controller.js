(function(){
  var app = angular.module('app');
  app.filter(
    'to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        }
    }]
);

  app.controller('MainCtrl',function($scope,maindata,ngDialog){
      $scope.datas = maindata;
      $scope.currentStory = {};
      $scope.currentSection = 0;
      $scope.chooseStory = chooseStory;
      $scope.chooseSection = chooseSection;
      $scope.goback = goback;

      $scope.persondetail = function (p) {
        ngDialog.open({ template: 'appformWarning', data:p});
    };

    function goback(){
      $scope.currentSection = 0;
    }

    function chooseSection(s){
      $scope.currentSection = s.id;
    }

      function chooseStory(s){
        $scope.currentStory = s;
        makeOrgs($scope.currentStory.orgs);
        makeRaces($scope.currentStory.races);
        makePersons();
      }

      function makeOrgs(orgs){
        for(var o in orgs){
          for(var i in maindata.org){
            if(orgs[o]==maindata.org[i].id){
              orgs[o] = maindata.org[i];
            }
          }
        }
        makeLeader(orgs);
      }

      function makeRaces(races){
        for(var o in races){
          for(var i in maindata.race){
            if(races[o]==maindata.race[i].id){
              races[o] = maindata.race[i];
            }
          }
        }
        makePlace(races);
      }

      function makePersons(){
        for(var o in $scope.currentStory.persons){
          for(var i in maindata.person){
            if($scope.currentStory.persons[o]==maindata.person[i].id){
              $scope.currentStory.persons[o] = maindata.person[i];
            }
          }
          makeorg($scope.currentStory.persons[o]);
          makerace($scope.currentStory.persons[o]);
        }
      }

      function makeorg(person){
        for(var o in maindata.org){
          if(maindata.org[o].id==person.org){
            person.org = maindata.org[o];
          }
        }
      }

      function makerace(person){
        for(var o in maindata.race){
          if(maindata.race[o].id==person.race){
            person.race = maindata.race[o];
          }
        }
      }


      function makePlace(races){
        for(var o in races){
          for(var i in maindata.place){
            if(races[o].from==maindata.place[i].id){
              races[o].from = maindata.place[i];
            }
          }
        }
      }

      function makeLeader(orgs){
        for(var o in orgs){
          for(var i in maindata.person){
            if(orgs[o].leader==maindata.person[i].id){
              orgs[o].leader = maindata.person[i].name;
            }
          }
        }
      }

      function init(){
        chooseStory(maindata.story.storys[0]);
      }
      init();
  });
})();
