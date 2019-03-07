package com.entity;

import java.io.Serializable;

public class Direction implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Integer d_id;
	private String d_name;
	public Integer getD_id() {
		return d_id;
	}
	public void setD_id(Integer d_id) {
		this.d_id = d_id;
	}
	public String getD_name() {
		return d_name;
	}
	public void setD_name(String d_name) {
		this.d_name = d_name;
	}
	public Direction(Integer d_id, String d_name) {
		super();
		this.d_id = d_id;
		this.d_name = d_name;
	}
	public Direction() {
		super();
	}
	@Override
	public String toString() {
		return "Direction [d_id=" + d_id + ", d_name=" + d_name + "]";
	}
}
