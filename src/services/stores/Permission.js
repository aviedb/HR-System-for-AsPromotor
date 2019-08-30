import { action } from 'mobx';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

class Permission {
  @action
  camaraRoll = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }
}

export default new Permission();