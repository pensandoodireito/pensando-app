/**
 * Created by josafafilho on 11/23/15.
 */

angular.module('pensando.publicacoes')
    .factory('PublicacaoFactory', function ($http) {
        var baseUrl = "http://pensando.mj.gov.br/wp-json/";

        if (!(ionic.Platform.isIOS() || ionic.Platform.isAndroid())) {
            baseUrl = "http://api-pensando/wp-json/";
        }
        var endpoint = "publicacoes/";

        var url = baseUrl + endpoint;

        var publicacaoFactory = {};

        publicacaoFactory.publicacoes = null;

        publicacaoFactory.getPublicacoes = function (page) {
            var config = {
                params: {
                    page: (page != null && page != undefined ) ? page : 1
                }
            };

            return $http.get(url, config);
        };

        publicacaoFactory.getPublicacao = function (id) {
            return $http.get(url + id);
        };

        return publicacaoFactory;
    }
);
