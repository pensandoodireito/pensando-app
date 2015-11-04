/**
 * Created by josafa on 25/10/15.
 */
angular.module('pensando.publicacoes')
    .controller('PublicacaoCtrl', function ($scope, $ionicPlatform, $timeout, $cordovaFileTransfer, publicacao) {

        $scope.publicacao = publicacao;

        $scope.changeDesc = function () {
            $scope.publicacao.description = "Olaaaa";
        };

        $ionicPlatform.ready(function () {
            $scope.download = function () {
                var url = $scope.publicacao.downloadUrl;

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
