package com.entity;

import java.io.Serializable;

public class Module implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Integer m_id;
	private String m_name;
	private Integer l_id;
	public Integer getM_id() {
		return m_id;
	}
	public void setM_id(Integer m_id) {
		this.m_id = m_id;
	}
	public String getM_name() {
		return m_name;
	}
	public void setM_name(String m_name) {
		this.m_name = m_name;
	}
	public Integer getL_id() {
		return l_id;
	}
	public void setL_id(Integer l_id) {
		this.l_id = l_id;
	}
	public Module(Integer m_id, String m_name, Integer l_id) {
		super();
		this.m_id = m_id;
		this.m_name = m_name;
		this.l_id = l_id;
	}
	public Module() {
		super();
	}
	@Override
	public String toString() {
		return "Module [m_id=" + m_id + ", m_name=" + m_name + ", l_id=" + l_id
				+ "]";
	}
}
