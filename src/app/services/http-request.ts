import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class HttpRequest {
  private parameters: Array<string> = [];

  constructor(private httpClient: HttpClient, private baseUrl: string) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.substring(0, baseUrl.length - 2) : baseUrl;
  }

  public path(...path: Array<string>): HttpRequest {
    let pathUrl = path.join('/');
    this.baseUrl += pathUrl.startsWith('/') ? pathUrl : '/' + pathUrl;
    return this;
  }

  public parameter(key: string, value: any): HttpRequest {
    this.parameters.push(encodeURIComponent(key) + '=' + encodeURIComponent(value.toString()));
    return this;
  }

  public get(): Observable<any> {
    return this.request('get');
  }

  private request(method: string): Observable<any> {
    let query = this.parameters.join('&');
    query = query ? '?' + query : '';
    return this.httpClient.request(method, this.baseUrl + query);
  }
}
