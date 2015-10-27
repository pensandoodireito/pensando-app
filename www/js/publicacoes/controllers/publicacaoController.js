/**
 * Created by josafa on 25/10/15.
 */
angular.module('pensando.publicacoes')
    .controller('PublicacaoCtrl', function ($scope) {
        $scope.publicacoes = [
            {
                id: 1,
                title: 'Pub 1',
                description: 'Desc 1',
                downloadUrl: 'http://url.com'
            },
            {
                id: 2,
                title: 'Pub 2',
                description: 'Desc 2',
                downloadUrl: 'http://url.com'
            }
        ];
    })
;