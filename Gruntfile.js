module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    sass: {
      dist: {
        options: {
          style: "expanded",
          compass: false,
          sourcemap: false,
        },
        files: {
          "src/styles/main.css": "src/styles/main.scss",
        },
      },
    },
    watch: {
      options: {
        livereload: true,
        spawn: false,
      },
      files: ["src/**/*"],
      sass: {
        files: ["src/styles/main.scss"],
        tasks: ["sass"],
      },
      html: {
        files: ["src/index.html"],
      },
    },
    connect: {
      server: {
        options: {
          port: 8080,
          base: "src/",
          hostname: "localhost",
          protocol: "http",
          livereload: true,
          open: true,
          appName: "open",
        },
      },
    },
    copy: {
      build: {
        files: [
          {
            src: ["src/index.html"],
            dest: "public/index.html",
            filter: "isFile",
          },
          {
            src: ["src/styles/main.css"],
            dest: "public/styles/main.css",
            filter: "isFile",
          },
          {
            src: ["src/script/main.js"],
            dest: "public/script/main.js",
            filter: "isFile",
          },
          {
            cwd: 'src/images/',
            src: ["**/*.{png,jpg,svg,webp}"],
            dest: "public/images/",
            expand: true,
          },
          // {
          //   expand: true,
          //   cwd: "src/images/",
          //   src: 
          // },
        ],
      },
    },
  });

  //Load task
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-copy");

  //run tasks
  grunt.registerTask("default", ["sass", "connect", "watch"]);

  grunt.registerTask("build", "build task", function () {
    grunt.log.writeln("runing build ...");
    grunt.task.run(["copy:build"]);
  });
};
