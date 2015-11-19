/**
 * Created by josafa on 25/10/15.
 */

angular.module('pensando.publicacoes')
    .controller('PdfCtrl', ['$scope', '$stateParams', '$sce', 'PDFViewerService', 'PublicacoesService', function ($scope, $stateParams, $sce, pdf) {
        $scope.publicacao = $stateParams.publicacao;

        $scope.currentPage = 0;
        $scope.totalPages = 0;
        $scope.loaded = 0;
        $scope.total = 0;
        $scope.state = 'idle';

        var url = $scope.publicacao.downloadUrl;

        var filename = url.split("/").pop();

        if (ionic.Platform.platform() == 'linux') {
            $scope.pdfFile = $sce.trustAsResourceUrl(url);
        } else {
            $scope.pdfFile = cordova.file.externalRootDirectory + filename;
        }

        $scope.viewer = pdf.Instance("viewer");

        $scope.nextPage = function () {
            $scope.viewer.nextPage();
        };

        $scope.prevPage = function () {
            $scope.viewer.prevPage();
        };

        $scope.pageLoaded = function (curPage, totalPages) {
            $scope.currentPage = curPage;
            $scope.totalPages = totalPages;
        };

        $scope.loadProgress = function (loaded, total, state) {
            $scope.loaded = loaded;
            $scope.total = total;
            $scope.state = state;
        };
    }])
;
