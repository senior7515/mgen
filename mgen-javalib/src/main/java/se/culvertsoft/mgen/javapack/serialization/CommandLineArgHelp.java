package se.culvertsoft.mgen.javapack.serialization;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import se.culvertsoft.mgen.api.model.BoolType;
import se.culvertsoft.mgen.api.model.Field;
import se.culvertsoft.mgen.javapack.classes.MGenBase;
import se.culvertsoft.mgen.javapack.exceptions.SerializationException;

public class CommandLineArgHelp {

	private final Class<? extends MGenBase> m_cls;
	private final MGenBase m_instance;
	private final Map<String, Field> fullNameFields = new LinkedHashMap<>();
	private final HashSet<Field> m_shortCuts = new HashSet<>();
	private final HashSet<Character> m_shortcutChars = new HashSet<>();
	private final List<Field> m_required = new ArrayList<>();
	private final List<Field> m_optional = new ArrayList<>();
	private final Field[] m_fields;
	private final StringBuilder m_builder;

	public CommandLineArgHelp(final Class<? extends MGenBase> cls) {
		m_cls = cls;
		m_instance = newInstance(cls);
		m_fields = m_instance._fields();
		m_builder = new StringBuilder();
		sortFields();
		buildHelpString();
	}

	private void sortFields() {

		for (final Field field : m_fields) {

			final char firstChar = field.name().charAt(0);

			fullNameFields.put(field.name(), field);
			if (!m_shortcutChars.contains(firstChar)) {
				m_shortcutChars.add(firstChar);
				m_shortCuts.add(field);
			}

			if (field.isRequired())
				m_required.add(field);
			else
				m_optional.add(field);

		}
	}

	private void buildHelpString() {

		try {

			m_builder.setLength(0);

			// Print all args first
			m_builder.append("arguments summary:");
			for (final Field field : m_fields) {
				m_builder.append(" [");
				m_builder.append(key(field));
				m_builder.append(expectsValue(field) ? " "
						+ field.name().toUpperCase() : "");
				m_builder.append("]");
			}
			m_builder.append("\n\n");

			// Now print required arguments
			m_builder.append("required arguments:\n");
			buildArgSet(m_required);

			// Now print optional arguments
			m_builder.append("optional arguments:\n");
			buildArgSet(m_optional);

		} catch (final Exception e) {
			throw new SerializationException(
					"Could not generate command line arguments help text for "
							+ m_cls,
					e);
		}
	}

	private void buildArgSet(final Collection<Field> set) {
		for (final Field field : set) {
			m_builder.append("  ");
			if (hasShortcut(field))
				m_builder.append(shortKey(field) + ", ");
			m_builder.append(fullKey(field) + " ");
			if (expectsValue(field))
				m_builder.append("(" + field.typ() + ")");
			m_builder.append("\n");
		}
		m_builder.append("\n");
	}

	@Override
	public String toString() {
		return m_builder.toString();
	}

	boolean hasShortcut(final Field f) {
		return m_shortCuts.contains(f);
	}

	boolean expectsValue(final Field field) {
		return field.typ() != BoolType.INSTANCE;
	}

	String fullKey(final Field field) {
		return "--" + field.name();
	}

	String shortKey(final Field field) {
		return "-" + field.name().substring(0, 1);
	}

	String key(final Field field) {
		return m_shortCuts.contains(field) ? "-" + field.name().substring(0, 1)
				: fullKey(field);
	}

	private static MGenBase newInstance(final Class<? extends MGenBase> cls) {
		try {
			return cls.newInstance();
		} catch (final Exception e) {
			throw new SerializationException(
					"Could not instantiate object of type " + cls,
					e);
		}
	}

}
