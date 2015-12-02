/**
 * Created by josafafilho on 11/23/15.
 */

angular.module('pensando.publicacoes')
    .factory('PublicacaoFactory', function ($http, $ionicLoading) {
        var baseUrl = "http://api-pensando/wp-json/publicacoes/";

        var publicacaoFactory = {};

        publicacaoFactory.publicacoes = null;

        publicacaoFactory.getPublicacoes = function () {
            return $http.get(baseUrl).then(function (response) {
                $ionicLoading.hide();
                return response.data;
            });
        };

        publicacaoFactory.getPublicacao = function (id) {
            return $http.get(baseUrl + id).then(function (response) {
                $ionicLoading.hide();
                return response.data;
            });
        };

        return publicacaoFactory;

    }
);