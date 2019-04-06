package com.entity;

import java.io.Serializable;

public class Learn implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Integer u_id;
	private Integer c_id;
	private Integer v_id;
	private Integer state;
	private double l_date;

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

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

	public double getL_date() {
		return l_date;
	}

	public void setL_date(double l_date) {
		this.l_date = l_date;
	}

	public Learn() {
		super();
	}

	@Override
	public String toString() {
		return "Learn [u_id=" + u_id + ", c_id=" + c_id + ", v_id=" + v_id
				+ ", state=" + state + ", l_date=" + l_date + "]";
	}
}
