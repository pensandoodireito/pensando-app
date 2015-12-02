/**
 * Created by josafa on 03/11/15.
 */
angular.module('pensando.publicacoes')
    .controller('PublicacoesCtrl', function ($scope, $ionicLoading, $state, publicacoes) {
        $scope.publicacoes = publicacoes;

        $scope.select = function (publicacao) {
            $ionicLoading.show({
                template: 'Carregando publicação...'
            });
            $state.go('app.publicacao', {publicacaoID: publicacao});
        }
    }
);
