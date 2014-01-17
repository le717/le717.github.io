module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // Minify any CSS
    cssmin: {
      add_banner: {
        options: {
          banner: "/* Created 2014 Triangle717, Licensed under The MIT License */"
        },
        files: {
          "css/style.min.css": ["css/style.css"]
        }
      }
    },

    // Lint check any JavaScript
    jshint: {
      files: ["package.json", "gruntfile.js", "js/script.js"],
      options: {
        globals: {
          jQuery: true
        }
      }
    },

    // Minify any JavaScript
    uglify: {
      my_target: {
        files: {
          "js/script.min.js": ["js/script.js"],
        }
      }
    },

    // Watched files to trigger grunt
    watch: {
      files: ["index.html", "css/style.css", "<%= jshint.files %>"],
      tasks: ["default"]
    }
  });

  // Load any plugins
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");

  // Define out tasks. `test` is used for Travis CI
  grunt.registerTask("default", ["cssmin", "jshint", "uglify"]);
  grunt.registerTask("test", ["cssmin", "uglify"]);

};
