


'use strict';

var $urlRouterProviderRef = null;
var $stateProviderRef = null;


var myApp = angular.module('myApp', ['ui.router']);
var Language = [];

myApp.constant("AllserviceLinks", itemArray);



myApp.factory('TemplateFactory', function ($http, TemplateService, AllserviceLinks) {

    var fac = {};

    fac.HeaderTemplate = function () {
        var templateUrl = fac.FindTemplateUrl("HeaderTemplate");

        return templateUrl;
        //return $http.get(templateUrl).then(function (response) {
        //    var getTemplate = "";
        //    var data2 = Object.keys(response.data.fields);

        //    for (var i = 0; i < Object.keys(response.data.fields).length; i++) {
        //        var getkey = data2[i];
        //        getTemplate = response.data.fields[getkey];

        //    }

        //    return getTemplate;
        //});
    };

    fac.MasterPageTemplate = function () {
        var CssUrl = fac.FindTemplateUrl("MasterTemplate");

        return CssUrl;
        //return $http.get(CssUrl).then(function (response) {
        //    var getCssTemplate = "";
        //    var data2 = Object.keys(response.data.fields);

        //    for (var i = 0; i < Object.keys(response.data.fields).length; i++) {
        //        var getkey = data2[i];
        //        getCssTemplate = response.data.fields[getkey];
        //    }

        //    return getCssTemplate;
        //});
    };

    fac.AboutTemplate = function () {
        var templateUrl = fac.FindTemplateUrl("About");

        return templateUrl;
        //return $http.get(templateUrl).then(function (response) {
        //    var getTemplate = "";
        //    var data2 = Object.keys(response.data.fields);

        //    for (var i = 0; i < Object.keys(response.data.fields).length; i++) {
        //        var getkey = data2[i];
        //        getTemplate = response.data.fields[getkey];
        //    }

        //    return getTemplate;
        //});
    };

    fac.ContactTemplate = function () {
        var templateUrl = fac.FindTemplateUrl("ContactTemplate");

        return $http.get(templateUrl).then(function (response) {
            var getTemplate = "";
            var data2 = Object.keys(response.data.fields);

            for (var i = 0; i < Object.keys(response.data.fields).length; i++) {
                var getkey = data2[i];
                getTemplate = response.data.fields[getkey];
            }

            return getTemplate;
        });
    };

    fac.CssTemplate = function () {
        var CssUrl = fac.FindTemplateUrl("CssTemplate");
        return $http.get(CssUrl).then(function (response) {
            var getCssTemplate = "";
            var data2 = Object.keys(response.data.fields);

            for (var i = 0; i < Object.keys(response.data.fields).length; i++) {
                var getkey = data2[i];
                getCssTemplate = response.data.fields[getkey];
            }

            return getCssTemplate;
        });
    };

    fac.loadCss = function () {

        var CssUrl = fac.FindTemplateUrl("loadCss");
        return $http.get(CssUrl).then(function (response) {
            //var getCss = response.data.fields.file["url"];
            return "";
        });
    };

    fac.SiteLogo = function () {
        var SiteLogoUrl = fac.FindTemplateUrl("HeaderLogo");
        return $http.get(SiteLogoUrl).then(function (response) {
            //var getLogo = response.data.fields.file["url"];
            return "";
        });
    };

    fac.MenuList = function () {
   
        var getMenuUrl = fac.FindTemplateUrl("MenuList");
        return $http.get(getMenuUrl).then(function (response) {

            var getMenu = response.data.fields.items;

            return getMenu;

        });
    };

    fac.ContentImage = function () {

        var ContentImage = fac.FindTemplateUrl("ContentImage");
        var getContentImage = "";

        return $http.get(ContentImage).then(function (response) {
            //getContentImage = response.data.fields.file["url"];

            return getContentImage;

        });

    }

    fac.FindTemplateUrl = function (itemname) {

        var GetLanguage = localStorage.getItem("Language");


        //var GetbyCountry = AllserviceLinks.filter(function (item) {
        //    return item.name == GetLanguage;
        //});

        //var found = GetbyCountry[0].value.filter(function (item) {

        //    return item.name === name;
        //});

        // return found[0]["value"];
        var getallPageContent = 'contentPage';
        return contentfulClient.getEntries({
            content_type: getallPageContent
        })
               .then(function (entries) {
                   if (itemArray.length > 0) {
                       var found = itemArray.filter(function (item) {

                           return item.name === itemname;
                       });
                       if (found.length == 0) {
                           return "";
                       }

                       return found[0]["value"];
                   }
                   else {
                       for (var i = 0; i < entries.items.length; i++) {
                           var item = entries.items[i];
                           var name = item.fields.name;
                           var value = item.fields.contentHtml;
                           itemArray.push({ name: name, value: value });
                       }

                       contentfulClient.getEntries({
                           content_type: getallTemplate
                       })
                            .then(function (entries) {

                                for (var i = 0; i < entries.items.length; i++) {
                                    var item = entries.items[i];
                                    var name = item.fields.name;
                                    var value = item.fields.templateHtml;
                                    itemArray.push({ name: name, value: value });
                                }


                                var found = itemArray.filter(function (item) {

                                    return item.name === itemname;
                                });
                                if (found.length == 0) {
                                    return "";
                                }

                                return found[0]["value"];

                            });
                   }


               });


    };

    fac.GetMenu = function () {

        //var ContentImage = "https://cdn.contentful.com/spaces/5apyelty246d/entries?access_token=773aedf687a4f49bec8a32ba7c066ca314621a4d160b9495d9fc12e5db632f3d&include=3";
        var ContentImage = "https://cdn.contentful.com/spaces/xxibdgizewrj/entries/?access_token=b86f576d6b2982c6e289dfc7b978de2709c8e346dbc04b222a522b8c11c9eba6";
       
        return $http.get(ContentImage).then(function (response) {
         
            var MenuList = [];
            var AllMenu = response.data.items;
            var GetMainMenu = fac.GetMainMenu(AllMenu);
            GetMainMenu = fac.sort(GetMainMenu, 'rank', 'asc');
            for (var i = 0; i < GetMainMenu.length ; i++) {

                var ParentMenu = GetMainMenu[i]; // Get All Parent Menu ["Home","About","Contact"]

                var Parentname = ParentMenu.fields["menuname"];
                var Parenturl = ParentMenu.fields["url"];

                if (fac.IsSubMenu(ParentMenu)) { // Check Is any sub menu 

                    var second_level = [];

                    var secondlevel_menu = fac.GetSubMenu(AllMenu, ParentMenu); // Get Submenu list by ParentMenu ID
                    secondlevel_menu = fac.sort(secondlevel_menu, 'rank', 'asc');
                    for (var k = 0; k < secondlevel_menu.length ; k++) {
                        var thirdlevel_menu = [];
                        var secondmenudetail = [];
                        if (fac.IsSubMenu(secondlevel_menu[k])) {

                            var get_thirdlevel_menu = fac.GetSubMenu(AllMenu, secondlevel_menu[k]);
                            //thirdlevel_menu.push(get_thirdlevel_menu)
                            var name = get_thirdlevel_menu[0].fields.submenuname;
                            var url = get_thirdlevel_menu[0].fields.url;
                            thirdlevel_menu.push({ name: name, url: url });
                        }
                        var name = secondlevel_menu[k].fields.submenuname;
                        var url = secondlevel_menu[k].fields.url;
                        if (thirdlevel_menu.length <= 0) {

                            second_level.push({ name: name, url: url, Thirdlevel: [] });
                        }
                        else {

                            second_level.push({ name: name, url: url, Thirdlevel: thirdlevel_menu });
                        }
                    }


                    MenuList.push({ name: Parentname, url: Parenturl, Secondlevel: second_level }); // Create Menu Array
                }
                else {
                    MenuList.push({ name: Parentname, url: Parenturl, Secondlevel: [] });
                }

            }


            return MenuList;

        });
    };

    fac.GetMenubyId = function (MenuArray, id) {
        // response.data.items

        var found = MenuArray.filter(function (item) {
            return (item.sys.id === id);
        });

        return found;
    }

    fac.GetMainMenu = function (MenuArray) {
        var MainMenu = [];

        var found = MenuArray.filter(function (item) {

            if (item.sys.contentType.sys.id == "menu") {
                MainMenu.push(item);
            }

            return MainMenu;
        });

        return MainMenu;


    }

    fac.IsSubMenu = function (Menu) {
        //response.data.items[i]
        if (Menu.fields.submenuref != undefined) {
            return true;
        }
        else {
            return false;
        }

    }

    fac.GetSubMenu = function (MenuArray, Menu) {
        var submenulist = [];
        for (var k = 0; k < Menu.fields.submenuref.length ; k++) {
            var id = Menu.fields.submenuref[k].sys.id;

            var found = fac.GetMenubyId(MenuArray, id);

            submenulist.push(found[0]);
        }

        return submenulist;
    }

    fac.sort = function (data, key, way) {
        return data.sort(function (a, b) {
            var x = a.fields[key];
            var y = b.fields[key];
            if (way === 'asc') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
            if (way === 'desc') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
        });
    }

    fac.FooterTemplate = function () {
        var templateUrl = fac.FindTemplateUrl("FooterTemplate");
        return templateUrl;
        //return $http.get(templateUrl).then(function (response) {
        //    var getTemplate = "";
        //    var data2 = Object.keys(response.data.fields);

        //    for (var i = 0; i < Object.keys(response.data.fields).length; i++) {
        //        var getkey = data2[i];
        //        getTemplate = response.data.fields[getkey];
        //    }

        //    return getTemplate;
        //});
    };

    fac.HomeTemplate = function () {
        var templateUrl = fac.FindTemplateUrl("Home");
        return templateUrl;
        //return $http.get(templateUrl).then(function (response) {
        //    var getTemplate = "";
        //    var data2 = Object.keys(response.data.fields);

        //    for (var i = 0; i < Object.keys(response.data.fields).length; i++) {
        //        var getkey = data2[i];
        //        getTemplate = response.data.fields[getkey];
        //    }

        //    return getTemplate;
        //});
    };

    return fac;

});

