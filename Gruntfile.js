module.exports = function (grunt) {
    "use strict";
    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        banner: '/* <%= pkg.name %> - v<%= pkg.version %>\n' +
      '<%= pkg.homepage ? "" + pkg.homepage + "\\n" : "" %>' +
      'Created <%= grunt.template.today("yyyy") %> <%= pkg.author %>; ' +
      'Licensed under the <%= _.pluck(pkg.licenses, "type").join(", ") %>\n*/\n',
        cssfiles: ["css/*.css", "!css/*.min.css"],
        jsfiles: ["js/*.js", "!js/*.min.js"],

        // Validate the HTML using the W3C HTML Validator
        validation: {
            options: {
                reset: true,
                stoponerror: false,
                reportpath: false,
            },
            files: {
                src: "index.html",
            }
        },

        // Lint the CSS
        csslint: {
            strict: {
                options: {
                    csslintrc: ".csslintrc",
                    "import": 2
                },
                src: "<%= cssfiles %>",
            }
        },

        // Minify any CSS
        cssmin: {
            add_banner: {
                options: {
                    banner: "<%= banner %>"
                },
                files: {
                    "css/<%= pkg.name %>.min.css": "<%= cssfiles %>"
                }
            }
        },

        // Lint the JavaScript
        jshint: {
            src: {
                options: {
                    jshintrc: ".jshintrc"
                },
                src: ["Gruntfile.js", "js/*.js", "!js/*.min.js"],
            },
        },

        // Minify any JavaScript
        uglify: {
            options: {
                banner: "<%= banner %>"
            },
            my_target: {
                files: {
                    "js/<%= pkg.name %>.min.js": "<%= jsfiles %>",
                }
            }
        },

        // Watched files to trigger grunt
        watch: {
            files: ["Gruntfile.js", "<%= cssfiles %>", "<%= jsfiles %>"],
            tasks: ["all"]
        }
    });

    // Load the plugins required to perform our tasks
    grunt.loadNpmTasks('grunt-html-validation');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask('default', 'List commands', function () {
        grunt.log.writeln("");
        grunt.log.writeln("Run 'grunt lint' to lint the source files");
        grunt.log.writeln("Run 'grunt build' to minify the source files");
        grunt.log.writeln("Run 'grunt all' to lint and minify the source files");
    });

    // Define the tasks
    grunt.registerTask("lint", ["validation", "csslint", "jshint"]);
    grunt.registerTask("build", ["cssmin", "uglify"]);
    grunt.registerTask("all", ["lint", "build"]);

    // Always use --force to stop csslint from killing the task
    grunt.option("force", true);
};
