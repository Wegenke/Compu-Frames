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

    export class CreateController {
    public frames;
    public frame = {};

    public save() {
        this.frameService.save(this.frame).then(()=> {
        this.frames = this.frameService.list(); // redisplay list
        this.frame = {};  // clear form
        }).catch((err) => {
        console.error(err);
        })
    }

    public remove(frameId) {
        this.frameService.remove(frameId).then(() => {
        this.frames = this.frameService.list(); // redisplay list
        }).catch((err) => {
        console.error(err);
        });
    }

    constructor(private frameService:compuframes.Services.FrameService) {
        this.frames = this.frameService.list();
    }
    }

    export class EditController {
        public frame;

        public save() {
            this.frameService.save(this.frame).then(()=> {
            this.$state.go('home'); // navigate back to home
            }).catch((err) => {
            console.error(err);
            })
        }

        constructor(
            private frameService:compuframes.Services.FrameService,
            private $state: ng.ui.IStateService,
            private $stateParams: ng.ui.IStateParamsService
        ) {
            let frameId = $stateParams['id'];
            this.frame = this.frameService.get(frameId);
        }
    }
}
