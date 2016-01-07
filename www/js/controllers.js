angular.module('pensando.controllers', [])
    .controller('PensandoCtrl', function ($scope, $ionicModal, $timeout) {

        $scope.visit = function () {
            $timeout(function () {
                var url = "http://pensando.mj.gov.br";
                window.open(encodeURI(url), '_system', 'location=yes');
                return false;
            })
        };

    });
