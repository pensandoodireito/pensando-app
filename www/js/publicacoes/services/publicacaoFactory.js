/**
 * Created by josafafilho on 11/23/15.
 */

angular.module('pensando.publicacoes')
    .factory('PublicacaoFactory', function ($http) {
        var baseUrl = "http://api-pensando/wp-json/posts/";

        var config = {
            params: {
                type: "publicacao"
            }
        };

        var publicacaoFactory = {};

        publicacaoFactory.publicacoes = null;

        publicacaoFactory.getPublicacoes = function () {
            return $http.get(baseUrl, config);
        };

        publicacaoFactory.getPublicacao = function (id) {
            return $http.get(baseUrl + id);
        };

        return publicacaoFactory;

    }
);