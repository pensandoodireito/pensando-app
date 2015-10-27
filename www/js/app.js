angular.module('pensando', ['ionic', /*'pensando.services',*/ 'pensando.controllers', 'pensando.publicacoes'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'js/views/menu.html',
                controller: 'PensandoCtrl'
            })
            .state('app.debates', {
                url: '/debates',
                views: {
                    'menuContent': {
                        templateUrl: 'js/debates/views/debate.html'
                    }
                }
            })
            .state('app.noticias', {
                url: '/noticias',
                views: {
                    'menuContent': {
                        templateUrl: 'js/noticias/views/noticia.html'
                    }
                }
            })
            .state('app.sobre', {
                url: '/sobre',
                views: {
                    'menuContent': {
                        templateUrl: 'js/views/sobre.html'
                    }
                }
            })
            .state('app.publicacoes', {
                url: '/publicacoes',
                views: {
                    'menuContent': {
                        templateUrl: 'js/publicacoes/views/publicacoes.html',
                        controller: 'PublicacaoCtrl'
                    }
                }
            })
            .state('app.single', {
                url: '/publicacoes/:publicacaoId',
                views: {
                    'menuContent': {
                        templateUrl: 'js/publicacoes/views/publicacao.html',
                        controller: 'PublicacaoCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/publicacoes');
    });