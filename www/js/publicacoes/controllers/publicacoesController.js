/**
 * Created by josafa on 03/11/15.
 */
angular.module('pensando.publicacoes')
    .controller('PublicacoesCtrl', function ($scope, $state, $ionicLoading, PublicacaoFactory) {
        $scope.publicacoes = [];
        $scope.currentPage = 0;
        $scope.hasNextPage = true;

        $scope.select = function (publicacao) {
            $ionicLoading.show({
                template: 'Carregando publicação...'
            });
            $state.go('app.publicacao', {publicacaoID: publicacao});
        };

        $scope.loadMore = function () {
            PublicacaoFactory.getPublicacoes(++$scope.currentPage)
                .then(loadMoreSuccess, loadMoreError);
        };

        function loadMoreSuccess(response) {
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.publicacoes = $scope.publicacoes.concat(response.data);

            if (response.data.length == 0) {
                $scope.hasNextPage = false;
            }
        }

        function loadMoreError(error) {
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.hasNextPage = false;
            alert("Ocorreu um erro ao carregar as publicações. Tente novamente mais tarde!");
            console.log(JSON.stringify(error));
        }

        $scope.loadMore();
    }
);
