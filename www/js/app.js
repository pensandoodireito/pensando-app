angular.module('pensando',
    [
        'ionic',
        'ngCordova',
        'pensando.controllers',
        'pensando.publicacoes'
    ])

    .run(function ($ionicPlatform, $rootScope, $state, $stateParams) {
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

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            //$rootScope.$on('$stateChangeError', console.log.bind(console));
            //$rootScope.$on('$stateChangeStart', console.log.bind(console));
            //$rootScope.$on('$stateNotFound', console.log.bind(console));
            //$rootScope.$on('$stateChangeSuccess', console.log.bind(console));
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
                        templateUrl: 'js/noticias/views/noticia.html',
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
                        controller: 'PublicacoesCtrl',
                        templateUrl: 'js/publicacoes/views/publicacoes.html',
                        resolve: {
                            publicacoes: function (PublicacaoFactory) {
                                return PublicacaoFactory.getPublicacoes();
                            }
                        }
                    }
                }
            })
            .state('app.publicacao', {
                url: '/publicacoes/:publicacaoID',
                views: {
                    'menuContent': {
                        controller: 'PublicacaoCtrl',
                        templateUrl: 'js/publicacoes/views/publicacao.html',
                        resolve: {
                            publicacao: function ($stateParams, PublicacaoFactory) {
                                return PublicacaoFactory.getPublicacao($stateParams.publicacaoID);
                            }
                        }
                    }
                }
            })
            .state('app.pdf', {
                url: '/publicacoes/pdf/:publicacaoID',
                params: {
                    publicacaoID: null,
                    publicacao: null
                },
                views: {
                    'menuContent': {
                        templateUrl: 'js/publicacoes/views/pdf.html',
                        controller: 'PdfCtrl'
                    }
                }
            });

// if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/publicacoes');
    })
;