
tinymce.init({
    selector: 'textarea#format-custom',
    height: 500,
    plugins: 'table wordcount lists',
    toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | numlist bullist',
    content_style: '.left { text-align: left; } ' +
      'table.left { float: left; } ' +
      '.right { text-align: right; } ' +
      'table.right { float: right; } ' +
      '.center { text-align: center; } ' +
      'table.center { display: block; margin: 0 auto; } ' +
      '.full { text-align: justify; } ' +
      'table.full { display: block; margin: 0 auto; } ' +
      '.bold { font-weight: bold; } ' +
      '.italic { font-style: italic; } ' +
      '.underline { text-decoration: underline; } ' +
      '.example1 {} ' +
      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }' +
      '.tablerow1 { background-color: #D3D3D3; }',
    formats: {
      alignleft: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'left' },
      aligncenter: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'center' },
      alignright: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'right' },
      alignfull: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'full' },
      bold: { inline: 'span', classes: 'bold' },
      italic: { inline: 'span', classes: 'italic' },
      underline: { inline: 'span', classes: 'underline', exact: true },
      strikethrough: { inline: 'del' }
    }
  });
  
  