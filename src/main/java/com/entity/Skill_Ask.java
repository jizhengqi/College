package com.entity;

import java.io.Serializable;
import java.util.Date;

public class Skill_Ask implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Integer s_id;
	private String s_question;
	private Integer u_id;
	private Date s_date;
	private Integer s_return_card;
	private Integer s_browse;
	private Integer s_solve;
	private Integer c_id;
	public Integer getS_id() {
		return s_id;
	}
	public void setS_id(Integer s_id) {
		this.s_id = s_id;
	}
	public String getS_question() {
		return s_question;
	}
	public void setS_question(String s_question) {
		this.s_question = s_question;
	}
	public Integer getU_id() {
		return u_id;
	}
	public void setU_id(Integer u_id) {
		this.u_id = u_id;
	}
	public Date getS_date() {
		return s_date;
	}
	public void setS_date(Date s_date) {
		this.s_date = s_date;
	}
	public Integer getS_return_card() {
		return s_return_card;
	}
	public void setS_return_card(Integer s_return_card) {
		this.s_return_card = s_return_card;
	}
	public Integer getS_browse() {
		return s_browse;
	}
	public void setS_browse(Integer s_browse) {
		this.s_browse = s_browse;
	}
	public Integer getS_solve() {
		return s_solve;
	}
	public void setS_solve(Integer s_solve) {
		this.s_solve = s_solve;
	}
	public Integer getC_id() {
		return c_id;
	}
	public void setC_id(Integer c_id) {
		this.c_id = c_id;
	}
	public Skill_Ask(Integer s_id, String s_question, Integer u_id,
			Date s_date, Integer s_return_card, Integer s_browse,
			Integer s_solve, Integer c_id) {
		super();
		this.s_id = s_id;
		this.s_question = s_question;
		this.u_id = u_id;
		this.s_date = s_date;
		this.s_return_card = s_return_card;
		this.s_browse = s_browse;
		this.s_solve = s_solve;
		this.c_id = c_id;
	}
	public Skill_Ask() {
		super();
	}
	@Override
	public String toString() {
		return "Skill_Ask [s_id=" + s_id + ", s_question=" + s_question
				+ ", u_id=" + u_id + ", s_date=" + s_date + ", s_return_card="
				+ s_return_card + ", s_browse=" + s_browse + ", s_solve="
				+ s_solve + ", c_id=" + c_id + "]";
	}
}
