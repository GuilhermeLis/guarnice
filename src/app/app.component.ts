import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActionSheetController } from '@ionic/angular';

//import { AngularFirestore } from '@angular/fire;
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from "@ionic-native/file/ngx";
import { MenuController } from '@ionic/angular';

import * as firebase from 'firebase';
import { environment } from '../environments/environment';

import { AUTHService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  profileUrl: Observable<string | null>;
  items: Observable<any[]>;
  pathConfirm: string;
  email:string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    private file: File,
    private storage: AngularFireStorage,
    private menu: MenuController,
    private authdSvc: AUTHService
  //  db: AngularFirestore
  ) {
    firebase.initializeApp(environment.firebase)
    
    this.pathConfirm = "usuarios/user@gmail.com/profile.jpg";
    //this.items = db.collection('items').valueChanges();
    //console.log(this.email)
    this.downloadProfileImage();
    this.initializeApp();
  }
  
  async cameraAccess(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,  
	  allowEdit: true,
      targetWidth: 300,
      targetHeight: 300
    }

    let cameraInfo = await this.camera.getPicture(options);

    this.makeFileIntoBlob(cameraInfo);
  }

  async libraryAccess(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300
    }
	
	let cameraInfo = await this.camera.getPicture(options);
    this.makeFileIntoBlob(cameraInfo);
    
  }

  makeFileIntoBlob(_imagePath) {
    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
      let fileName = "";
      this.file
        .resolveLocalFilesystemUrl(_imagePath)
        .then(fileEntry => {
          let { name, nativeURL } = fileEntry;

          // get the path..
          let path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));

          fileName = name;

          // we are provided the name, so now read the file into a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          // get the buffer and make a blob to be saved
          let imgBlob = new Blob([buffer], {
            type: "image/jpeg"
          });
          
          // pass back blob and the name of the file for saving
          // into fire base
          resolve({
            fileName,
            imgBlob
          });
          this.uploadFile(imgBlob, fileName);
        })
        .catch(e => reject(e));
    });
    
  }

  uploadFile(file, fileName) {
    fileName = 'profile.jpg';
    //const user = this.authdSvc.getCurrentUser()
    this.afAuth.user.subscribe(user =>{
      const filePath = 'usuarios/' + user.email +'/' + fileName;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);

    })
    
    this.downloadProfileImage();
    
   
  }

  goMeusVotos(){
    this.menu.close('sideMenu');
    this.router.navigate(['meus-votos']);
  }

  goAssinados(){
    this.menu.close('sideMenu');
    this.router.navigate(['assinados']);
  }

  goLogout(){
    this.authdSvc.signOut;
    //this.afAuth.auth.signOut;
    this.menu.close('sideMenu');
    this.menu.enable(false, 'sideMenu');
    this.router.navigate(['home']);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selecione uma foto',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.cameraAccess();
        }
      }, {
        text: 'Galeria',
        icon: 'folder',
        handler: () => {
          this.libraryAccess();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  downloadProfileImage(){
    //const user = this.authdSvc.getCurrentUser()
    //console.log(user)
    this.afAuth.user.subscribe(user=>{
      const ref = this.storage.ref('usuarios/' + user.email + '/profile.jpg');
      this.profileUrl = ref.getDownloadURL();
    })
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
