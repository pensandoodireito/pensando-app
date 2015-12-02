/**
 * Created by josafafilho on 11/23/15.
 */

angular.module('pensando.publicacoes')
    .factory('PublicacaoFactory', function ($http, $ionicLoading) {
        var baseUrl = "http://api-pensando/wp-json/publicacoes/";

        var publicacaoFactory = {};

        publicacaoFactory.publicacoes = null;

        publicacaoFactory.getPublicacoes = function (page, callback) {

            var config = {
                params: {
                    page: (page != null && page != undefined ) ? page : 1
                }
            };

            return $http.get(baseUrl, config).then(function (response) {
                return callback(response);
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