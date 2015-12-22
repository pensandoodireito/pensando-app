/**
 * Created by josafafilho on 12/21/15.
 */


angular.module('pensando.publicacoes')
    .service('FileService', function ($cordovaFile, $cordovaFileTransfer, $cordovaFileOpener2) {

        this.exists = function () {};
        this.download = function () {};
        this.open = function () {};
        this.getStorageDir = function () {};

        this.getFileParts = function (filePath) {
            var parts = filePath.split("/");
            var file = parts.pop();
            var dir = parts.join("/");

            return {
                dir: dir,
                file: file
            }
        };

        var _self = this;

        document.addEventListener('deviceready', function () {

            _self.exists = function (filePath, file, onSuccess, onFailure) {
                var fileParts = _self.getFileParts(filePath);
                if (fileParts) {
                    $cordovaFile.checkFile(filePath, file).then(onSuccess, onFailure);
                    return true;
                }

                var error = {
                    code: 400,
                    message: "Invalid Path"
                };

                onFailure(error);
            };

            _self.download = function (fromUrl, toPath, onSuccess, onFailure, onProgress) {
                var download = $cordovaFileTransfer.download(fromUrl, toPath, {}, true);
                download.then(onSuccess, onFailure, onProgress);
            };

            _self.open = function (filePath, mimeType, onSuccess, onFailure) {
                $cordovaFileOpener2.open(filePath, mimeType).then(onSuccess, onFailure);
            };

            _self.getStorageDir = function () {
                if (ionic.Platform.isAndroid()) {
                    return cordova.file.externalRootDirectory;
                } else if (ionic.Platform.isIOS()) {
                    return cordova.file.documentsDirectory;
                }

                return null;
            };
        });

    });
