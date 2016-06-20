
var contentfulClient = contentful.createClient({
    accessToken: '1f1e6ff11efc5a2351f03451dfe0477ff583d67175cb26937f583d61d1ca94c7',
    space: '36t7ny03afhb'
})

var getallTemplate = 'template';
var getallPageContent = 'contentPage';
var itemArray = [];

contentfulClient.getEntries({
    content_type: getallTemplate
})
.then(function (entries) {

    for (var i = 0; i < entries.items.length; i++) {
        var item = entries.items[i];
        var name = item.fields.name;
        var value = item.fields.templateHtml;
        itemArray.push({ name: name, value: value });
    }
});

contentfulClient.getEntries({
    content_type: getallPageContent
})
  .then(function (entries) {

      for (var i = 0; i < entries.items.length; i++) {
          var item = entries.items[i];
          var name = item.fields.name;
          var value = item.fields.contentHtml;
          itemArray.push({ name: name, value: value });
      }
  });
