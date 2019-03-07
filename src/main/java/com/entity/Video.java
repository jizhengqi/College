package com.entity;

import java.io.Serializable;
import java.util.Date;

public class Video implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Integer v_id;
	private String v_name;
	private String v_url;
	private String v_intro;
	private String v_content;
	private Date v_date;
	private Integer c_id;
	private Integer v_data;
	private String v_data_url;
	private Integer v_play_num;
	private Integer v_vip;
	public Integer getV_id() {
		return v_id;
	}
	public void setV_id(Integer v_id) {
		this.v_id = v_id;
	}
	public String getV_name() {
		return v_name;
	}
	public void setV_name(String v_name) {
		this.v_name = v_name;
	}
	public String getV_url() {
		return v_url;
	}
	public void setV_url(String v_url) {
		this.v_url = v_url;
	}
	public String getV_intro() {
		return v_intro;
	}
	public void setV_intro(String v_intro) {
		this.v_intro = v_intro;
	}
	public String getV_content() {
		return v_content;
	}
	public void setV_content(String v_content) {
		this.v_content = v_content;
	}
	public Date getV_date() {
		return v_date;
	}
	public void setV_date(Date v_date) {
		this.v_date = v_date;
	}
	public Integer getC_id() {
		return c_id;
	}
	public void setC_id(Integer c_id) {
		this.c_id = c_id;
	}
	public Integer getV_data() {
		return v_data;
	}
	public void setV_data(Integer v_data) {
		this.v_data = v_data;
	}
	public String getV_data_url() {
		return v_data_url;
	}
	public void setV_data_url(String v_data_url) {
		this.v_data_url = v_data_url;
	}
	public Integer getV_play_num() {
		return v_play_num;
	}
	public void setV_play_num(Integer v_play_num) {
		this.v_play_num = v_play_num;
	}
	public Integer getV_vip() {
		return v_vip;
	}
	public void setV_vip(Integer v_vip) {
		this.v_vip = v_vip;
	}
	public Video(Integer v_id, String v_name, String v_url, String v_intro,
			String v_content, Date v_date, Integer c_id, Integer v_data,
			String v_data_url, Integer v_play_num, Integer v_vip) {
		super();
		this.v_id = v_id;
		this.v_name = v_name;
		this.v_url = v_url;
		this.v_intro = v_intro;
		this.v_content = v_content;
		this.v_date = v_date;
		this.c_id = c_id;
		this.v_data = v_data;
		this.v_data_url = v_data_url;
		this.v_play_num = v_play_num;
		this.v_vip = v_vip;
	}
	public Video() {
		super();
	}
	@Override
	public String toString() {
		return "Video [v_id=" + v_id + ", v_name=" + v_name + ", v_url="
				+ v_url + ", v_intro=" + v_intro + ", v_content=" + v_content
				+ ", v_date=" + v_date + ", c_id=" + c_id + ", v_data="
				+ v_data + ", v_data_url=" + v_data_url + ", v_play_num="
				+ v_play_num + ", v_vip=" + v_vip + "]";
	}
}
