import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type UbigeoDocument = HydratedDocument<Ubigeo>;

@Schema({ collection: 'ubigeo' })
export class Ubigeo {

  @Prop()
  id_ubigeo: string;

  @Prop()
  ubigeo_reniec: string;

  @Prop()
  ubigeo_inei: string;

  @Prop()
  departamento_inei: string;

  @Prop()
  departamento: string;

  @Prop()
  provincia_inei: string;

  @Prop()
  provincia: string;

  @Prop()
  distrito: string;

  @Prop()
  region: string;

  @Prop()
  macroregion_inei: string;

  @Prop()
  macroregion_minsa: string;

  @Prop()
  iso_3166_2: string;

  @Prop()
  fips: string;

  @Prop()
  superficie: string;

  @Prop()
  altitud: string;

  @Prop()
  latitud: string;

  @Prop()
  longitud: string;

  @Prop()
  Frontera: string;

}

export const UbigeoSchema = SchemaFactory.createForClass(Ubigeo);
