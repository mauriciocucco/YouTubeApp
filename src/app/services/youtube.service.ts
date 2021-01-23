import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { YoutubeResponse } from '../models/youtube.models';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private youtubeUrl: string = 'https://www.googleapis.com/youtube/v3';
  private apiKey: string = 'AIzaSyDB-n8pCSfVUrWhXBDdR5qUVEP4dnAxQ2g';
  private playlistId: string = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken: string = '';

  constructor(private http: HttpClient) {}

  getVideos() {
    const url: string = `${this.youtubeUrl}/playlistItems`;
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('key', this.apiKey)
      .set('playlistId', this.playlistId)
      .set('maxResults', '10')
      .set('pageToken', this.nextPageToken);

    return this.http
      .get<YoutubeResponse>(url, { params })
      .pipe(
        map((resp) => {
          this.nextPageToken = resp.nextPageToken;
          return resp.items;
        }),
        map((items) => items.map((item) => item.snippet))
      );
  }
}
