# RootDir__

"_" directories can be considered "root dirs"
usually there contains high-level design of the module which should not be changed without a good reason.
To keep software implementation agnostic this should contain mostly interfaces or abstract classes
and avoid designing other things (like concrete classes, functions, etc.) here.