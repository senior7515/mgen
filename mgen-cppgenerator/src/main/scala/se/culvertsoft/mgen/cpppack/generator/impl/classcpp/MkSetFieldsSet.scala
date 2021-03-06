package se.culvertsoft.mgen.cpppack.generator.impl.classcpp

import scala.collection.JavaConversions.asScalaBuffer

import se.culvertsoft.mgen.api.model.ClassType
import se.culvertsoft.mgen.api.model.ListOrArrayType
import se.culvertsoft.mgen.api.model.MapType
import se.culvertsoft.mgen.api.model.Module
import se.culvertsoft.mgen.compiler.internal.BuiltInGeneratorUtil.endl
import se.culvertsoft.mgen.compiler.internal.BuiltInGeneratorUtil.ln
import se.culvertsoft.mgen.compiler.util.SourceCodeBuffer
import se.culvertsoft.mgen.cpppack.generator.CppConstruction
import se.culvertsoft.mgen.cpppack.generator.CppGenerator
import se.culvertsoft.mgen.cpppack.generator.impl.Alias.isFieldSet
import se.culvertsoft.mgen.cpppack.generator.impl.Alias.isSetName
import se.culvertsoft.mgen.cpppack.generator.impl.Alias.setFieldSet

object MkSetFieldsSet {

  def apply(t: ClassType)(implicit txtBuffer: SourceCodeBuffer) {

    implicit val module = t.module
    val fields = t.fields()
    val allFields = t.fieldsInclSuper()

    for (field <- fields) {
      ln(s"${t.shortName()}& ${t.shortName()}::${setFieldSet(field, "const bool state, const mgen::FieldSetDepth depth")} {")

      if (field.hasDefaultValue) {
        ln(1, s"if (state && !${isFieldSet(field, "mgen::SHALLOW")})")
        ln(2, s"m_${field.name} = ${MkDefaultValue(field)};")
      }

      if (CppGenerator.canBeNull(field)) {
        ln(1, s"m_${field.name()}.ensureIsSet(state);")
        ln(1, s"if (state && depth == mgen::DEEP)")
        ln(2, s"mgen::validation::setFieldSetDeep(m_${field.name()});")
      } else {

        def setGeneric() {
          ln(1, "if (!state)")
          ln(2, s"m_${field.name}.clear();")
          if (t.containsUserDefinedType()) {
            ln(1, s"else if (depth == mgen::DEEP)")
            ln(2, s"mgen::validation::setFieldSetDeep(m_${field.name()});")
          }
        }

        def setCustom() {
          ln(1, "if (depth == mgen::DEEP)")
          ln(2, s"m_${field.name}._setAllFieldsSet(state, mgen::DEEP);")
        }

        def setByDefCtor() {
          ln(1, "if (!state)")
          ln(2, s"m_${field.name} = ${CppConstruction.defaultConstructNull(field)};")
        }

        field.typ() match {
          case t: MapType => setGeneric()
          case t: ListOrArrayType => setGeneric()
          case t: ClassType => setCustom()
          case _ => setByDefCtor()
        }

        ln(1, s"${isSetName(field)} = state;")
      }

      ln(1, s"return *this;")
      ln(s"}")
      endl()
    }

    ln(s"${t.shortName()}& ${t.shortName()}::_setAllFieldsSet(const bool state, const mgen::FieldSetDepth depth) { ")
    for (field <- allFields)
      ln(1, s"${setFieldSet(field, "state, depth")};")
    ln(1, s"return *this;")
    ln(s"}")
    endl()

  }

}