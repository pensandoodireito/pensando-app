/**
 * Created by josafa on 25/10/15.
 */
angular.module('pensando.publicacoes')
    .controller('PublicacaoCtrl', function ($scope, $stateParams, $ionicPlatform, $timeout, $cordovaFileTransfer, PublicacoesService) {

        $scope.publicacao = PublicacoesService.getPublicacao($stateParams.publicacaoID);

        $scope.changeDesc = function () {
            $scope.publicacao.description = "Olaaaa";
        };

        $ionicPlatform.ready(function () {
            $scope.download = function () {
                var url = "http://pensando.mj.gov.br/wp-content/uploads/2015/10/PoD_56_atualizada_011020153.pdf";

                var filename = url.split("/").pop();

                var targetPath = cordova.file.externalRootDirectory + filename;

                $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
                    console.log('Success');
                }, function (error) {
                    console.log('Error');
                }, function (progress) {
                    $timeout(function () {
                        $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                    })
                });
            }
        });
    }
);
