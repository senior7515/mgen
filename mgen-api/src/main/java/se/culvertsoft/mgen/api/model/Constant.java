package se.culvertsoft.mgen.api.model;

/**
 * Represents a class static constant value or object.
 */
public class Constant {

	/**
	 * Returns the type of this constant.
	 * 
	 * @return the type of this constant
	 */
	public Type typ() {
		return m_type;
	}

	/**
	 * Sets the type of this constant.
	 * 
	 * @param m_type
	 *            the new type of this constant.
	 */
	public void setType(final Type m_type) {
		this.m_type = m_type;
	}

	/**
	 * Sets the value of this constant
	 * 
	 * @param m_value
	 *            the value of this constant
	 */
	public void setValue(final DefaultValue m_value) {
		this.m_value = m_value;
	}

	/**
	 * Gets the value of this constant.
	 * 
	 * @return the value of this constant.
	 */
	public DefaultValue value() {
		return m_value;
	}

	/**
	 * Gets the short name of this constant (without package.class path
	 * prepended). For example a class se.culvertsoft.Foo with constant Bar
	 * would return Bar.
	 * 
	 * @return The short name of this constant
	 */
	public String shortName() {
		return m_shortName;
	}

	/**
	 * Returns the short name of this constant concatenated with the short name
	 * of the parent class. E.g. If the parent class is se.culvertsoft.MyCLass
	 * and the constant is named Foo, the returned string would be MyClass.Foo.
	 * 
	 * @return The short name of this constant concatenated with the short name
	 *         of the parent class
	 */
	public String qualifiedShortName() {
		return m_qualifiedShortName;
	}

	/**
	 * Gets the full name of this constant (with package.class path prepended).
	 * For example a class se.culvertsoft.Foo with constant Bar would return
	 * se.culvertsoft.Foo.Bar.
	 * 
	 * @return The full name of this constant
	 */
	public String fullName() {
		return m_fullName;
	}

	/**
	 * Returns the parent class of this constant.
	 * 
	 * @return the parent class of this constant.
	 */
	public ClassType parent() {
		return m_parent;
	}

	/**
	 * Returns the field which originally specified this static constant.
	 * 
	 * @return the field which originally specified this static constant.
	 */
	public Field source() {
		return m_source;
	}

	/**
	 * Returns if this constant has been linked (both its type and value).
	 * 
	 * @return if this constant has been linked.
	 */
	public boolean isLinked() {
		return m_type != null && m_type.isLinked() && m_value != null && m_value.isLinked();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public String toString() {
		return "Constant [m_fullName=" + m_fullName + ", m_type=" + m_type + ", m_value=" + m_value
				+ "]";
	}

	/**
	 * Creates a new constant
	 * 
	 * @param name
	 *            The simple name of the constant (without module name
	 *            prepended)
	 * 
	 * @param parent
	 *            The class wherein this constant is defined
	 * 
	 * @param type
	 *            The type of this constant
	 * 
	 * @param value
	 *            The value of this constant
	 * 
	 * @param source
	 *            The field object originally parsed from the IDL that created
	 *            this constant
	 */
	public Constant(
			final String name,
			final ClassType parent,
			final Type type,
			final DefaultValue value,
			final Field source) {
		m_shortName = name;
		m_qualifiedShortName = parent.shortName() + "." + name;
		m_fullName = parent.fullName() + "." + name;
		m_parent = parent;
		m_type = type;
		m_value = value;
		m_source = source;
	}

	private final String m_shortName;
	private final String m_qualifiedShortName;
	private final String m_fullName;
	private final ClassType m_parent;
	private Type m_type;
	private DefaultValue m_value;
	private final Field m_source;

}
