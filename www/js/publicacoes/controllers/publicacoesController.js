/**
 * Created by josafa on 03/11/15.
 */
angular.module('pensando.publicacoes')
    .controller('PublicacoesCtrl', function ($scope, publicacoes) {
        $scope.publicacoes = publicacoes;
    }
);
