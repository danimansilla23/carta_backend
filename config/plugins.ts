export default () => ({
  'strapi-csv-import-export': {
    enabled: true,
    config: {
      authorizedExports: [
        'api::categoria.categoria',
        'api::plato-del-dia.plato-del-dia',
        'api::producto.producto',
        'api::salsas-para-pasta.salsas-para-pasta',
        'api::salsas-para-plato.salsas-para-plato',
      ],
      authorizedImports: [
        'api::categoria.categoria',
        'api::plato-del-dia.plato-del-dia',
        'api::producto.producto',
        'api::salsas-para-pasta.salsas-para-pasta',
        'api::salsas-para-plato.salsas-para-plato',
      ],
    },
  },
});