myApp.service('TemplateService', function ($http) {
    return {
        GetImage: function () {
            //var ContentImage = "https://cdn.contentful.com/spaces/8qulg98piw8g/assets/3xxzvCwjEIeE2WAkyCwsQY?access_token=71e4b1a9712dd91d2d905aef1e27d6afe6028d0018346ee2ed43ea3a61b96460";
            var ContentImage = "https://cdn.contentful.com/spaces/5apyelty246d/entries?access_token=773aedf687a4f49bec8a32ba7c066ca314621a4d160b9495d9fc12e5db632f3d&include=3";


            return $http.get(ContentImage).then(function (response) {

                var employees = [];

                for (var i = 0; i < response.data.items.length ; i++) {
                    if (response.data.items[i].sys.contentType.sys.id === "menu") {

                        if (response.data.items[i].fields.submenuref != undefined && response.data.items[i].fields.submenuref.length > 0) {
                            var submenulist = [];
                            for (var k = 0; k < response.data.items[i].fields.submenuref.length ; k++) {
                                var id = response.data.items[i].fields.submenuref[k].sys.id;

                                var found = response.data.items.filter(function (item) {
                                    return (item.sys.id === id);
                                });
                                submenulist.push(found[0].fields.submenuname);
                            }

                            employees.push({ Menu: response.data.items[i].fields["menuname"], Submenu: submenulist });
                        }
                        else {
                            employees.push({ Menu: response.data.items[i].fields["menuname"], Submenu: [] });
                        }
                    }
                }

                var getContentImage = response.data.fields.file["url"];
                return "";

            });

        },

        GetMenuNamebyId: function (MenuArray, id) {
            var found = MenuArray.filter(function (item) {
                return (item.sys.id === id);
            });

        }
    }

});

