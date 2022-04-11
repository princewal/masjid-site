module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'expanded',
          compass: false,
          sourcemap: false
        },
        files: {
          'public/styles/main.css': 'src/styles/main.scss'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
        spawn: false,
      },
      sass: {
        files: ['src/styles/main.scss'],
        tasks: ['sass']
      },
      html: {
        files: ['public/index.html']
      },
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: 'public/',
          hostname: 'localhost',
          protocol: 'http',
          livereload: true,
          open: true,
          appName: 'open'
        }
      }
    },
  });

  //Load task
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  //run tasks
  grunt.registerTask('default', ['sass', 'connect', 'watch'])


}