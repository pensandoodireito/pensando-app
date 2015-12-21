/**
 * Created by josafa on 25/10/15.
 */
angular.module('pensando.publicacoes')
    .controller('PublicacaoCtrl', function ($scope, $stateParams, $ionicLoading, $ionicPopup, $timeout,
                                            $cordovaSocialSharing, FileService, PublicacaoFactory) {

        $scope.publicacao = {};
        $scope.progress = 0;

        /**
         * funções relativas ao carregamento dos dados da publicação
         */
        $scope.loadPublicacao = function () {
            var publicacaoID = $stateParams.publicacaoID;

            PublicacaoFactory.getPublicacao(publicacaoID).then(loadPublicacaoSuccess, loadPublicacaoError);
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
            console.error(JSON.stringify(error));
        }

        $scope.loadPublicacao();

        document.addEventListener('deviceready', function () {

            /**
             * funções relativas a abertura do arquivo PDF
             */
            $scope.open = function () {
                if ($scope.publicacao.isValid()) {
                    $scope.publicacao.checkFile(openPublicacao, downloadArquivoPublicacao);
                } else {
                    openError({message: "publicação inválida", object: $scope.publicacao});
                }
            };

            function openPublicacao(data) {
                FileService.open($scope.publicacao, openPublicacaoSucess, openError);
            }

            function openPublicacaoSucess(data) {
                //nothing to do
            }

            function downloadArquivoPublicacao() {
                $ionicLoading.show({
                    template: 'Baixando publicação...'
                });

                FileService.download($scope.publicacao.url, $scope.publicacao.getFullPath(), downloadSuccess, downloadError, downloadProgress);
            }

            function downloadSuccess(data) {
                $ionicLoading.hide();
                openPublicacao();
            }

            function downloadError(error) {
                $ionicLoading.hide();
                openError(error);
            }

            function downloadProgress(progress) {
                $timeout(function () {
                    $scope.progress = (progress.loaded / progress.total) * 100;
                    console.log($scope.progress);
                });
            }

            function openError(error) {
                $ionicPopup.alert({
                    title: 'Erro ao tentar abrir a publicação!',
                    template: 'Ocorreu um erro ao tentar abrir sua publicação. \n Tente novamente mais tarde.',
                    okType: "button-assertive"
                });
                console.error(JSON.stringify($scope.publicacao));
                console.error(JSON.stringify(error));
            }

            /**
             * funções relativas ao compartilhamento da publicação
             */
            $scope.share = function () {
                var title = "Pensando o Direito - Volume " + $scope.publicacao.volume;
                var message = title + "\n" + $scope.publicacao.title;
                var link = $scope.publicacao.link;

                $cordovaSocialSharing.share(message, title, null, link)
                    .then(shareSuccess, shareError);
            };

            function shareSuccess(result) {
                console.log(JSON.stringify(result));
            }

            function shareError(error) {
                $ionicPopup.alert({
                    title: 'Falha ao compartilhar a publicação!',
                    template: 'Ocorreu um erro enquanto tentávamos compartilhar sua publicação.',
                    okType: "button-assertive"
                });
                console.error(JSON.stringify(error));
            }
        });

    });
