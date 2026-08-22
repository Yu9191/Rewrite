if ($request.url.includes('api/img/aiSketch')) {
    let body = $request.body.replace(/("taskParameter"\s*:\s*)"\d+"/, '$1"0"');
    $done({ body: body });
} else {
    $done({});
}
