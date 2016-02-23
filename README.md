# pensando-app
Aplicativo mobile para acesso a recursos de Publicações e outros serviços do Pensando o Direito

# Bem vindo ao guia de configuração de ambiente do app Pensando o Direito.

Este guia tem como objetivo ajudar você a configurar seu ambiente de desenvolvimento, instalando todas as ferramentas necessárias para o desenvolvimento do app.

Caso você identifique algum passo não descrito aqui, deixe um comentário que faremos os ajustes necessários no guia.

No fim deste guia temos a seção **Problemas conhecidos** que tratam de alguns problemas relacionados à instalação das ferramentas de desenvolvimento.

## Siga os passos abaixo para configurar o ambiente de desenvolvimento na sua máquina:

1. Instale o ionic com o seguinte comando `npm install -g cordova ionic` ( não vamos entrar em detalhes de como instalar o Node.js, para isso siga os passos descritos [aqui](https://nodejs.org/en/) ). Vá tomar um cafezinho...

2. Instale o gulp para te auxiliar nas automatização das tarefas `npm install -g gulp` e as dependências `npm install -g gulp-concat gulp-util gulp-sass gulp-minify-css gulp-rename shelljs`

3. Faça clone do projeto [pensando-app](https://github.com/pensandoodireito/pensando-app)

4. Faça clone do projeto [participacao-sitebase](https://github.com/pensandoodireito/participacao-sitebase) e siga as instruções para configuração descritas na home do projeto. Esse projeto servirá como serviço de dados a ser usado pelo app.

Se você estiver usando o Mac OS X, poder necessário executar os seguintes passos adicionais:

5. Instalar o _ios-sim_ para fazer deploy da aplicação no simulador: `npm install -g ios-sim`

6. Instalar o _ios-deploy_ para fazer deploy da aplicação nos dispositivos: `npm install -g ios-deploy`

## Problemas conhecidos

### Gulp

Há alguns problemas com o Gulp quando é instalado de maneira global. Caso você esteja vendo uma mensagem do tipo: 

> [12:31:04] Local gulp not found in ~/pensando-app

> [12:31:04] Try running: npm install gulp

Tente executar uma instalação local do Gulp com o comando `npm install gulp`, também será necessário reinstalar as dependências localmente através do comando `npm install bower gulp-concat gulp-util gulp-sass gulp-minify-css gulp-rename shelljs`

### Sass, libsass e node-sass

Se você estiver vendo o seguinte erro ao tentar executar `gulp` ou `gulp sass`: 

> `libsass` bindings not found. Try reinstalling `node-sass`

Tente executar os seguintes comandos: 

`npm uninstall --save-dev gulp-sass`

`npm install --save-dev gulp-sass@2`


### delayed-stream

Se você tiver problemas com o módulo _delayed-stream_

Execute o comando `npm install -g delayed-stream`
