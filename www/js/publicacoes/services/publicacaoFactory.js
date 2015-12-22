/**
 * Created by josafafilho on 11/23/15.
 */

angular.module('pensando.publicacoes')
    .factory('PublicacaoFactory', function ($http, $cordovaSocialSharing, FileService) {

        var publicacoes = [];

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

            return $http.get(url, config).then(function (response) {
                publicacoes = publicacoes.concat(response.data);
                return publicacoes;
            });
        }
        ;

        publicacaoFactory.getPublicacao = function (id) {
            for (var i = 0; i < publicacoes.length; i++) {
                if (publicacoes[i].id == id) {
                    return publicacoes[i];
                }
            }
            return null;
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
            var _self = this;
            FileService.exists(publicacaoFactory.getPublicacoesDir(), this.getFilename(),
                function (arg) {
                    onSuccess(true)
                }, function (arg) {
                    onFailure(false)
                });
        };

        Publicacao.prototype.open = function (onSuccess, onFailure) {
            FileService.open(this.getFullPath(), "application/pdf", onSuccess, onFailure);
        };

        Publicacao.prototype.download = function (onSuccess, onFailure, onProgress) {
            var _self = this;

            FileService.download(this.url, this.getFullPath(), function (args) {
                _self.setDownloaded(true);
                onSuccess(args);
            }, onFailure, onProgress);
        };

        Publicacao.prototype.share = function (onSuccess, onFailure) {
            var title = "Pensando o Direito - Volume " + this.volume;
            var message = title + "\n" + this.title;
            var link = this.link;

            $cordovaSocialSharing.share(message, title, null, link).then(onSuccess, onFailure);
        };

        return publicacaoFactory;
    });
