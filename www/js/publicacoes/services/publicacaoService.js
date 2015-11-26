/**
 * Created by josafa on 03/11/15.
 */
angular.module('pensando.publicacoes')
    .factory('PublicacoesService', function ($http) {
        var url = "http://api-pensando/wp-json/posts/?type=publicacao";

        publicacaoFactory = {};

        //publicacoes: [
        //    {
        //        id: 56,
        //        coordenacao: 'Rosana Denaldi',
        //        date: '06/10/2015',
        //        description: "Esta pesquisa trata dos instrumentos de indução do cumprimento da função social da " +
        //        "propriedade previstos no Capitulo da Política Urbana da Constituição Federal de 1988, a saber, o " +
        //        "parcelamento, edificação ou utilização compulsórios (PEUC) e seu sucedâneo, o imposto sobre a " +
        //        "propriedade predial e territorial urbana (IPTU) progressivo no tempo.A Constituição e, " +
        //        "posteriormente, o Estatuto da Cidade (Lei no 10.257, de 10 de julho de 2001) conferiram aos " +
        //        "municípios, mediante lei especifica para área incluída no plano diretor, o poder-dever de " +
        //        "determinar o parcelamento, a edificação ou a utilização compulsórios do solo urbano não edificado, " +
        //        "subutilizado ou não utilizado. Desse modo, a pesquisa tem como objetivos: identificar como os municípios " +
        //        "regulamentaram os instrumentos e analisar os critérios e estratégias adotados para sua aplicação.",
        //        downloadUrl: 'http://pensando.mj.gov.br/wp-content/uploads/2015/10/PoD_56_atualizada_011020153.pdf',
        //        title: 'Parcelamento, edificação ou utilização compulsórios e IPTU progressivo no tempo',
        //        subtitle: 'regulamentação e aplicação'
        //    },
        //    {
        //        id: 55,
        //        coordenacao: 'Thiago Bottino',
        //        date: '02/06/2015',
        //        description: "A pesquisa reuniu durante seis meses dados sobre julgamento de Habeas Corpus, direito " +
        //        "previsto na Constituição para proteger a liberdade de locomoção, no Supremo Tribunal Federal (STF), " +
        //        "no Superior Tribunal de Justiça (STJ) e em tribunais de Justiça dos estados.",
        //        downloadUrl: 'http://pensando.mj.gov.br/wp-content/uploads/2015/07/thiago_55_finalizada_impressao1.pdf',
        //        title: 'Habeas Corpus nos Tribunais superiores',
        //        subtitle: 'panaceia universal ou remédio constitucional'
        //    },
        //    {
        //        id: 54,
        //        coordenacao: 'Rogério Dultra dos Santos',
        //        date: '06/10/2015',
        //        description: "A presente pesquisa produziu e examinou informações acerca das condições de aplicação " +
        //        "da prisão cautelar no curso de processos criminais de furto, roubo e tráfico de entorpecentes, " +
        //        "ajuizados em dois Estados da Federação (Bahia e Santa Catarina) entre os anos de 2008 e 2012. " +
        //        "Levantou por amostragem informações constantes de processos criminais sobre o excesso de tempo de " +
        //        "prisão provisória, organizando estatisticamente dados relativos ao tipo de prisão que lhe constituiu " +
        //        "o fundamento, ao tempo de duração do processo, às condições de defesa e à natureza da resposta " +
        //        "processual. Tendo por base esse material, o atual trabalho procurou construir um diálogo com o " +
        //        "campo, enfrentando o perfil das representações e do debate havido contemporaneamente sobre o " +
        //        "assunto no âmbito da jurisprudência criminal, das pesquisas empíricas e da literatura penal e " +
        //        "processual penal. Como conclusão da investigação, buscou discutir e indicar medidas voltadas ao " +
        //        "exame crítico e à reformulação da legislação atual no que respeita à matéria dos instrumentos " +
        //        "cautelares à disposição da justiça criminal.",
        //        downloadUrl: 'http://pensando.mj.gov.br/wp-content/uploads/2015/07/rog%C3%A9rio_finalizada_impress%C3%A3o1.pdf',
        //        title: 'Excesso de prisão provisória no Brasil',
        //        subtitle: 'um estudo empírico sobre a duração da prisão nos crimes de furto, roubo e tráfico'
        //    }
        //],

        publicacaoFactory.publicacoes = null;

        publicacaoFactory.getPublicacoes = function () {
            $http.get(url).then(function (response) {
                publicacoes = response;
                return publicacoes;
            });
        };

        publicacaoFactory.getPublicacao =
            function (id) {

                for (var i = 0; i < this.publicacoes.length; i++) {
                    if (this.publicacoes[i].id == id) {
                        return this.publicacoes[i];
                    }
                }

                return null;
            };

        return publicacaoFactory;

    });