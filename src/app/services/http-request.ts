import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class HttpRequest {
  private parameters: string[] = [];
  private data: any;

  constructor(private httpClient: HttpClient, private baseUrl: string) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.substring(0, baseUrl.length - 2) : baseUrl;
  }

  public path(...path: string[]): HttpRequest {
    const pathUrl = path.join('/');
    this.baseUrl += pathUrl.startsWith('/') ? pathUrl : '/' + pathUrl;
    return this;
  }

  public parameter(key: string, value: any): HttpRequest {
    this.parameters.push(encodeURIComponent(key) + '=' + encodeURIComponent(value.toString()));
    return this;
  }

  public body(data: any): HttpRequest {
    this.data = data;
    return this;
  }

  public get(): Observable<any> {
    return this.request('get');
  }

  public post(): Observable<any> {
    return this.request('post');
  }

  public toString(): string {
    let query = this.parameters.join('&');
    query = query ? '?' + query : '';
    return this.baseUrl + query;
  }

  private request(method: string): Observable<any> {
    return this.httpClient.request(method, this.toString(), {
      body: this.data
    });
  }
}
