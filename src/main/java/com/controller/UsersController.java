package com.controller;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.DisabledAccountException;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.ExpiredCredentialsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.UnauthorizedException;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.Users;
import com.service.UsersService;
import com.util.CookieUtils;
import com.util.SendTelMsgUtils;

@Controller
@RequestMapping("user")
public class UsersController {

	@Resource
	UsersService us;

	@Resource
	CookieUtils cookieUtils;

	Integer rs;

	// 注册
	@RequestMapping("logins")
	@ResponseBody
	public Integer logins(Users s) {
		String str = UUID.randomUUID().toString().substring(0, 5);
		s.setU_id(str);
		us.add(s);
		rs = 1;
		return rs;
	}

	// 修改个人信息
	@RequestMapping("upd")
	@ResponseBody
	public Integer upd(Users s) {
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
	public String login(String uname, String pwd, HttpSession session,
			HttpServletResponse response) {
		System.out.println(uname + "--------" + pwd);
		String msg = "";
		Subject subject = SecurityUtils.getSubject();
		if (!subject.isAuthenticated()) {
			// 把用户名和密码封装为 UsernamePasswordToken 对象
			UsernamePasswordToken token = new UsernamePasswordToken(uname, pwd);
			// remembermMe记住密码
			token.setRememberMe(true);
			try {
				Users user = (Users) session.getAttribute(uname);
				if (null != user) {
					return "您正在重复登陆此账号";
				}
				// 执行登录.
				subject.login(token);
				// 登录成功...
				List<Users> list = us.queryByName(uname, pwd);
				String phone = list.get(0).getU_phone();
				session.setAttribute(phone, list.get(0));
				return "1";
			} catch (IncorrectCredentialsException e) {
				msg = "登录密码错误";
				System.out.println("登录密码错误!!!" + e);
			} catch (ExcessiveAttemptsException e) {
				msg = "登录失败次数过多";
				System.out.println("登录失败次数过多!!!" + e);
			} catch (LockedAccountException e) {
				msg = "帐号已被锁定";
				System.out.println("帐号已被锁定!!!" + e);
			} catch (DisabledAccountException e) {
				msg = "帐号已被禁用";
				System.out.println("帐号已被禁用!!!" + e);
			} catch (ExpiredCredentialsException e) {
				msg = "帐号已过期";
				System.out.println("帐号已过期!!!" + e);
			} catch (UnknownAccountException e) {
				msg = "帐号不存在";
				System.out.println("帐号不存在!!!" + e);
			} catch (UnauthorizedException e) {
				msg = "您没有得到相应的授权！";
				System.out.println("您没有得到相应的授权！" + e);
			} catch (Exception e) {
				System.out.println("出错！！！" + e);
			}
		}
		return msg;
	}

	// 注销
	@RequestMapping("logout")
	public void logout(String path, HttpServletResponse response)
			throws IOException {
		Subject subject = SecurityUtils.getSubject();
		subject.logout();
		response.sendRedirect("/index.html");
	}

	// 查询登陆者信息
	@RequestMapping("queryByUsers")
	@ResponseBody
	public Users queryByUsers(HttpSession session, String phone) {
		Users user = (Users) session.getAttribute(phone);
		System.out.println(user);
		if (null != user) {
			return user;
		} else {
			return null;
		}
	}

	// 判断用户是否是VIP
	@RequestMapping("queryVipById")
	@ResponseBody
	public Integer queryVipById(String u_id) {
		List<Users> list = us.queryVipById(u_id);
		if (list.get(0).getU_vip() == 1) {
			rs = 1;
		} else {
			rs = 2;
		}
		return rs;
	}

	// 获取验证码
	@RequestMapping("getMsg")
	@ResponseBody
	public String getMsg(String phone) {
		SendTelMsgUtils stm = new SendTelMsgUtils();
		String count = stm.sendMsgToPhone(phone);
		return count;
	}

}
