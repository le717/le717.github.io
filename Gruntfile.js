module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    // Lint check any CSS
    csslint: {
      options: {
        csslintrc: ".csslintrc"
      },
      strict: {
        options: {
          import: 2
        },
        src: ["css/style.css"]
      },
      lax: {
        options: {
          import: false
        },
        src: ["css/style.css"]
      }
    },
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
        // Define the JS files to lint
        files: ["gruntfile.js", "js/script.js"],
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

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-csslint");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");

    // Default task(s).
    grunt.registerTask("default", ["csslint", "cssmin", "jshint", "uglify"]);

};
