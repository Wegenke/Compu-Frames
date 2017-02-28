namespace compuframes.Controllers {

    export class HomeController {
      
    }

    export class SignUpController{

        public user;
        public openDialog() {
            this.$mdDialog.show({
                controller: ModalController,
                controllerAs: 'modal',
                templateUrl: '/ngApp/views/logIn.html'
            })
            
        }
        constructor(private $mdDialog: angular.material.IDialogService) { 
           
        }
    }
    
    export class ModalController {
        public closeDialog(){
            this.$mdDialog.hide();
        }
        constructor(private $mdDialog: angular.material.IDialogService) {
            
        }
    }

    export class AboutController {
        public message = 'Hello from the about page!';
    }

    export class FrameController{
        
    }
}
