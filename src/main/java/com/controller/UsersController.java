package com.controller;

import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.Users;
import com.service.UsersService;
import com.util.SendTelMsgUtils;

@Controller
@RequestMapping("user")
public class UsersController {
	
	@Resource
	UsersService us;
	
	Integer rs;
	
	// 注册
	@RequestMapping("logins")
	@ResponseBody
	public Integer logins(Users s){
		String str = UUID.randomUUID().toString().substring(0,5);
		s.setU_id(str);
		us.add(s);
		rs = 1;
		return rs;
	}
	
	// 修改个人信息
	
	// 删除
	
	// 查询所有客户
	
	// 分页查询所有客户信息
	
	// 登陆
	@RequestMapping("login")
	@ResponseBody
	public Integer login(String uname,String pwd,HttpSession session){
		List<Users> list = us.queryByName(uname, pwd);
		if(list.size() > 0){
			rs = 1;
			session.setAttribute("list", list);
		}else{
			rs = 2;
		}
		return rs;
	}
	
	// 查询登陆者信息
	
	// 获取验证码
	@RequestMapping("getMsg")
	@ResponseBody
	public String getMsg(String phone){
		SendTelMsgUtils stm = new SendTelMsgUtils();
		String count = stm.sendMsgToPhone(phone);
		return count;
	}
	
}
