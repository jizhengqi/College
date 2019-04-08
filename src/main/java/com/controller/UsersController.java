package com.controller;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.entity.Users;
import com.service.UsersService;
import com.util.CookieUtils;
import com.util.DateUtils;
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
		response.sendRedirect("/" + path + ".html");
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

	// 查询所有认证布道师的用户
	@RequestMapping("queryByTeacher")
	@ResponseBody
	public Map<String, Object> queryByTeacher(Integer page, Integer limit) {
		Map<String, Object> map = new HashMap<String, Object>();
		List<Users> list = us.queryByTeacher((page - 1) * limit, limit);
		map.put("msg", "");
		map.put("code", 0);
		map.put("count", us.queryByTeachers().size());
		map.put("data", list);
		return map;
	}

	// 查询所有VIP的用户
	@RequestMapping("queryByVIP")
	@ResponseBody
	public Map<String, Object> queryByVIP(Integer page, Integer limit) {
		Map<String, Object> map = new HashMap<String, Object>();
		List<Users> list = us.queryByVIP((page - 1) * limit, limit);
		map.put("msg", "");
		map.put("code", 0);
		map.put("count", us.queryByVIPs().size());
		map.put("data", list);
		return map;
	}

	// 判断用户是否是VIP
	@RequestMapping("queryVipById")
	@ResponseBody
	public Integer queryVipById(String u_id) {
		List<Users> list = us.queryVipById(u_id);
		if (null != list) {
			return 2;
		}
		if (null != list.get(0).getU_vip()) {
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

	@RequestMapping("checkPhone")
	@ResponseBody
	public Integer checkPhone(String phone) {
		return us.checkUserName(phone) == true ? 1 : 0;
	}

	/**
	 * 修改用户头像
	 * 
	 * @param file
	 * @return
	 */
	@RequestMapping("uploadPic")
	@ResponseBody
	public String uploadPic(@RequestParam("file") MultipartFile file,
			String phone, HttpSession session) {
		Users user = (Users) session.getAttribute(phone);
		return us.uploadPic(file, user, session);
	}

	/**
	 * 修改用户信息
	 * 
	 * @param username
	 * @param phone
	 * @param session
	 * @return
	 * @throws IOException
	 */
	@RequestMapping("editUserName")
	public void editUserName(Users user, String birthday, HttpSession session,
			HttpServletResponse response) throws IOException {
		if (birthday != "" && birthday != null) {
			Date date = DateUtils.StringToDate(birthday, "yyyy-MM-dd");
			user.setU_birthday(date);
		}
		System.out.println("参数：" + user);
		System.out.println(us.editUserName(user, session));
		response.sendRedirect("/setting_user.html");
	}

	/**
	 * 修改用户手机号
	 * 
	 * @param phone
	 * @param session
	 * @return
	 */
	@RequestMapping("editPhone")
	@ResponseBody
	public Integer editPhone(String phone, String newPhone, HttpSession session) {
		return us.editPhone(phone, newPhone, session);
	}

	/**
	 * 修改邮箱
	 * 
	 * @param phone
	 * @param u_phone
	 * @param session
	 * @return
	 */
	@RequestMapping("editEmail")
	@ResponseBody
	public Integer editEmail(String phone, String u_email, HttpSession session) {
		return us.editEmail(phone, u_email, session);
	}

	/**
	 * 修改密码
	 * 
	 * @param phone
	 * @param u_pwd
	 * @param session
	 * @return
	 */
	@RequestMapping("editPwd")
	@ResponseBody
	public Integer editPwd(String phone, String u_pwd, HttpSession session) {
		return us.editPwd(phone, u_pwd, session);
	}

	/**
	 * 认证学员
	 * 
	 * @param phone
	 * @param user
	 * @param session
	 * @return
	 */
	@RequestMapping("editMsg")
	@ResponseBody
	public Integer editMsg(String phone, Users user, HttpSession session) {
		return us.editMsg(phone, user, session);
	}
	
	// 后台教师登陆发布信息
	@RequestMapping("query_HT_teacher")
	@ResponseBody
	public Integer query_HT_teacher(String uname,String pwd,HttpSession session){
		List<Users> list = us.query_HT_teacher(uname, pwd);
		if(list.size() > 0){
			rs = 1;
			session.setAttribute("teacher", list.get(0));
		}else{
			rs = 2;
		}
		return rs;
	}
	
	// 获取当前后台登陆者的信息
	@SuppressWarnings("unchecked")
	@RequestMapping("getUsers")
	@ResponseBody
	public Users getUsers(HttpSession session){
		Users str = (Users) session.getAttribute("teacher");
		System.out.println(str);
		return str;
	}

	/**
	 * 查询不道师主页
	 * 
	 * @param phone
	 * @return
	 */
	@RequestMapping("querybds")
	@ResponseBody
	public Users getUsers(String u_name) {
		System.out.println("极客" + u_name);
		for (int i = 0; i < us.getUser().size(); i++) {
			if (us.getUser().get(i).getU_username().equals(u_name)) {
				System.out.println(us.getUser().get(i));
				return us.getUser().get(i);
			}
		}
		return null;
	}

	/**
	 * 添加布道师
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping("addBuDaoShi")
	@ResponseBody
	public Integer addBuDaoShi(Users user, HttpSession session) {
		return us.addBuDaoShi(user, session);
	}

}
