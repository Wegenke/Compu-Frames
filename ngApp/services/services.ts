namespace compuframes.Services {
    
    export class FrameService {
      private FrameResource;

      public get(id) {
        return this.FrameResource.get({id:id});
      }

      public list() {
        return this.FrameResource.query();
      }

      public save(frame) {
        return this.FrameResource.save({id:frame._id}, frame).$promise;
      }

      public remove(frameId) {
        return this.FrameResource.remove({id:frameId}).$promise;
      }

      constructor($resource:ng.resource.IResourceService) {
        this.FrameResource = $resource('/api/frames/:id');
      }
  }

  angular.module('zoo').service('frameService', FrameService);
    }
