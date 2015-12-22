/**
 * Created by josafa on 25/10/15.
 */
angular.module('pensando.publicacoes')
    .controller('PublicacaoCtrl', function ($scope, $stateParams, $ionicLoading, $ionicPopup, $ionicHistory, $timeout,
                                            FileService, PublicacaoFactory) {

        $scope.publicacao = {};
        $scope.progress = 0;

        /**
         * funções relativas ao carregamento dos dados da publicação
         */
        $scope.loadPublicacao = function () {
            var publicacaoID = $stateParams.publicacaoID;

            $scope.publicacao = PublicacaoFactory.getPublicacao(publicacaoID);

            $ionicLoading.hide();
            if (!$scope.publicacao) {
                loadError();
            }
        };

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

        /**
         * funções relativas ao compartilhamento da publicação
         */
        $scope.share = function () {
            $scope.publicacao.share(shareSuccess, shareError);
        };

        $scope.loadPublicacao();

        function loadError() {
            var alert = alert('Falha ao carregar publicação!', "Ocorreu um erro ao carregar a publicação.\nTente novamente mais tarde!");

            alert.then(function () {
                $ionicHistory.goBack();
            });
        }


        function openPublicacao(data) {
            $scope.publicacao.open(openPublicacaoSucess, openError);
        }

        function openPublicacaoSucess(data) {
            //nothing to do
        }

        function downloadArquivoPublicacao() {
            $ionicLoading.show({
                template: 'Baixando publicação...'
            });

            $scope.publicacao.download(downloadSuccess, downloadError, downloadProgress);
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
            alert('Erro ao tentar abrir a publicação!', 'Ocorreu um erro ao tentar abrir sua publicação.\nTente novamente mais tarde.');
            console.error(JSON.stringify(error));
        }

        function shareSuccess(result) {
            console.log(JSON.stringify(result));
        }

        function shareError(error) {
            console.error(JSON.stringify(error));
            alert('Falha ao compartilhar a publicação!', 'Ocorreu um erro enquanto tentávamos compartilhar sua publicação.');
        }

        function alert(title, text) {
            return $ionicPopup.alert({
                title: title,
                template: text,
                okType: "button-assertive"
            });
        }

    });
