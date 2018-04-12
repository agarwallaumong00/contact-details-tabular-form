(function() {
    angular.module('agentDesk').controller('agentDeskController', ['$q', '$http', '$scope', function($q, $http, $scope) {
        var vm = $scope;

        vm.data = [];
        vm.pageData = [];
        vm.startingIndex = 0;
        vm.lastIndex = 50;
        vm.currentPage = 1;

        function loadJson() {
            $http.get('./jsonData.json').
                then(function(success) {
                    vm.data = success.data;
                    vm.totalPage = vm.data.length/50;
                    getPageData(vm.startingIndex, vm.lastIndex);
                }, function(error) {

                })
        }

        function getPageData(start, end) {
            vm.pageData = vm.data.slice(start, end);
        }

        vm.gotoPrevPage = function() {
            vm.currentPage -= 1;
            vm.startingIndex -= 50;
            vm.lastIndex -= 50;
            getPageData(vm.startingIndex, vm.lastIndex);
        }

         vm.gotoNextPage = function() {
            vm.currentPage += 1;
            vm.startingIndex += 50;
            vm.lastIndex += 50;
            getPageData(vm.startingIndex, vm.lastIndex);
        }

        vm.gotoPage = function(ev, page) {
            if(ev.keyCode === 13) {
                vm.startingIndex = page*50 - 50;
                vm.lastIndex = page*50 + 50;
                getPageData(vm.startingIndex, vm.lastIndex);
            }
        }


        function init() {
            loadJson();
        }
        init();
    }]);
    
})();
