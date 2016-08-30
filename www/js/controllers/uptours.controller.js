angular.module('starter.controllers')
    .controller('demoCtrl', ['SweetAlert', function(SweetAlert) {
    	var vm = this;
        // popup will be called on button click
        vm.confirm = function() {
            // setting up popup attributes
            SweetAlert.swal({

                title: "Are you sure?",
                text: "You want to cancel the plan?",
                type: "warning",
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                closeOnConfirm: false,
                closeOnCancel: true
            }, function() {
                swal("Cancel!", "Your Plan has been cancelled.", "success");
            });
        }
    }])
    .controller('UptoursCtrl', function(SweetAlert) {
		$scope.notifs = [{
                name: "mustafa khalid",
                to: "nowshera",
                from: "lahore",
                image: "img/76.jpg",
                date: "23/06/2016"
            }

        ];

    })
