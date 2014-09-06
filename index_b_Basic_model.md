---
layout: default
link-title: Defining a model
submenu:
  - { anchor: "a", title: "Defining a model" }
  - { anchor: "b", title: "The MGen IDL" }
---

## Defining a model <a name="a">&nbsp;</a>

The simplest use case for MGen is defining a data model, [generating source code](index_c_Generating_code.html) and [providing cross-language serialization functionality](index_c_using_gen_code.html). The data model in this example is defined in the MGen IDL - MGen can be configured to use other IDLs, or combine multiple IDLs, but we consider those to be advanced subjects.

Types/classes are defined within modules. A module corresponds to a c++ namespace or java package. A module is defined in a module file, where the name of the module file determines the **module path** (java package name, or c++ namespace).

A file named **com.fruitcompany.fruits.xml**, with the contents:

    <Module>

      <Enums>
        <Brand><A/></B/><C/></Brand>
      </Enums>

      <Types>

        <Fruit>
          <brand type="Brand"/>
        </Fruit>

        <Apple extends="Fruit">
          <radius type="float64"/>
        </Apple>

        <Banana extends="Fruit">
          <length type="float64"/>
        </Banana>

      </Types>

    </Module>

Defines a module with:

 * Brand - an enum
 * Fruit - a class
 * Apple - a sub class of Fruit
 * Banana - a sub class of Fruit

This is all we need to define a complete data model in the c++ namespace "com::fruitcompany::fruits" and/or java package com.fruitcompany.fruits. The order of the definitions does not matter.


### The MGen IDL <a name="b">&nbsp;</a>

The MGen IDL is the code you see in the section above. It is the language we created for specifying data models in. It's written in XML, and supports:

 * Classes with single inheritance
 * Fixed point numeric types: int8, int16, int32, int64
 * Floading point numeric types: float32, float64
 * Strings
 * maps: [*numeric/string* -> any]
 * lists: [any]
 * arrays: [any]
 * enumerations
 * Class members of any type of the types above (and classes)
 * Class members that are polymorphic
 * Class member default values
 * Class member flags (e.g. required, polymorphic, transient etc.)
 * Class constants
 * Heterogenous containers (through polymorphism)

For more information of what features are supported in the MGen IDL, see [our preliminary technical whitepaper](http://culvertsoft.se/docs/WhitePaper.pdf).

Also have a look at some of the test models for MGen we have over at github:

 * [https://github.com/culvertsoft/mgen/tree/master/mgen-compiler/src/test/resources](https://github.com/culvertsoft/mgen/tree/master/mgen-compiler/src/test/resources)
 * [https://github.com/culvertsoft/mgen/tree/master/mgen-integrationtests/models/depends](https://github.com/culvertsoft/mgen/tree/master/mgen-integrationtests/models/depends)
 * [https://github.com/culvertsoft/mgen/tree/master/mgen-integrationtests/models/read](https://github.com/culvertsoft/mgen/tree/master/mgen-integrationtests/models/read)
 * [https://github.com/culvertsoft/mgen/tree/master/mgen-integrationtests/models/write](https://github.com/culvertsoft/mgen/tree/master/mgen-integrationtests/models/write)