myApp.directive('master', function ($compile, $http, TemplateFactory) {
    var template = "";
    var InnerHtml = "";
    var WelcomePageTemplate = '';
    var getTemplate = function (contentType) {

        if (contentType == "Header") {
            $http.get(url).then(function (response) {

                var data2 = Object.keys(response.data.fields);
                for (var i = 0; i < Object.keys(response.data.fields).length; i++) {
                    var getkey = data2[i];
                    InnerHtml = response.data.fields[getkey];


                }

                WelcomePageTemplate = InnerHtml;
            });

            template = WelcomePageTemplate;
        }

        return template;
    };

    var linker = function (scope, element, attrs) {
        var item = itemArray;
        //var data = TemplateFactory.MasterPageTemplate();
        //element.html(data);
        //$compile(element.contents())(scope);
        var GetBodyTemplate = TemplateFactory.MasterPageTemplate().then(function (data) {
           
            element.html(data);
            $compile(element.contents())(scope);
        });
    };

    return {
        restrict: "EA",
        replace: true,

        link: linker,

        controller: function ($scope) {

            // $scope.welcome = "Hello ....";
            TemplateFactory.SiteLogo().then(function (data) {

                $scope.logo = data;
            });


            TemplateFactory.ContentImage().then(function (data) {

                $scope.ContentImage = data;
            });
        }
    };

});

myApp.directive('header', function ($compile, $http, TemplateFactory, TemplateService) {

    var loadCssUrl = "";
    var HeaderTemplate = "";
  

    var linker = function (scope, element, attrs) {

        var HeaderTemplate = TemplateFactory.HeaderTemplate().then(function (data) {
            
            element.html(data);
            $compile(element.contents())(scope);
        });;
        
        //var LoadCss = TemplateFactory.loadCss().then(function (data) {
        //    //scope.item = data;

        //    element.html(HeaderTemplate);
        //    $compile(element.contents())(scope);

        //});

    };

    return {
        restrict: "EA",
        replace: true,
        link: linker,
        controller: function ($scope) {
            //var GetMenu = TemplateFactory.MenuList().then(function (data) {
            //    $scope.menulist = data;
            //});

            var check = TemplateFactory.GetMenu().then(function (data) {
                $scope.FirstlvelMenu = data;
            });
        }
    };


});

