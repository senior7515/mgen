package se.culvertsoft.mgen.api.plugins;

public class GeneratedSourceFile {

	public GeneratedSourceFile(final String filePath, final String sourceCode) {
		m_filePath = filePath;
		m_sourceCode = sourceCode;
	}

	public String sourceCode() {
		return m_sourceCode;
	}

	public String filePath() {
		return m_filePath;
	}

	@Override
	public String toString() {
		return "GeneratedSourceFile [m_filePath=" + m_filePath
				+ ", m_sourceCode=" + m_sourceCode + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((m_filePath == null) ? 0 : m_filePath.hashCode());
		result = prime * result
				+ ((m_sourceCode == null) ? 0 : m_sourceCode.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		GeneratedSourceFile other = (GeneratedSourceFile) obj;
		if (m_filePath == null) {
			if (other.m_filePath != null)
				return false;
		} else if (!m_filePath.equals(other.m_filePath))
			return false;
		if (m_sourceCode == null) {
			if (other.m_sourceCode != null)
				return false;
		} else if (!m_sourceCode.equals(other.m_sourceCode))
			return false;
		return true;
	}

	private final String m_filePath;
	private final String m_sourceCode;

}
