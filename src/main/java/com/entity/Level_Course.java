package com.entity;

import java.io.Serializable;

public class Level_Course implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Integer l_id;
	private String l_level;
	public Integer getL_id() {
		return l_id;
	}
	public void setL_id(Integer l_id) {
		this.l_id = l_id;
	}
	public String getL_level() {
		return l_level;
	}
	public void setL_level(String l_level) {
		this.l_level = l_level;
	}
	public Level_Course(Integer l_id, String l_level) {
		super();
		this.l_id = l_id;
		this.l_level = l_level;
	}
	public Level_Course() {
		super();
	}
	@Override
	public String toString() {
		return "Level_Course [l_id=" + l_id + ", l_level=" + l_level + "]";
	}
}
