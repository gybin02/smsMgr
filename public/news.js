(function () {
    var module = angular.module("appModule", []);
    module.run(function () {
        AV.initialize("zn7kexp98dqfqo26nz1xyvo5g3c9hs7x569ym36woeoky7y5", "2i2p8ppgnetd27yb7adi45slkw2cd0cskrn3oixxlkhuj63b");
    });
    module.controller("appCtrl", ['$http', '$scope', function ($http, $scope) {
        var Message = AV.Object.extend("message");
        $scope.itemArray = [];
        $scope.newItem = {content: ''};
        $scope.editTempItem = {};

        $scope.getItems = function () {
            var query = new AV.Query(Message);
            query.find({
                success: function (results) {
                    $scope.$apply(function () {
                        $scope.itemArray = JSON.parse(JSON.stringify(results));
                    })
                }
            })
        };
        $scope.getItems();
    }]);
})();
