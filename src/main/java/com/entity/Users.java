package com.entity;

import java.io.Serializable;
import java.util.Date;

public class Users implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String u_id;
	private String u_username;
	private String u_phone;
	private String u_pwd;
	private String u_realname;
	private Integer u_sex;
	private Date u_birthday;
	private String u_address;
	private String u_intro;
	private String u_photo;
	private String u_email;
	private Integer u_stu_authentication;
	private Integer u_vip;
	private Date u_vip_date;
	private Date u_vip_enddate;
	private Integer u_gold;
	private String u_qq;
	private String d_id;
	private Integer u_year;
	private String u_position;
	private String u_company;
	private String u_project_experience;
	private String u_social_reputation;
	private String u_other_msg;
	private Integer u_teacher;
	private Date u_create_date;
	public String getU_id() {
		return u_id;
	}
	public void setU_id(String u_id) {
		this.u_id = u_id;
	}
	public String getU_username() {
		return u_username;
	}
	public void setU_username(String u_username) {
		this.u_username = u_username;
	}
	public String getU_phone() {
		return u_phone;
	}
	public void setU_phone(String u_phone) {
		this.u_phone = u_phone;
	}
	public String getU_pwd() {
		return u_pwd;
	}
	public void setU_pwd(String u_pwd) {
		this.u_pwd = u_pwd;
	}
	public String getU_realname() {
		return u_realname;
	}
	public void setU_realname(String u_realname) {
		this.u_realname = u_realname;
	}
	public Integer getU_sex() {
		return u_sex;
	}
	public void setU_sex(Integer u_sex) {
		this.u_sex = u_sex;
	}
	public Date getU_birthday() {
		return u_birthday;
	}
	public void setU_birthday(Date u_birthday) {
		this.u_birthday = u_birthday;
	}
	public String getU_address() {
		return u_address;
	}
	public void setU_address(String u_address) {
		this.u_address = u_address;
	}
	public String getU_intro() {
		return u_intro;
	}
	public void setU_intro(String u_intro) {
		this.u_intro = u_intro;
	}
	public String getU_photo() {
		return u_photo;
	}
	public void setU_photo(String u_photo) {
		this.u_photo = u_photo;
	}
	public String getU_email() {
		return u_email;
	}
	public void setU_email(String u_email) {
		this.u_email = u_email;
	}
	public Integer getU_stu_authentication() {
		return u_stu_authentication;
	}
	public void setU_stu_authentication(Integer u_stu_authentication) {
		this.u_stu_authentication = u_stu_authentication;
	}
	public Integer getU_vip() {
		return u_vip;
	}
	public void setU_vip(Integer u_vip) {
		this.u_vip = u_vip;
	}
	public Date getU_vip_date() {
		return u_vip_date;
	}
	public void setU_vip_date(Date u_vip_date) {
		this.u_vip_date = u_vip_date;
	}
	public Date getU_vip_enddate() {
		return u_vip_enddate;
	}
	public void setU_vip_enddate(Date u_vip_enddate) {
		this.u_vip_enddate = u_vip_enddate;
	}
	public Integer getU_gold() {
		return u_gold;
	}
	public void setU_gold(Integer u_gold) {
		this.u_gold = u_gold;
	}
	public String getU_qq() {
		return u_qq;
	}
	public void setU_qq(String u_qq) {
		this.u_qq = u_qq;
	}
	public String getD_id() {
		return d_id;
	}
	public void setD_id(String d_id) {
		this.d_id = d_id;
	}
	public Integer getU_year() {
		return u_year;
	}
	public void setU_year(Integer u_year) {
		this.u_year = u_year;
	}
	public String getU_position() {
		return u_position;
	}
	public void setU_position(String u_position) {
		this.u_position = u_position;
	}
	public String getU_company() {
		return u_company;
	}
	public void setU_company(String u_company) {
		this.u_company = u_company;
	}
	public String getU_project_experience() {
		return u_project_experience;
	}
	public void setU_project_experience(String u_project_experience) {
		this.u_project_experience = u_project_experience;
	}
	public String getU_social_reputation() {
		return u_social_reputation;
	}
	public void setU_social_reputation(String u_social_reputation) {
		this.u_social_reputation = u_social_reputation;
	}
	public String getU_other_msg() {
		return u_other_msg;
	}
	public void setU_other_msg(String u_other_msg) {
		this.u_other_msg = u_other_msg;
	}
	public Integer getU_teacher() {
		return u_teacher;
	}
	public void setU_teacher(Integer u_teacher) {
		this.u_teacher = u_teacher;
	}
	public Date getU_create_date() {
		return u_create_date;
	}
	public void setU_create_date(Date u_create_date) {
		this.u_create_date = u_create_date;
	}
	public Users(String u_id, String u_username, String u_phone, String u_pwd,
			String u_realname, Integer u_sex, Date u_birthday,
			String u_address, String u_intro, String u_photo, String u_email,
			Integer u_stu_authentication, Integer u_vip, Date u_vip_date,
			Date u_vip_enddate, Integer u_gold, String u_qq, String d_id,
			Integer u_year, String u_position, String u_company,
			String u_project_experience, String u_social_reputation,
			String u_other_msg, Integer u_teacher, Date u_create_date) {
		super();
		this.u_id = u_id;
		this.u_username = u_username;
		this.u_phone = u_phone;
		this.u_pwd = u_pwd;
		this.u_realname = u_realname;
		this.u_sex = u_sex;
		this.u_birthday = u_birthday;
		this.u_address = u_address;
		this.u_intro = u_intro;
		this.u_photo = u_photo;
		this.u_email = u_email;
		this.u_stu_authentication = u_stu_authentication;
		this.u_vip = u_vip;
		this.u_vip_date = u_vip_date;
		this.u_vip_enddate = u_vip_enddate;
		this.u_gold = u_gold;
		this.u_qq = u_qq;
		this.d_id = d_id;
		this.u_year = u_year;
		this.u_position = u_position;
		this.u_company = u_company;
		this.u_project_experience = u_project_experience;
		this.u_social_reputation = u_social_reputation;
		this.u_other_msg = u_other_msg;
		this.u_teacher = u_teacher;
		this.u_create_date = u_create_date;
	}
	public Users() {
		super();
	}
	@Override
	public String toString() {
		return "Users [u_id=" + u_id + ", u_username=" + u_username
				+ ", u_phone=" + u_phone + ", u_pwd=" + u_pwd + ", u_realname="
				+ u_realname + ", u_sex=" + u_sex + ", u_birthday="
				+ u_birthday + ", u_address=" + u_address + ", u_intro="
				+ u_intro + ", u_photo=" + u_photo + ", u_email=" + u_email
				+ ", u_stu_authentication=" + u_stu_authentication + ", u_vip="
				+ u_vip + ", u_vip_date=" + u_vip_date + ", u_vip_enddate="
				+ u_vip_enddate + ", u_gold=" + u_gold + ", u_qq=" + u_qq
				+ ", d_id=" + d_id + ", u_year=" + u_year + ", u_position="
				+ u_position + ", u_company=" + u_company
				+ ", u_project_experience=" + u_project_experience
				+ ", u_social_reputation=" + u_social_reputation
				+ ", u_other_msg=" + u_other_msg + ", u_teacher=" + u_teacher
				+ ", u_create_date=" + u_create_date + "]";
	}
}
