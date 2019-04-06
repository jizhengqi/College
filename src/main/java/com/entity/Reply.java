package com.entity;

import java.io.Serializable;
import java.util.Date;

public class Reply implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Integer r_id;
	private String r_ask;
	private Date r_data;
	private Integer s_id;
	private Integer id;
	private Integer r_solve;
	private String uid;
	public Integer getR_id() {
		return r_id;
	}
	public void setR_id(Integer r_id) {
		this.r_id = r_id;
	}
	public String getR_ask() {
		return r_ask;
	}
	public void setR_ask(String r_ask) {
		this.r_ask = r_ask;
	}
	public Date getR_data() {
		return r_data;
	}
	public void setR_data(Date r_data) {
		this.r_data = r_data;
	}
	public Integer getS_id() {
		return s_id;
	}
	public void setS_id(Integer s_id) {
		this.s_id = s_id;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getR_solve() {
		return r_solve;
	}
	public void setR_solve(Integer r_solve) {
		this.r_solve = r_solve;
	}
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public Reply(Integer r_id, String r_ask, Date r_data, Integer s_id,
			Integer id, Integer r_solve, String uid) {
		super();
		this.r_id = r_id;
		this.r_ask = r_ask;
		this.r_data = r_data;
		this.s_id = s_id;
		this.id = id;
		this.r_solve = r_solve;
		this.uid = uid;
	}
	public Reply() {
		super();
	}
	@Override
	public String toString() {
		return "Reply [r_id=" + r_id + ", r_ask=" + r_ask + ", r_data="
				+ r_data + ", s_id=" + s_id + ", id=" + id + ", r_solve="
				+ r_solve + ", uid=" + uid + "]";
	}
}
