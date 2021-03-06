﻿(function () {
    "use strict";

    var myAppModule = angular.module('myApp');

    myAppModule.controller('BicycleController', ['$scope', '$location', '$routeParams', 'bicyclesService',
        function ($scope, $location, $routeParams, bicyclesService) {
            $scope.isNew = !$routeParams.bicycleId;

            $scope.bicycleTypes = bicyclesService.getBicycleTypes();

            var originalBicyle = null;

            if ($scope.isNew) {
                $scope.formTitle = "Add new bicycle";
                $scope.bicycle = bicyclesService.createBicycle();
            } else {
                $scope.formTitle = "Update bicycle";
                originalBicyle = bicyclesService.getBicycle($routeParams.bicycleId);
                originalBicyle.$promise.then(function () {
                    $scope.bicycle = angular.copy(originalBicyle);
                });
            }

            $scope.submit = function () {
                if ($scope.isNew) {
                    bicyclesService
                        .addBicycle($scope.bicycle)
                        .then(function () {
                            $location.path('/bicycles');
                        });

                } else {
                    angular.copy($scope.bicycle, originalBicyle);
                    originalBicyle = bicyclesService.updateBicycle(originalBicyle);
                    originalBicyle.$promise.then(function () {
                        $location.path('/bicycles');
                    });
                }
            };

            $scope.cancel = function () {
                $location.path('/bicycles');
            };
        }
    ]);
})();