myApp.directive('cssload', function ($compile, $http, TemplateFactory, TemplateService) {

    var loadCssUrl = "";
    var CssTemplate = "";
    var LoadTemplate = TemplateFactory.CssTemplate().then(function (data) {
        CssTemplate = data;
    });
    //var SiteLogo = "";
    //var SiteLogoImage = TemplateFactory.SiteLogo().then(function (data) {
    //    SiteLogo = data;
    //});

    //var ContentImage = "";
    //var GetImage = TemplateFactory.ContentImage().then(function (data) {
    //    ContentImage = data;
    //});



    var linker = function (scope, element, attrs) {

        var LoadCss = TemplateFactory.loadCss().then(function (data) {
            scope.item = data;
            //scope.logo = SiteLogo;
            //scope.ContentImage = ContentImage;

            element.html(CssTemplate);
            $compile(element.contents())(scope);

        });

    };

    return {
        restrict: "EA",
        replace: true,
        link: linker,
        controller: function ($scope) {
            //var GetMenu = TemplateFactory.MenuList().then(function (data) {
            //    $scope.menulist = data;
            //});



        }
    };


});

angular.module('myApp').controller('MyCtrl', function ($scope, $http, TemplateFactory) {


});

myApp.directive('contact', function ($compile, $http, TemplateFactory) {

    var linker = function (scope, element, attrs) {
        var LoadTemplate = TemplateFactory.ContactTemplate().then(function (data) {
            element.html(data);
            $compile(element.contents())(scope);
        });


    };

    return {
        restrict: "EA",
        replace: true,
        link: linker,
        controller: function ($scope) {

        }
    };


});

myApp.directive('home', function ($compile, $http, TemplateFactory) {

    var linker = function (scope, element, attrs) {

        var LoadTemplate = TemplateFactory.HomeTemplate().then(function (data) {
           
            element.html(data);
            $compile(element.contents())(scope);
        });

        //var LoadTemplate = TemplateFactory.HomeTemplate();
        //element.html(LoadTemplate);
        //$compile(element.contents())(scope);
    };

    return {
        restrict: "EA",
        replace: true,
        link: linker,
        controller: function ($scope) {

        }
    };


});

myApp.directive('about', function ($compile, $http, TemplateFactory) {

    var linker = function (scope, element, attrs) {

        var LoadTemplate = TemplateFactory.AboutTemplate().then(function (data) {
            element.html(data);
            $compile(element.contents())(scope);
        });

        //var LoadTemplate = TemplateFactory.AboutTemplate();
        //element.html(LoadTemplate);
        //$compile(element.contents())(scope);

    };

    return {
        restrict: "EA",
        replace: true,
        link: linker,
        controller: function ($scope) {

        }
    };


});

myApp.directive('footer', function ($compile, $http, TemplateFactory, TemplateService) {


    var linker = function (scope, element, attrs) {

        var LoadTemplate = TemplateFactory.FooterTemplate().then(function (data) {
            element.html(data);
            $compile(element.contents())(scope);
        });

        //var LoadTemplate = TemplateFactory.FooterTemplate();
        //element.html(LoadTemplate);
        //$compile(element.contents())(scope);

    };

    return {
        restrict: "EA",
        replace: true,
        link: linker,
        controller: function ($scope) {

        }
    };


});


myApp.config(function ($locationProvider, $urlRouterProvider, $stateProvider) {
    $urlRouterProviderRef = $urlRouterProvider;

    $locationProvider.html5Mode(false);
    $stateProviderRef = $stateProvider;

});

myApp.run(['$q', '$rootScope', '$state', '$http',
  function ($q, $rootScope, $state, $http) {



      var SetLanguage = [];
      SetLanguage.push({
          language: "US",
          website: "phpcontentful.herokuapp.com"
      });
      SetLanguage.push({
          language: "FR",
          website: "angularhtmlfr.herokuapp.com"
      });


      var GetLanguagebyWebsite = SetLanguage.filter(function (item) {
          return item.website == window.location.hostname;
      });

      localStorage.setItem("Language", GetLanguagebyWebsite[0].language);

      $http.get("https://cdn.contentful.com/spaces/87loyxvyy7e8/entries/S7BeMlaImWOYeqcmwKQqs?access_token=552c7353bf5fa69059c37ef028908a4d331f790c5e074676e302a01ed3abb9aa")
     .success(function (data) {
         angular.forEach(data.fields.route, function (value, key) {
             var state = {
                 "url": value.url,
                 "parent": value.parent,
                 "abstract": value.abstract,
                 "views": {}
             };

             angular.forEach(value.views, function (view) {
                 state.views[view.name] = {
                     template: view.templateUrl,
                 };
             });

             $stateProviderRef.state(value.name, state);
         });
         $state.go("root");
     });
  }]);
