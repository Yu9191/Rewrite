const reqUrl = (typeof $request !== 'undefined' && $request.url) ? $request.url : '';
let pageId = '';
let m = reqUrl.match(/[?&]id=([^&#]+)/);
if (m) {
  try { pageId = decodeURIComponent(m[1]); } catch (_) { pageId = m[1]; }
} else {
  const mp = reqUrl.match(/\/movies\/([^/?]+)\.html?(?:[?#]|$)/);
  if (mp && mp[1] && mp[1] !== 'player') pageId = mp[1];
}
if (!/^[A-Za-z0-9_\-]+$/.test(pageId || '')) pageId = '';

let body = $response.body || '';

if (pageId) body = body.split('crazy_love_1993_720').join(pageId);

const INJECT = `<script>(function(){
  try {
    var id = (location.search.match(/[?&]id=([^&#]+)/)||[])[1];
    if (id) { try { id = decodeURIComponent(id); } catch(e){} }
    if (!id) {
      var pm = location.pathname.match(/\\/movies\\/([^/]+?)\\.html?$/);
      if (pm && pm[1] && pm[1] !== 'player') id = pm[1];
    }
    if (!id || !/^[A-Za-z0-9_\\-]+$/.test(id)) return;
    var fix = function(u){
      if (typeof u !== 'string') return u;
      u = u.replace(/\\/crazy_love_1993_720\\//g, '/' + id + '/');
      u = u.replace(/\\/(video|movie)\\/720\\/([^/]+)\\/preview\\.m3u8/g, '/$1/720/$2/720.m3u8');
      u = u.replace(/\\/(video|movie)\\/360\\/([^/]+)\\/preview\\.m3u8/g, '/$1/360/$2/360.m3u8');
      return u;
    };
    var _fetch = window.fetch;
    if (_fetch) {
      window.fetch = function(input, init){
        try {
          if (typeof input === 'string') input = fix(input);
          else if (input && input.url) input = new Request(fix(input.url), input);
        } catch(e){}
        return _fetch.call(this, input, init);
      };
    }
    var _open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url){
      try { arguments[1] = fix(url); } catch(e){}
      return _open.apply(this, arguments);
    };
    try {
      var d = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'src');
      if (d && d.set) {
        Object.defineProperty(HTMLMediaElement.prototype, 'src', {
          configurable: true, enumerable: true,
          get: function(){ return d.get.call(this); },
          set: function(v){ return d.set.call(this, fix(v)); }
        });
      }
    } catch(e){}
    var _setAttr = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function(name, value){
      try {
        if ((name === 'src' || name === 'data-src') && typeof value === 'string') value = fix(value);
      } catch(e){}
      return _setAttr.call(this, name, value);
    };
  } catch(e) {}
})();</script>`;

if (body.indexOf('<head>') !== -1) {
  body = body.replace('<head>', '<head>' + INJECT);
} else if (body.indexOf('<head ') !== -1) {
  body = body.replace(/<head([^>]*)>/, '<head$1>' + INJECT);
} else {
  body = INJECT + body;
}

$done({ body });
