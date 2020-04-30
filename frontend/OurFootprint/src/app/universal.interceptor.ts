import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Inject, Injectable, Optional } from '@angular/core'
import { REQUEST } from '@nguniversal/express-engine/tokens'
import { Request } from 'express'

/**
 * This interceptor intercepts requests made to the server.
 * If the request is not already absolute, it adds the necessary protocol etc to the url before making the request.
 * Only absolute URLs should be used when making HTTP calls with server-side rendering.
 */
@Injectable()
export class UniversalInterceptor implements HttpInterceptor {

  constructor(@Optional() @Inject(REQUEST) protected request: Request) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let serverReq: HttpRequest<any> = req

    // there is a request and it is not already absolute.
    if (this.request && req.url.indexOf('http') !== 0) {
      // construct the new url
      let newUrl = `${this.request.protocol}://${this.request.get('host')}`
      if (!req.url.startsWith('/')) {
        newUrl += '/'
      }
      newUrl += req.url

      // clone the request with a new url. All other attributes (post data etc) will remain unchanged
      serverReq = req.clone({url: newUrl})
    }

    return next.handle(serverReq)
  }
}
