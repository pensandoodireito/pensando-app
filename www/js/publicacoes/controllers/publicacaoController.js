/**
 * Created by josafa on 25/10/15.
 */
angular.module('pensando.publicacoes')
    .controller('PublicacaoCtrl', function ($scope, $ionicPlatform, $timeout, $cordovaFile,
                                            $cordovaFileTransfer, $cordovaFileOpener2,
                                            $cordovaProgress, $state, publicacao, $ionicLoading, $ionicPopup) {

        $scope.publicacao = publicacao.data;

        $scope.targetPath = null;

        $scope.filename = null;

        $scope.progress = 0;

        $scope.download = function () {

            document.addEventListener('deviceready', function () {
                var url = $scope.publicacao.publicacao_url;

                $scope.filename = url.split("/").pop();

                $scope.targetPath = cordova.file.externalRootDirectory + $scope.filename;

                $cordovaFile.checkFile(cordova.file.externalRootDirectory, $scope.filename)
                    .then(function (success) {
                        $ionicPopup.alert({
                            title: 'Arquivo baixado!',
                            template: 'O arquivo já foi baixado. Utilize os botões abrir ou visualizar'
                        });
                    }, function (error) {
                        $ionicLoading.show({
                            template: 'Carregando publicação...'
                        });

                        $cordovaFileTransfer.download(url, $scope.targetPath, {}, true).then(function (result) {
                            $scope.progress = 100;
                            $ionicLoading.hide();
                        }, function (error) {
                            $ionicPopup.alert({
                                title: 'Erro!',
                                template: 'Ocorreu um erro ao efetuar o download da publicação'
                            });
                            $ionicLoading.hide();
                            console.log('Error downloading');
                            console.log(error);
                        }, function (progress) {
                            $timeout(function () {
                                $scope.progress = (progress.loaded / progress.total) * 100;
                            });
                        });
                    }
                );
            });
        }

        $scope.FileOpener2 = function () {
            document.addEventListener('deviceready', function () {
                $cordovaFile.checkFile(cordova.file.externalRootDirectory, $scope.filename)
                    .then(function (success) {
                        $cordovaFileOpener2.open($scope.targetPath, 'application/pdf')
                            .then(function () {
                                console.log('Success opening');
                            }, function (err) {
                                alert('Erro ao abrir arquivo');
                                console.log('Error opening: ' + JSON.stringify(err));
                            }
                        );
                    }, function (error) {
                        alert('arquivo não existe');
                    });
            });
        };

        $scope.view = function () {

            if (ionic.Platform.platform() == 'linux') {
                $state.go('app.pdf', {publicacaoID: $scope.publicacao.id, publicacao: publicacao});
            } else {
                document.addEventListener('deviceready', function () {
                    $cordovaFile.checkFile(cordova.file.externalRootDirectory, $scope.filename)
                        .then(function (success) {
                            $state.go('app.pdf', {publicacaoID: $scope.publicacao.id, publicacao: publicacao});
                        }, function (error) {
                            alert('arquivo não existe');
                        });
                });
            }
        };
    }
)
;
