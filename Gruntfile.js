module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jshint: {
        // Define the JS files to lint
        files: ["gruntfile.js", "js/script.js"],
        options: {
            globals: {
                jQuery: true
            }
        }
    },
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
    uglify: {
        my_target: {
            files: {
                "js/script.min.js": ["js/script.js"],
            }
        }
    },
    watch: {
        files: ["<%= jshint.files %>"],
            tasks: ["jshint", "uglify"]
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");

    // Default task(s).
    grunt.registerTask("default", ["watch", "cssmin", "jshint", "uglify"]);

};
