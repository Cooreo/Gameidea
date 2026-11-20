import type { PhotoScene } from '../../game/types';
import EastRoomScene from './EastRoomScene';
import CorridorScene from './CorridorScene';
import StorageScene from './StorageScene';
import LoadingBayScene from './LoadingBayScene';
import CloakroomScene from './CloakroomScene';

export default function Scene({ scene }: { scene: PhotoScene }) {
  switch (scene) {
    case 'eastRoom':
      return <EastRoomScene />;
    case 'corridor':
      return <CorridorScene />;
    case 'storage':
      return <StorageScene />;
    case 'loadingBay':
      return <LoadingBayScene />;
    case 'cloakroom':
      return <CloakroomScene />;
    default:
      return null;
  }
}
