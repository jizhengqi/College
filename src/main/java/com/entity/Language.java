package com.entity;

import java.io.Serializable;

public class Language implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Integer l_id;
	private String l_name;
	private Integer d_id;
	public Integer getL_id() {
		return l_id;
	}
	public void setL_id(Integer l_id) {
		this.l_id = l_id;
	}
	public String getL_name() {
		return l_name;
	}
	public void setL_name(String l_name) {
		this.l_name = l_name;
	}
	public Integer getD_id() {
		return d_id;
	}
	public void setD_id(Integer d_id) {
		this.d_id = d_id;
	}
	public Language(Integer l_id, String l_name, Integer d_id) {
		super();
		this.l_id = l_id;
		this.l_name = l_name;
		this.d_id = d_id;
	}
	public Language() {
		super();
	}
	@Override
	public String toString() {
		return "Language [l_id=" + l_id + ", l_name=" + l_name + ", d_id="
				+ d_id + "]";
	}
}
