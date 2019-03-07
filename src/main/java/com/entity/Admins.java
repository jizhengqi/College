package com.entity;

import java.io.Serializable;
import java.util.Date;

public class Admins implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Integer a_id;
	private String a_name;
	private String a_pwd;
	private Date a_date;
	private Integer a_level;
	private String a_img;
	private Date a_login_date;
	public Integer getA_id() {
		return a_id;
	}
	public void setA_id(Integer a_id) {
		this.a_id = a_id;
	}
	public String getA_name() {
		return a_name;
	}
	public void setA_name(String a_name) {
		this.a_name = a_name;
	}
	public String getA_pwd() {
		return a_pwd;
	}
	public void setA_pwd(String a_pwd) {
		this.a_pwd = a_pwd;
	}
	public Date getA_date() {
		return a_date;
	}
	public void setA_date(Date a_date) {
		this.a_date = a_date;
	}
	public Integer getA_level() {
		return a_level;
	}
	public void setA_level(Integer a_level) {
		this.a_level = a_level;
	}
	public String getA_img() {
		return a_img;
	}
	public void setA_img(String a_img) {
		this.a_img = a_img;
	}
	public Date getA_login_date() {
		return a_login_date;
	}
	public void setA_login_date(Date a_login_date) {
		this.a_login_date = a_login_date;
	}
	public Admins(Integer a_id, String a_name, String a_pwd, Date a_date,
			Integer a_level, String a_img, Date a_login_date) {
		super();
		this.a_id = a_id;
		this.a_name = a_name;
		this.a_pwd = a_pwd;
		this.a_date = a_date;
		this.a_level = a_level;
		this.a_img = a_img;
		this.a_login_date = a_login_date;
	}
	public Admins() {
		super();
	}
	@Override
	public String toString() {
		return "Admins [a_id=" + a_id + ", a_name=" + a_name + ", a_pwd="
				+ a_pwd + ", a_date=" + a_date + ", a_level=" + a_level
				+ ", a_img=" + a_img + ", a_login_date=" + a_login_date + "]";
	}
}
