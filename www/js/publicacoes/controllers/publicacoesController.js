/**
 * Created by josafa on 03/11/15.
 */
angular.module('pensando.publicacoes')
    .controller('PublicacoesCtrl', function ($scope, $state, $ionicLoading, $ionicPopup, FileService, PublicacaoFactory) {
        $scope.publicacoes = [];
        $scope.currentPage = 0;
        $scope.hasNextPage = true;

        $scope.select = function (publicacao) {
            $ionicLoading.show({
                template: 'Carregando publicação...'
            });
            $state.go('app.publicacao', {publicacaoID: publicacao.id});
        };

        $scope.loadMore = function () {
            PublicacaoFactory.getPublicacoes(++$scope.currentPage)
                .then(loadMoreSuccess, loadMoreError);
        };

        //$scope.open = function (publicacao) {
        //    publicacao.open(openSuccess, openError);
        //};
        //
        //$scope.download = function (publicacao) {
        //    publicacao.download();
        //};

        function loadMoreSuccess(publicacoes) {
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.publicacoes = publicacoes;
        }

        function loadMoreError(error) {
            $scope.hasNextPage = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            alert('Falha ao carregar publicações!', "Ocorreu um erro ao carregar as publicações. Tente novamente mais tarde!");
            console.error(JSON.stringify(error));
        }

        function openSuccess(data) {
            //nothing to do
        }

        function openError(error) {
            alert('Erro ao tentar abrir a publicação!', 'Ocorreu um erro ao tentar abrir sua publicação. \n Tente novamente mais tarde.');
            console.error(JSON.stringify(error));
        }

        function alert(title, text) {
            return $ionicPopup.alert({
                title: title,
                template: text,
                okType: "button-assertive"
            });
        }
    });
