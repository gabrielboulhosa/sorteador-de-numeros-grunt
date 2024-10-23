
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      development: {
        files: {
          "dev/styles/main.css": "src/styles/main.less"
        }
      },
      production: {
        options: {
          compress: true,
        },
        files: {
          'dist/styles/main.min.css': 'src/styles/main.less'
        }
      }
    },

    concurrent: {
      dev: ['less:development'], 
      prod: ['less:production']
    },

    watch: {
      less: {
        files: ['src/styles/**/*.less'],
        tasks: ['less:development']
      },html: {
        files: ['src/index.html'],
        tasks: ['replace:dev']
      }
    },

    replace: {
      dev: {
        options: {
          patterns: [
            {
              match: 'ENDERECO-DO-CSS',
              replacement: './styles/main.css'
            },
            {
              match: 'ENDERECO-DO-JS',
              replacement: '../src/scripts/main.js'
            }
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['src/index.html'],
            dest: 'dev/'
          }
        ]
      },
      dist: {  // replace foi copiado e "dev" foi alterado para "dist"
        options: {
          patterns: [
            {
              match: 'ENDERECO-DO-CSS', // procura o texto
              replacement: './styles/main.min.css' // e troca por esse
            },
            {
              match: 'ENDERECO-DO-JS',
              replacement: './scripts/main.min.js'
            }
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['prebuild/index.html'], // pega na pasta temporária
            dest: 'dist/' // envia para a pasta de destino
          }
        ]
      }
    },

    htmlmin: {
      dist: { // ambiente de produção
        options: {
          removeComments: true, // remover comentários
          collapseWhitespace: true // apagar espaços em branco
        },
        files: {
          'prebuild/index.html': 'src/index.html' // prebuild é uma pasta temporária para armazenar o HTML minificado
        }
      }
    },
    clean: ['prebuild'],

    uglify: { //minificação do js
      target: {
        files: {
          'dist/scripts/main.min.js': 'src/scripts/main.js'
        }
      }
    }
  });

  // Carregar tarefas npm
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Registrar tarefas
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['concurrent:prod', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']); 
};

// Comentário: No arquivo package.json, adicione a seguinte linha ao "scripts" para definir a tarefa build:
// "scripts": {
//   "build": "grunt build"
// }
