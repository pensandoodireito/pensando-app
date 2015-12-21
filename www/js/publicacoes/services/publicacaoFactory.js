/**
 * Created by josafafilho on 11/23/15.
 */

angular.module('pensando.publicacoes')
    .factory('PublicacaoFactory', function ($http, FileService) {

        var baseUrl = "http://pensando.mj.gov.br/wp-json/";
        var endpoint = "publicacoes/";
        var storageRelativePath = "pensando/publicacoes/";

        if (!(ionic.Platform.isIOS() || ionic.Platform.isAndroid())) {
            baseUrl = "http://api-pensando/wp-json/";
        }

        var url = baseUrl + endpoint;

        var publicacaoFactory = {};

        publicacaoFactory.getPublicacoes = function (page) {
            var config = {
                transformResponse: appendTransform($http.defaults.transformResponse, publicacoesTransform),
                params: {
                    page: page || 1
                }
            };

            return $http.get(url, config);
        }
        ;

        publicacaoFactory.getPublicacao = function (id) {
            var config = {
                transformResponse: appendTransform($http.defaults.transformResponse, publicacaoTransform),
            };
            return $http.get(url + id, config);
        };

        publicacaoFactory.getPublicacoesDir = function () {
            return FileService.getStorageDir() + storageRelativePath;

        };

        function appendTransform(defaults, transform) {
            defaults = angular.isArray(defaults) ? defaults : [defaults];

            return defaults.concat(transform);
        }

        function publicacaoTransform(publicacaoraw) {
            return new Publicacao(publicacaoraw);
        }

        function publicacoesTransform(publicacoesraw) {
            var publicacoes = [];

            publicacoesraw.forEach(function (publicacaoraw) {
                var publicacao = new Publicacao(publicacaoraw);
                publicacoes.push(publicacao);
            });

            return publicacoes;
        }

        var Publicacao = function (json) {
            this.id = json.ID || null;
            this.url = json.url || null;
            this.title = json.title || null;
            this.subtitle = json.subtitle || null;
            this.content = json.content || null;
            this.coordenacao = json.coordenacao || null;
            this.date = json.date || null;
            this.slug = json.slug || null;
            this.link = json.link || null;
            this.volume = json.volume || null;
            this.featured_image = json.featured_image || null;
            this.meta = json.meta || null;
            this.isDownloaded = false;

            this.prepare();
        };

        Publicacao.prototype.prepare = function () {

            if (!this.isValid()) {
                return false;
            }

            this.checkFile(this.setDownloaded, this.setDownloaded);
        };

        Publicacao.prototype.setDownloaded = function (isDownloaded) {
            this.isDownloaded = isDownloaded;
        };

        Publicacao.prototype.isValid = function () {
            return true && this.volume;
        };

        Publicacao.prototype.getFilename = function () {
            if (!this.isValid()) {
                return false;
            }

            return "volume-" + this.volume + "-" + this.id + ".pdf";
        };

        Publicacao.prototype.getFullPath = function () {
            if (!this.isValid()) {
                return false;
            }

            return publicacaoFactory.getPublicacoesDir() + this.getFilename();
        };

        Publicacao.prototype.checkFile = function (onSuccess, onFailure) {
            FileService.exists(this.getFullPath(), function () {
                onSuccess(true)
            }, function () {
                onFailure(false)
            });
        };

        return publicacaoFactory;
    });
