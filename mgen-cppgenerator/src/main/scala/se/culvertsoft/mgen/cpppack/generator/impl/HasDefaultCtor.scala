package se.culvertsoft.mgen.cpppack.generator.impl

import se.culvertsoft.mgen.api.model.CustomType
import se.culvertsoft.mgen.api.model.Field
import se.culvertsoft.mgen.api.model.ListOrArrayType
import se.culvertsoft.mgen.api.model.MapType
import se.culvertsoft.mgen.api.model.StringType

object HasDefaultCtor {

  def apply(field: Field): Boolean = {
    field.typ match {
      case _: ListOrArrayType => true
      case _: MapType => true
      case _: CustomType => true
      case _: StringType => true
      case _ => false
    }
  }

}