import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class FacebookService
{

    /*-------------------------------------------------------------------
     *                           ATTRIBUTES
     *-------------------------------------------------------------------*/

    /**
     * Pegar um novo token, o mesmo expira
     */
    // https://developers.facebook.com/tools/explorer/145634995501895/

    /**
     * Token da sua conta do facebook
     */
    private accessToken = 'EAACEdEose0cBAEw26Lu3nOUMKoZCKHjdfdWi37cikZAGZBGm8eMWfgZCrTZAdoxrLkZCrrwFvt2ZCwZAA68bNRMW6od7b7rOZBeJsSk87QUHKHpla5KXQ51Dvxb4WJflmuHBYdH7imTi2ZBqSDWQ2FpeimqdToAZBRxF4XPuT1brQ19juSKYK6UjMxhdy3K2Huf6e5zxYZAB8ZCqZBtgZDZD';

    /**
     * graphUrl pra gerar a consulta
     */
    private graphUrl = 'https://graph.facebook.com/';

    /**
     * Query pra buscar os posts, fotos da página
     */
    private graphQuery = `?access_token=${ this.accessToken }&date_format=U&fields=posts{from,created_time,message,attachments}`;

    /*-------------------------------------------------------------------
    *                           CONSTRUCTOR
    *-------------------------------------------------------------------*/
    /**
     * 
     * @param http 
     */
    constructor(private http: Http) { }

    /*-------------------------------------------------------------------
    *                           BEHAVIORS
    *-------------------------------------------------------------------*/
    /**
     * Serviço para buscar os posts
     * @param pageName 
     */
    getPosts(pageName: string): Observable<any[]> 
    {
        let url = this.graphUrl + pageName + this.graphQuery;

        //Pega resposta da requisição, converte pra json e os dados do post
        return this.http
            .get(url)
            .map(response => response.json().posts.data);
    }
}