package se.culvertsoft.mgen.cpppack.generator.impl.classcpp

import se.culvertsoft.mgen.api.model.Module
import se.culvertsoft.mgen.compiler.util.SuperStringBuffer
import scala.collection.JavaConversions._
import se.culvertsoft.mgen.compiler.internal.BuiltInStaticLangGenerator._
import se.culvertsoft.mgen.compiler.internal.BuiltInGeneratorUtil._
import se.culvertsoft.mgen.api.model.CustomType
import se.culvertsoft.mgen.cpppack.generator.CppConstruction
import se.culvertsoft.mgen.cpppack.generator.impl.Alias._
import se.culvertsoft.mgen.cpppack.generator.CppGenUtils
import se.culvertsoft.mgen.cpppack.generator.CppTypeNames._
import se.culvertsoft.mgen.cpppack.generator.CppGenerator

object MkSetFieldsSet {

  def apply(
    t: CustomType,
    module: Module)(implicit txtBuffer: SuperStringBuffer) {

    implicit val currentModule = module

    val fields = t.fields()
    val allFields = t.getAllFieldsInclSuper()

    for (field <- fields) {
      ln(s"${t.shortName()}& ${t.shortName()}::${setFieldSet(field, "const bool state, const mgen::FieldSetDepth depth")} {")

      if (CppGenerator.canBeNull(field)) {
        ln(1, s"m_${field.name()}.ensureIsSet(state);")
      } else {
        ln(1, "if (!state)")
        ln(2, s"m_${field.name} = ${CppConstruction.defaultConstructNull(field)};")
        ln(1, s"${isSetName(field)} = state;")
      }

      if (field.typ().containsMgenCreatedType()) {
        ln(1, s"if (depth == mgen::DEEP)")
        ln(2, s"mgen::validation::setFieldSetDeep(m_${field.name()});")
      }

      ln(1, s"return *this;")
      ln(s"}")
      endl()
    }

    ln(s"${t.shortName()}& ${t.shortName()}::_setAllFieldsSet(const bool state, const mgen::FieldSetDepth depth) { ")
    for (field <- allFields)
      ln(2, s"${setFieldSet(field, "state, depth")};")
    ln(1, s"return *this;")
    ln(s"}")
    endl()

  }

}