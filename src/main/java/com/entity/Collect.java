package com.entity;

import java.io.Serializable;
import java.util.Date;

public class Collect implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Integer u_id;
	private Integer c_id;
	private Integer v_id;
	private Date c_date;
	public Integer getU_id() {
		return u_id;
	}
	public void setU_id(Integer u_id) {
		this.u_id = u_id;
	}
	public Integer getC_id() {
		return c_id;
	}
	public void setC_id(Integer c_id) {
		this.c_id = c_id;
	}
	public Integer getV_id() {
		return v_id;
	}
	public void setV_id(Integer v_id) {
		this.v_id = v_id;
	}
	public Date getC_date() {
		return c_date;
	}
	public void setC_date(Date c_date) {
		this.c_date = c_date;
	}
	public Collect(Integer u_id, Integer c_id, Integer v_id, Date c_date) {
		super();
		this.u_id = u_id;
		this.c_id = c_id;
		this.v_id = v_id;
		this.c_date = c_date;
	}
	public Collect() {
		super();
	}
	@Override
	public String toString() {
		return "Collect [u_id=" + u_id + ", c_id=" + c_id + ", v_id=" + v_id
				+ ", c_date=" + c_date + "]";
	}
}
