package com.entity;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.util.DateJsonTypeConvert;

public class Curriculum implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Integer c_id;
	private String c_name;
	private String c_introduction;
	private String c_author;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date c_date;
	private String c_background;
	private String c_Software;
	private Integer c_typeOfCourse;
	private String c_typeOfContent;
	private Integer c_level;
	private String c_users;
	private Integer m_id;
	private Integer u_id;
	private Integer c_vip;

	public Integer getC_id() {
		return c_id;
	}

	public void setC_id(Integer c_id) {
		this.c_id = c_id;
	}

	public String getC_name() {
		return c_name;
	}

	public void setC_name(String c_name) {
		this.c_name = c_name;
	}

	public String getC_introduction() {
		return c_introduction;
	}

	public void setC_introduction(String c_introduction) {
		this.c_introduction = c_introduction;
	}

	public String getC_author() {
		return c_author;
	}

	public void setC_author(String c_author) {
		this.c_author = c_author;
	}

	@JsonSerialize(using = DateJsonTypeConvert.class)
	public Date getC_date() {
		return c_date;
	}

	public void setC_date(Date c_date) {
		this.c_date = c_date;
	}

	public String getC_background() {
		return c_background;
	}

	public void setC_background(String c_background) {
		this.c_background = c_background;
	}

	public String getC_Software() {
		return c_Software;
	}

	public void setC_Software(String c_Software) {
		this.c_Software = c_Software;
	}

	public Integer getC_typeOfCourse() {
		return c_typeOfCourse;
	}

	public void setC_typeOfCourse(Integer c_typeOfCourse) {
		this.c_typeOfCourse = c_typeOfCourse;
	}

	public String getC_typeOfContent() {
		return c_typeOfContent;
	}

	public void setC_typeOfContent(String c_typeOfContent) {
		this.c_typeOfContent = c_typeOfContent;
	}

	public Integer getC_level() {
		return c_level;
	}

	public void setC_level(Integer c_level) {
		this.c_level = c_level;
	}

	public String getC_users() {
		return c_users;
	}

	public void setC_users(String c_users) {
		this.c_users = c_users;
	}

	public Integer getM_id() {
		return m_id;
	}

	public void setM_id(Integer m_id) {
		this.m_id = m_id;
	}

	public Integer getU_id() {
		return u_id;
	}

	public void setU_id(Integer u_id) {
		this.u_id = u_id;
	}

	public Integer getC_vip() {
		return c_vip;
	}

	public void setC_vip(Integer c_vip) {
		this.c_vip = c_vip;
	}

	public Curriculum(Integer c_id, String c_name, String c_introduction,
			String c_author, Date c_date, String c_background,
			String c_Software, Integer c_typeOfCourse, String c_typeOfContent,
			Integer c_level, String c_users, Integer m_id, Integer u_id,
			Integer c_vip) {
		super();
		this.c_id = c_id;
		this.c_name = c_name;
		this.c_introduction = c_introduction;
		this.c_author = c_author;
		this.c_date = c_date;
		this.c_background = c_background;
		this.c_Software = c_Software;
		this.c_typeOfCourse = c_typeOfCourse;
		this.c_typeOfContent = c_typeOfContent;
		this.c_level = c_level;
		this.c_users = c_users;
		this.m_id = m_id;
		this.u_id = u_id;
		this.c_vip = c_vip;
	}

	public Curriculum() {
		super();
	}

	@Override
	public String toString() {
		return "Curriculum [c_id=" + c_id + ", c_name=" + c_name
				+ ", c_introduction=" + c_introduction + ", c_author="
				+ c_author + ", c_date=" + c_date + ", c_background="
				+ c_background + ", c_Software=" + c_Software
				+ ", c_typeOfCourse=" + c_typeOfCourse + ", c_typeOfContent="
				+ c_typeOfContent + ", c_level=" + c_level + ", c_users="
				+ c_users + ", m_id=" + m_id + ", u_id=" + u_id + ", c_vip="
				+ c_vip + "]";
	}
}
