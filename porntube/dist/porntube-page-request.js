/* porntube-page-request.js - Build 2026-11-14 12:53:02 */
!function(){"use strict";const e={...$request.headers||{}};for(const t of Object.keys(e))/^if-(modified-since|none-match)$/i.test(t)&&delete e[t];$done({headers:e})}();
