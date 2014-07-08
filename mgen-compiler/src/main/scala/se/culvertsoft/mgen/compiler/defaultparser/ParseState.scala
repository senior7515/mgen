package se.culvertsoft.mgen.compiler.defaultparser

import scala.collection.mutable.ArrayBuffer
import scala.collection.mutable.HashMap

import se.culvertsoft.mgen.api.model.CustomType
import se.culvertsoft.mgen.api.model.Module
import se.culvertsoft.mgen.api.model.impl.LinkedCustomType
import se.culvertsoft.mgen.api.model.impl.ModuleImpl
import se.culvertsoft.mgen.api.model.impl.ProjectImpl

class ParseState {

  object fileParsing {
    val projects = new HashMap[String, ProjectImpl]
    val modules = new HashMap[String, ModuleImpl]
  }

  object typeLookup {
    val typesShortName = new HashMap[String, ArrayBuffer[LinkedCustomType]]
    val typesFullName = new HashMap[String, LinkedCustomType]
  }

  object needLinkage {
    val types = new ArrayBuffer[LinkedCustomType]
  }

  def allTypes(): Seq[CustomType] = {
    typeLookup.typesShortName.values.flatten.toSeq
  }

  def allModules(): Seq[Module] = {
    fileParsing.modules.values.toSeq
  }

}