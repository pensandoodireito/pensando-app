/**
 * Created by josafafilho on 12/21/15.
 */


angular.module('pensando.publicacoes')
    .service('FileService', function ($cordovaFile, $cordovaFileTransfer, $cordovaFileOpener2) {

        this.exists = function (filePath, onSuccess, onFailure) {
            document.addEventListener('deviceready', function () {
                var fileParts = this.getFileParts(filePath);

                if (fileParts) {
                    $cordovaFile.checkFile(fileParts.dir, fileParts.file).then(onSuccess, onFailure);
                    return true;
                }

                var error = {
                    code: 400,
                    message: "Invalid Path"
                };

                onFailure(error);
            });
        };

        this.download = function (fromUrl, toPath, onSuccess, onFailure, onProgress) {
            document.addEventListener('deviceready', function () {
                $cordovaFileTransfer.download(fromUrl, toPath, {}, true).then(onSuccess, onFailure, onProgress);
            });
        };

        this.open = function (filePath, mimeType, onSuccess, onFailure) {
            document.addEventListener('deviceready', function () {
                $cordovaFileOpener2.open(filePath, mimeType).then(onSuccess, onFailure);
            });
        };

        this.getStorageDir = function () {
            document.addEventListener('deviceready', function () {
                if (ionic.Platform.isAndroid()) {
                    return cordova.file.externalRootDirectory;
                } else if (ionic.Platform.isIOS()) {
                    return cordova.file.documentsDirectory;
                }

                return null;
            });
        };

        this.getFileParts = function (filePath) {
            var parts = filePath.split("/");
            var file = parts.pop();
            var dir = parts.join("/");

            return {
                dir: dir,
                file: file
            }
        }

    });
