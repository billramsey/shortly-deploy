module.exports = function(grunt) {
  //src: ['public/lib/**/*.js'],
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {separator: '\n'},
      app: {
        src: ['public/client/**/*.js'],
        dest: 'public/dist/app-built.js'
      },
      library: {
        src: ['public/lib/jquery.js', 'public/lib/underscore.js',
         'public/lib/handlebars.js', 'public/lib/backbone.js'],
        dest: 'public/dist/library-built.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      myTarget: {
        files: {
          'public/dist/app.min.js': ['public/dist/app-built.js'],
          'public/dist/library.min.js': ['public/dist/library-built.js']
        }
      }
    },

    eslint: {
      target: [
        'public/client/*.js',
        'app/**/*.js'
      ]
    },

    cssmin: {
      target: {
        files: {
          'public/dist/output.css' : ['public/*.css']
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
          'app/**/*.js',
        ],
        tasks: [
          'build'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: [
          'git add .',
          'git commit -m"Grunt Deployment"',
          'git push live master'
        ].join('&&')
      }
    },
  });
    
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest',
    'eslint',
  ]);

  grunt.registerTask('build', [
    'concat',
    'uglify',
    'cssmin',
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
      grunt.task.run(['shell:prodServer']);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    'test',
    'build',
    'upload'
  ]);


};
