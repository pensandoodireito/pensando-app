/**
 * Created by josafa on 03/11/15.
 */
angular.module('pensando.publicacoes')
    .service('PublicacoesService', function () {
        return {
            publicacoes: [
                {
                    id: 1,
                    title: 'Pub 1',
                    description: 'Desc 1',
                    downloadUrl: 'http://pensando.mj.gov.br/wp-content/uploads/2015/10/PoD_56_atualizada_011020153.pdf'
                },
                {
                    id: 2,
                    title: 'Pub 2',
                    description: 'Desc 2',
                    downloadUrl: 'http://pensando.mj.gov.br/wp-content/uploads/2015/10/PoD_56_atualizada_011020153.pdf'
                },
                {
                    id: 3,
                    title: 'Pub 3',
                    description: 'Desc 3',
                    downloadUrl: 'http://pensando.mj.gov.br/wp-content/uploads/2015/10/PoD_56_atualizada_011020153.pdf'
                }
            ],

            getPublicacoes: function () {
                return this.publicacoes;
            },

            getPublicacao: function (publicacaoID) {

                for (var i = 0; i < this.publicacoes.length; i++) {
                    if (this.publicacoes[i].id == publicacaoID) {
                        return this.publicacoes[i];
                    }
                }

                return null;
            }
        }
    })