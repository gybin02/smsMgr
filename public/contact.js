(function () {
    var module = angular.module("appModule", []);
    module.run(function () {
        AV.initialize("zn7kexp98dqfqo26nz1xyvo5g3c9hs7x569ym36woeoky7y5", "2i2p8ppgnetd27yb7adi45slkw2cd0cskrn3oixxlkhuj63b");
    });
    module.controller("appCtrl", ['$http', '$scope', function ($http, $scope) {
        var Item = AV.Object.extend("contact");
        $scope.itemArray = [];
        //$scope.newItem = {content: ''};
        //$scope.editTempItem = {};
        $scope.page = 0;


        $scope.getItems = function () {
            var query = new AV.Query(Item);
            query.limit(10);
            query.skip(10 * $scope.page);
            //query.descending("date");
            query.find({
                success: function (results) {
                    $scope.$apply(function () {
                        $scope.itemArray = JSON.parse(JSON.stringify(results));
                    })
                }
            })
        };

        $scope.prePage = function () {
            if ($scope.page > 0) {
                $scope.page--;
                $scope.getItems();
            }else{
                alert("到第一页了");
            }
        };
        $scope.nextPage = function () {
            if ($scope.itemArray.length == 10) {
                $scope.page++;
                $scope.getItems();
            }else{
                alert("到最后一页了");
            }
        };

        $scope.getPageCount=function(){
            var query = new AV.Query(Item);
            query.count({
                success:function(result){
                    $scope.total=result/10+1;
                }
            });
        };

        $scope.getItems();
        $scope.getPageCount();
    }]);
})();
