/**
 * Created by josafafilho on 11/23/15.
 */

angular.module('pensando.publicacoes')
    .factory('PublicacaoFactory', function ($http, $cordovaFile, $cordovaFileTransfer, $cordovaFileOpener2) {
        var baseUrl = "http://pensando.mj.gov.br/wp-json/";

        if (!(ionic.Platform.isIOS() || ionic.Platform.isAndroid())) {
            baseUrl = "http://api-pensando/wp-json/";
        }
        var endpoint = "publicacoes/";

        var url = baseUrl + endpoint;

        var publicacaoFactory = {};

        publicacaoFactory.publicacoes = [];

        publicacaoFactory.getPublicacoes = function (page) {
            var config = {
                params: {
                    page: page || 1
                }
            };

            return $http.get(url, config);
        };

        publicacaoFactory.getPublicacao = function (id) {
            return $http.get(url + id);
        };

        publicacaoFactory.isValid = function (publicacao) {
            return publicacao && publicacao.volume;
        };

        publicacaoFactory.getPublicacaoFilename = function (publicacao) {
            if (!publicacaoFactory.isValid(publicacao)) {
                return false;
            }

            return "volume-" + publicacao.volume + ".pdf";
        };

        publicacaoFactory.getPublicacaoFullPath = function (publicacao) {
            if (!publicacaoFactory.isValid(publicacao)) {
                return false;
            }

            return publicacaoFactory.getPublicacoesDir() + publicacaoFactory.getPublicacaoFilename(publicacao);
        };

        document.addEventListener('deviceready', function () {

            publicacaoFactory.isDownloaded = function (publicacao, onExists, onMisses) {
                if (!publicacaoFactory.isValid(publicacao)) {
                    return false;
                }

                var dir = publicacaoFactory.getPublicacoesDir();
                var filename = publicacaoFactory.getPublicacaoFilename(publicacao);

                $cordovaFile.checkFile(dir, filename).then(onExists, onMisses);
            };

            publicacaoFactory.getPublicacoesDir = function () {
                var pub_path = "pensando/publicacoes/";

                if (ionic.Platform.isAndroid()) {
                    return cordova.file.externalRootDirectory + pub_path;
                } else if (ionic.Platform.isIOS()) {
                    return cordova.file.documentsDirectory + pub_path;
                }

                return null;
            };

            publicacaoFactory.download = function (publicacao, onSuccess, onError, onProgress) {
                $cordovaFileTransfer.download(publicacao.url, publicacaoFactory.getPublicacaoFullPath(publicacao), {}, true)
                    .then(onSuccess, onError, onProgress);
            };

            publicacaoFactory.open = function (publicacao, onSuccess, onError) {
                $cordovaFileOpener2.open(publicacaoFactory.getPublicacaoFullPath(publicacao), 'application/pdf')
                    .then(onSuccess, onError);
            };

        });

        return publicacaoFactory;
    });
