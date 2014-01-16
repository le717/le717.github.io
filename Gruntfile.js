module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jshint: {
      // define the files to lint
      files: ["gruntfile.js", "js/*.js"],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
          // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          //'js/<%= pkg.name %>.min.js': ['js/<%= pkg.name %>.js']
          'js/script.min.js': ['js/script.js'],
          'css/style.min.css': ['css/style.css']
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'uglify']
    }
  });
    
//'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-contrib-watch");

  // Default task(s).
  grunt.registerTask("default", ["jshint", "uglify"]);

};