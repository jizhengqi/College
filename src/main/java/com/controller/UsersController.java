package com.controller;

import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
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
	@RequestMapping("upd")
	@ResponseBody
	public Integer upd(Users s){
		us.upd(s);
		rs = 1;
		return rs;
	}
	
	// 删除
	
	// 查询所有客户
	
	// 分页查询所有客户信息
	
	// 登陆
	@RequestMapping("login")
	@ResponseBody
	public Integer login(String uname,String pwd,HttpSession session){
		Subject subject = SecurityUtils.getSubject();
		UsernamePasswordToken token = new UsernamePasswordToken(uname,pwd);
		try {
			rs = 1;
			List<Users> list = us.queryByName(uname, pwd);
			session.setAttribute("users", list);
			subject.login(token);
		} catch (Exception e) {
			e.printStackTrace();
			rs = 2;
		}
		return rs;
	}
	
	// 查询登陆者信息
	@RequestMapping("queryByUsers")
	@ResponseBody
	public Users queryByUsers(HttpSession session){
		List<Users> list = (List<Users>) session.getAttribute("users");
		Users users = list.get(0);
		if(null != users){
			return users;
		}else{
			return null;
		}
	}
	
	// 判断用户是否是VIP
	@RequestMapping("queryVipById")
	@ResponseBody
	public Integer queryVipById(String u_id){
		List<Users> list = us.queryVipById(u_id);
		if(list.get(0).getU_vip() == 1){
			rs = 1;
		}else{
			rs = 2;
		}
		return rs;
	}
	
	// 获取验证码
	@RequestMapping("getMsg")
	@ResponseBody
	public String getMsg(String phone){
		SendTelMsgUtils stm = new SendTelMsgUtils();
		String count = stm.sendMsgToPhone(phone);
		return count;
	}
	
}
