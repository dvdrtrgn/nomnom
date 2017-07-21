mod_munger
mod-masher

take urls
  add
  sort


process(list)
  parse
    make array of loose but ordered urls
  gather
    arr = list.map(function (url) {
      return promise of js/txt (curl each url)
    });
  merge
    str = arr.reduce(function (js1, js2) {
      return js1 + js2
    });
  write
    to a file
    store pointer
  inject
    all pages
    post type
    ids
    selector query


config pages
  gather urls
  need order

[fancy]
  text-input __________ (grip)
    validate url
    allow order changing thru drag and drop
[plain]
  text-area []
    json or js file with the list of urls to hit

compile into 1 js file
  store in plugin folder (as xxx.js)

wp_enqueue_script(xxx.js)
