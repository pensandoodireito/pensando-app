/**
 * Created by josafa on 25/10/15.
 */
angular.module('pensando.publicacoes')
    .controller('PublicacaoCtrl', function ($scope, $stateParams, $ionicLoading, $ionicPopup, $timeout, $cordovaFile, $cordovaFileTransfer, $cordovaFileOpener2, PublicacaoFactory) {

        $scope.publicacao = {};
        $scope.fileexists = false;

        /**
         * funções relativas ao carregamento dos dados da publicação
         */
        $scope.loadPublicacao = function () {
            var publicacaoID = $stateParams.publicacaoID;

            PublicacaoFactory.getPublicacao(publicacaoID)
                .then(loadPublicacaoSuccess, loadPublicacaoError);
        };

        function loadPublicacaoSuccess(response) {
            $scope.publicacao = response.data;
            $ionicLoading.hide();
        }

        function loadPublicacaoError(error) {
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Falha ao carregar publicação!',
                template: "Ocorreu um erro ao carregar a publicação. Tente novamente mais tarde!",
                okType: "button-assertive"
            });
            console.log(error);
        }

        $scope.loadPublicacao();

        document.addEventListener('deviceready', function () {

            /**
             * funções relativas ao download da publicação
             */
            $scope.download = function () {
                var dir = getPublicacaoDir();
                var filename = getPublicacaoFilename();

                if (dir && filename) {
                    checkFile(dir, filename, fileAlreadyExists, fileNeedsDownload);
                } else {
                    $ionicPopup.alert({
                        title: 'Falha ao fazer download do arquivo!',
                        template: 'Plataforma não suportada o arquivo não será baixado.',
                        okType: "button-assertive"
                    });
                }
            };

            function checkFile(dir, filename, onSuccess, onError) {
                $cordovaFile.checkFile(dir, filename).then(onSuccess, onError);
            }

            function getPublicacaoDir() {
                var pub_path = "pensando/publicacoes/";

                if (ionic.Platform.isAndroid()) {
                    return cordova.file.externalRootDirectory + pub_path;
                } else if (ionic.Platform.isIOS()) {
                    return cordova.file.documentsDirectory + pub_path;
                }

                return null;
            }

            function getPublicacaoFilename() {
                if ($scope.publicacao && $scope.publicacao.volume) {
                    return "volume-" + $scope.publicacao.volume + ".pdf";
                }

                return null;
            }

            function getPublicacaoFullPath() {
                var dir = getPublicacaoDir();

                if (dir) {
                    return dir + getPublicacaoFilename();
                }

                return null;
            }

            function fileAlreadyExists(data) {
                $scope.fileexists = true;
                openPublicacao();
            }

            function fileNeedsDownload(error) {
                downloadArquivoPublicacao();
            }

            function downloadArquivoPublicacao() {
                $ionicLoading.show({
                    template: 'Baixando publicação...'
                });

                $cordovaFileTransfer.download($scope.publicacao.url, getPublicacaoFullPath(), {}, true)
                    .then(downloadSuccess, downloadError, downloadProgress);
            }

            function downloadSuccess(data) {
                $ionicLoading.hide();
                $scope.fileexists = true;
                openPublicacao();
            }

            function downloadError(error) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Erro!',
                    template: 'Ocorreu um erro ao efetuar o download da publicação',
                    okType: "button-assertive"
                });
                console.error(error);
            }

            function downloadProgress(progress) {
                $timeout(function () {
                    $scope.progress = (progress.loaded / progress.total) * 100;
                    console.info($scope.progress);
                });
            }

            /**
             * funções relativas a abertura do arquivo PDF
             */
            $scope.open = function () {
                checkFile(getPublicacaoDir(), getPublicacaoFilename(), openPublicacao, openPublicacaoError);
            };

            function openPublicacao(data) {
                $cordovaFileOpener2.open(getPublicacaoFullPath(), 'application/pdf').then(openPublicacaoSucess, openPublicacaoError);
            }

            function openPublicacaoSucess(data) {
                //nothing to do
            }

            function openPublicacaoError(error) {
                $ionicPopup.alert({
                    title: 'Erro!',
                    template: 'Ocorreu um erro ao abrir o arquivo',
                    okType: "button-assertive"
                });
                console.error(error);
            }

        });


        /**
         * funções relativas ao compartilhamento da publicação
         */
        $scope.share = function () {
            console.warn("TODO: implementar...");
        };

    });
