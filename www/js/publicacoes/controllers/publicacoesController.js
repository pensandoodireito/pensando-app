/**
 * Created by josafa on 03/11/15.
 */
angular.module('pensando.publicacoes')
    .controller('PublicacoesCtrl', function ($scope, $ionicLoading, publicacoes, PublicacaoFactory) {
        $scope.publicacoes = publicacoes;

        $scope.currentPage = 1;
        $scope.hasNextPage = true;

        $scope.select = function (publicacao) {
            $ionicLoading.show({
                template: 'Carregando publicação...'
            });
            $state.go('app.publicacao', {publicacaoID: publicacao});
        }

        $scope.loadMore = function () {
            PublicacaoFactory.getPublicacoes(++$scope.currentPage, function (response) {

                $scope.publicacoes = $scope.publicacoes.concat(response.data);

                if (response.data.length == 0) {
                    $scope.hasNextPage = false;
                }

                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };
    }
);
