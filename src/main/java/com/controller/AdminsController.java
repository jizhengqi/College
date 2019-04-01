package com.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.Admins;
import com.service.AdminsService;

@Controller
@RequestMapping("admin")
public class AdminsController {

	@Resource
	AdminsService as;

	Integer rs;

	// 登陆
	@RequestMapping("queryOne")
	@ResponseBody
	public Integer queryOne(String a_name, String a_pwd, HttpSession session) {
		List<Admins> list = as.queryOne(a_name, a_pwd);
		if (list.size() > 0) {
			rs = 1;
			session.setAttribute("list", list);
		} else {
			rs = 2;
		}
		return rs;
	}

	// 获取登陆者信息
	@SuppressWarnings("unchecked")
	@RequestMapping("getAdmins")
	@ResponseBody
	public List<Admins> getAdmins(HttpSession session) {
		List<Admins> str = (List<Admins>) session.getAttribute("list");
		return str;
	}

}
