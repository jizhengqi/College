package com.entity;

import java.io.Serializable;
import java.util.Date;

public class Login_Log implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Integer l_id;
	private Integer a_id;
	private Date start_date;
	private Date end_date;
	public Integer getL_id() {
		return l_id;
	}
	public void setL_id(Integer l_id) {
		this.l_id = l_id;
	}
	public Integer getA_id() {
		return a_id;
	}
	public void setA_id(Integer a_id) {
		this.a_id = a_id;
	}
	public Date getStart_date() {
		return start_date;
	}
	public void setStart_date(Date start_date) {
		this.start_date = start_date;
	}
	public Date getEnd_date() {
		return end_date;
	}
	public void setEnd_date(Date end_date) {
		this.end_date = end_date;
	}
	public Login_Log(Integer l_id, Integer a_id, Date start_date, Date end_date) {
		super();
		this.l_id = l_id;
		this.a_id = a_id;
		this.start_date = start_date;
		this.end_date = end_date;
	}
	public Login_Log() {
		super();
	}
	@Override
	public String toString() {
		return "Login_Log [l_id=" + l_id + ", a_id=" + a_id + ", start_date="
				+ start_date + ", end_date=" + end_date + "]";
	}
}
