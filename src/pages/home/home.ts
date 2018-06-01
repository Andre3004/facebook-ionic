import { Component } from '@angular/core';
import { NavController, AlertController, Alert } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { FacebookService } from '../../service/facebook.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [FacebookService]
})
export class HomePage
{

  /*-------------------------------------------------------------------
   *                           ATTRIBUTES
   *-------------------------------------------------------------------*/

  /**
   * Repreenta uma lista de posts
   */
  public posts: Observable<any[]>;

  /*-------------------------------------------------------------------
    *                           CONSTRUCTOR
    *-------------------------------------------------------------------*/

  /**
   * 
   * @param navCtrl 
   * @param facebookService 
   */
  constructor(public navCtrl: NavController,
    public alertCtrl : AlertController,
    public facebookService: FacebookService)
  {
    //Busca os posts da página pelo serviço do facebook 
    //Passando como parâmetro o nome da página
    this.presentPrompt();
  }

  /*-------------------------------------------------------------------
    *                           BEHAVIORS
    *-------------------------------------------------------------------*/

  /**
   * Monta a lista dos posts
   */
  public mapPosts = (post) =>
  {
    return {
      from: post.from,
      time: post.created_time * 1000, // convert to milliseconds
      message: post.message,
      photos: this.getPhotos(post)
    };
  }

  /**
   * Monta as imagens para mostrar nos cards
   */
  public getPhotos = (post) =>
  {
    if (!post.attachments) return [];

    let anexos = post.attachments.data[0].subattachments || post.attachments;

    return anexos.data.filter(x => x.type == "photo").map(x => x.media.image);
  }

  presentPrompt(): Alert
  {
    let alert = this.alertCtrl.create({
      title: 'Insira a pagina',
      inputs : [
        {
            type:'radio',
            label:'SAM',
            value:'SouthAmericMemes',
        },
        {
            type:'radio',
            label:'Meme',
            value:'MemesFresquinhosQuesairamdoForno'
        },
        {
          type:'radio',
          label:'Memes br',
          value:'memesbr11'
      }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data =>
          {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buscar',
          handler: data =>
          {
            this.posts = this.facebookService.getPosts(data)
      .map(data => data.map(this.mapPosts));
          }
        }
      ]
    });
    alert.present();
    return alert;
  }

}
