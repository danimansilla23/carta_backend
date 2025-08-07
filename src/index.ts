// src/index.ts

export default {
  register({ strapi }) {
    // Lista de modelos específicos que quieres monitorear
    const modelsToWatch = [
      'api::categoria.categoria',
      'api::producto.producto', 
      'api::plato-del-dia.plato-del-dia',
      'api::empanda.empanda',
      'api::pizza-adicional.pizza-adicional',
      'api::salsas-para-plato.salsas-para-plato',
      'api::salsas-para-pasta.salsas-para-pasta'
    ];

    // Suscribirse a todos los modelos
    strapi.db.lifecycles.subscribe({
      models: modelsToWatch,
      async afterCreate() {
        await actualizarFecha(strapi);
      },
      async afterUpdate() {
        await actualizarFecha(strapi);
      },
      async afterDelete() {
        await actualizarFecha(strapi);
      },
    });

    async function actualizarFecha(strapi: any) {
      try {
        const now = new Date().toISOString();
        
        strapi.log.info("🔍 Iniciando actualización de fecha...");
        
        // Intentar buscar el registro con ID 1 directamente
        try {
          const specificRecord = await strapi.entityService.findOne(
            "api::fecha-actualizado.fecha-actualizado",
            1
          );
          
          if (specificRecord) {
            strapi.log.info(`🔄 Actualizando registro ID 1 encontrado`);
            
            // Actualizar el registro existente
            await strapi.entityService.update(
              "api::fecha-actualizado.fecha-actualizado",
              1,
              {
                data: {
                  fecha: now,
                },
              }
            );
            strapi.log.info(`✅ Fecha actualizada para ID: 1`);
            return; // Salir de la función después de actualizar
          }
        } catch (err) {
          strapi.log.info(`❌ No se pudo encontrar registro ID 1:`, err.message);
        }

        // Solo crear un nuevo registro si realmente no existe el ID 1
        strapi.log.info("➕ Creando nuevo registro...");
        
        const newRecord = await strapi.entityService.create(
          "api::fecha-actualizado.fecha-actualizado",
          {
            data: {
              fecha: now,
            },
          }
        );
        strapi.log.info(`✅ Registro creado con ID: ${newRecord.id}`);
        
      } catch (error) {
        strapi.log.error("❌ Error:", error.message || error);
      }
    }
  },

  bootstrap() {},
};
